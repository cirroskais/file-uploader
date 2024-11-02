import { error, redirect } from '@sveltejs/kit';
import prisma, { getSession, getUserApiKey } from '$lib/server/database';
import { COOKIE } from '$lib/config';

export async function handle({ event, resolve }) {
	const { cookies, locals, request } = event;

	let cookie = cookies.get(COOKIE);
	let bearer = request.headers.get('Authorization');
	if (bearer) bearer = bearer.replace('Bearer ', '');

	if (cookie) {
		const session = await getSession(cookie);
		if (session && session.user) {
			if (session.expiresAt <= new Date()) {
				await prisma.session.delete({ where: { id: session.id } });
				cookies.delete(COOKIE, { path: '/' });
				return redirect(303, '/');
			}

			locals.user = {
				id: session.user.id,
				username: session.user.username,
				email: session.user.email,
				maxUploadMB: session.user.maxUploadMB,
				role: session.user.role
			};

			if (event.getClientAddress())
				await prisma.session.update({
					where: { id: session.id },
					data: { remoteAddress: event.getClientAddress() }
				});

			await prisma.user.update({
				where: { id: session.userId },
				data: { lastSeen: new Date() }
			});
		}
	}

	if (bearer && !locals.user) {
		const apiKey = await getUserApiKey(bearer);
		if (apiKey && apiKey.user) {
			if (apiKey.expiresAt <= new Date()) {
				await prisma.aPIKey.delete({ where: { id: apiKey.id } });
				return error(401, { status: 401, message: 'API Key Expired' });
			}

			locals.user = {
				id: apiKey.user.id,
				username: apiKey.user.username,
				email: apiKey.user.email,
				maxUploadMB: apiKey.user.maxUploadMB,
				role: apiKey.user.role
			};
		}
	}

	if (!locals.user && event.route.id) {
		if (event.route.id.includes('(app)')) return redirect(303, '/');
	}

	if (locals.user && event.route.id === '/(landing)') return redirect(303, '/dashboard');

	if (locals.user && event.route.id) {
		if (event.route.id.includes('/admin') && locals.user.role !== 'ADMINISTRATOR')
			return redirect(303, '/dashboard');
	}

	return await resolve(event);
}

export async function handleError({ error, status, message }) {
	if (status !== 404) console.log(error);

	return {
		status,
		message
	};
}

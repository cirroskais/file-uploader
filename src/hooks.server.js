import { redirect } from '@sveltejs/kit';
import { getSession, getUserApiKey } from '$lib/server/database';
import { COOKIE } from '$lib/config';

export async function handle({ event, resolve }) {
	const { cookies, locals, request } = event;

	let cookie = cookies.get(COOKIE);
	let bearer = request.headers.get('Authorization');
	if (bearer) bearer = bearer.replace('Bearer ', '');

	if (cookie) {
		const session = await getSession(cookie);
		if (session && session.user) {
			locals.user = {
				id: session.user.id,
				username: session.user.username,
				email: session.user.email,
				maxUploadMB: session.user.maxUploadMB,
				role: session.user.role
			};
		}
	}

	if (bearer && !locals.user) {
		const apiKey = await getUserApiKey(bearer);
		if (apiKey && apiKey.user) {
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

	return await resolve(event);
}

export async function handleError({ error, status, message }) {
	console.log(error);

	return {
		status,
		message
	};
}

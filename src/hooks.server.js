import { error, redirect } from '@sveltejs/kit';
import { getSession } from '$lib/server/database';
import { COOKIE } from '$lib/config';

const PUBLIC_RESOURCES = [
	'/',
	'/api',
	'/api/auth/register',
	'/api/auth/login',
	'/terms',
	'/privacy'
];

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const { cookies, locals } = event;
	const session = await getSession(cookies.get(COOKIE));

	if (session && session.user) {
		locals.user = {
			id: session.user.id,
			username: session.user.username,
			email: session.user.email
		};
	} else {
		if (event.route.id) {
			if (event.route.id.includes('(app)')) return redirect(303, '/');
		}
	}

	return await resolve(event);
}

/** @type {import('@sveltejs/kit').HandleServerError} */
export async function handleError({ error, event, status, message }) {
	console.log(error);

	return {
		status,
		message
	};
}

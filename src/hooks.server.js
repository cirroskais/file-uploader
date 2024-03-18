// import { redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { handle as authenticationHandle } from '$lib/server/auth.js';

async function authorizationHandle({ event, resolve }) {
	// if (event.url.pathname.startsWith('/(app)')) {
	// 	const session = await event.locals.auth();
	// 	if (!session) {
	// 		throw redirect(303, '/auth/signin');
	// 	}
	// }

	return resolve(event);
}

export const handle = sequence(authenticationHandle, authorizationHandle);

/** @type {import('@sveltejs/kit').HandleServerError} */
export async function handleError({ error, event, status, message }) {
	console.log(error);

	return {
		status,
		message
	};
}

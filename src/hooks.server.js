import { redirect } from '@sveltejs/kit';

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
	if (!PUBLIC_RESOURCES.includes(event.route.id)) {
		console.log(event.route.id);
		return redirect(303, '/');
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

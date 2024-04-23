import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET(event) {
	const { request, cookies, locals } = event;

	return json(locals?.user);
}

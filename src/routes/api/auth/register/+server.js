import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST(event) {
	const { request, cookies, locals } = event;
	const body = await request.json();
}

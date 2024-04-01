import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST(event) {
	const { request, cookies, locals } = event;
	const body = await request.json();

	if (!body?.username || body?.username.length > 16 || body?.username.length < 3)
		return json({ error: 'Invalid username' }, { status: 400 });

	if (!body?.password || body?.password.length > 128 || body?.password.length < 6)
		return json({ error: 'Invalid password' }, { status: 400 });

	return json({ error: 'Not Implemented' }, { status: 500 });
}

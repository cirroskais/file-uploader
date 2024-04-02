import { json } from '@sveltejs/kit';
import { COOKIE } from '$lib/config';
import { findUser, createSession } from '$lib/server/database';
import { email } from '$lib/server/validator';
import { verifyHash } from '$lib/server/crypto';

/** @type {import('./$types').RequestHandler} */
export async function POST(event) {
	const { request, cookies, locals } = event;
	const body = await request.json();

	if (!body?.email || !email(body?.email))
		return json({ error: 'Invalid email.' }, { status: 400 });

	if (!body?.password || body?.password.length > 128 || body?.password.length < 6)
		return json({ error: 'Invalid password.' }, { status: 400 });

	const user = await findUser({ email: body?.email });
	if (!user) return json({ error: 'User record not found.' }, { status: 401 });

	if (!(await verifyHash(user.password, body?.password)))
		return json({ error: 'User record not found.' }, { status: 401 });

	const session = await createSession(user.id);

	cookies.set(COOKIE, session.id, { path: '/' });

	return json(
		{
			success: true,
			data: {
				id: user.id,
				username: user.username,
				email: user.email
			}
		},
		{ status: 200 }
	);
}

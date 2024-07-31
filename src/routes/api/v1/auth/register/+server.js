import { json } from '@sveltejs/kit';
import { COOKIE } from '$lib/config';
import { createUser, createSession, findUser } from '$lib/server/database';
import { email } from '$lib/server/validator';

export async function POST(event) {
	const { request, cookies } = event;
	const body = await request.json();

	if (!body?.username || body?.username.length > 16 || body?.username.length < 3)
		return json({ error: 'Invalid username.' }, { status: 400 });

	if (!body?.email || !email(body?.email))
		return json({ error: 'Invalid email.' }, { status: 400 });

	if (!body?.password || body?.password.length > 128 || body?.password.length < 6)
		return json({ error: 'Invalid password.' }, { status: 400 });

	const usernameTaken = !!(await findUser({ username: body?.username }));
	if (usernameTaken) return json({ error: 'That username is taken.' }, { status: 400 });

	const emailUsed = !!(await findUser({ email: body?.email }));
	if (emailUsed)
		return json({ error: 'That email has been used too many times.' }, { status: 400 });

	const user = await createUser(body?.username, body?.email, body?.password).catch((e) => {});
	if (!user) return json({ error: 'Internal Server Error' }, { status: 500 });

	const session = await createSession(user.id);
	if (!session) return json({ error: 'Internal Server Error' }, { status: 500 });

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

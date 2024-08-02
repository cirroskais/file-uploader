import { json } from '@sveltejs/kit';
import { COOKIE } from '$lib/config';
import { findUser, createSession } from '$lib/server/database';
import { email } from '$lib/server/validator';
import { verifyHash } from '$lib/server/crypto';
import * as validator from '$lib/server/validator';
import { ZodError } from 'zod';

export async function POST({ request, cookies }) {
	const body = (await request.json()) as {
		email?: string;
		password?: string;
	};

	try {
		const email = validator.email(body.email);
		const password = validator.password(body.password);

		const user = await findUser({ email: email });
		if (!user) return json({ error: 'User record not found.' }, { status: 401 });

		if (!(await verifyHash(user.password, password)))
			return json({ error: 'User record not found.' }, { status: 401 });

		const session = await createSession(user.id);

		cookies.set(COOKIE, session.id, { path: '/', sameSite: 'strict' });

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
	} catch (e) {
		if (e instanceof ZodError) {
			return json({ error: e.errors[0].message }, { status: 400 });
		} else {
			return json({ error: 'Internal Server Error' }, { status: 500 });
		}
	}
}

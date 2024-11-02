import { json } from '@sveltejs/kit';
import { COOKIE } from '$lib/config';
import { createUser, createSession } from '$lib/server/database';
import * as validator from '$lib/server/validator';
import { ZodError } from 'zod';

export async function POST({ request, cookies }) {
	const body = (await request.json()) as {
		username?: string;
		password?: string;
		email?: string;
	};

	try {
		const username = await validator.usernameAndNotUsed(body.username);
		const email = await validator.emailAndNotUsed(body.email);
		const password = validator.password(body.password);

		const user = await createUser(username, email, password);
		const session = await createSession(user.id);

		let thirty_days = new Date();
		thirty_days.setDate(thirty_days.getDate() + 30);

		cookies.set(COOKIE, session.id, { path: '/', sameSite: 'lax', expires: thirty_days });

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

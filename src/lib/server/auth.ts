import { COOKIE } from '$lib/config';
import type { Cookies } from '@sveltejs/kit';
import { getSession } from './database';
import type { User, UserSettings } from '@prisma/client';

interface UserAndMaybeSettings extends User {
	settings: UserSettings | null;
}

export async function authenticate(request: Request, cookies: Cookies) {
	const bearer = request.headers.get('Authorization')?.replace('Bearer ', '');
	const cookie = cookies.get(COOKIE);

	let user: UserAndMaybeSettings | false = false;

	if (bearer && !cookie) {
		return false;
	}

	if (cookie && !bearer) {
		const session = await getSession(cookie);
		if (!session) return false;
		user = session.user;
	}

	return user;
}

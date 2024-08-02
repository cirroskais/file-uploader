import { COOKIE } from '$lib/config';
import type { Cookies } from '@sveltejs/kit';
import { getSession, getUserApiKey } from './database';
import type { Role, UserSettings } from '@prisma/client';

interface User {
	id: number;
	username: string;
	email: string;
	password: string;
	role: Role;
	createdAt: Date;
	lastSeen: Date;
	maxUploadMB: number;
}

interface UserAndMaybeSettings extends User {
	settings: UserSettings | null;
}

export async function authenticate(request: Request, cookies: Cookies) {
	const bearer = request.headers.get('Authorization')?.replace('Bearer ', '');
	const cookie = cookies.get(COOKIE);

	let user: UserAndMaybeSettings | false = false;

	if (bearer && !cookie) {
		const key = await getUserApiKey(bearer);
		if (key) {
			user = key.user;
		}
	}

	if (cookie && !bearer) {
		const session = await getSession(cookie);
		if (!session) return false;
		user = session.user;
	}

	return user;
}

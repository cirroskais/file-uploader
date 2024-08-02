import { redirect } from '@sveltejs/kit';
import { getSession, deleteSession } from '$lib/server/database';
import { COOKIE } from '$lib/config';

export async function GET({ cookies }) {
	const cookie = cookies.get(COOKIE);
	if (!cookie) return redirect(302, '/');

	const session = await getSession(cookie);
	if (!session) {
		cookies.delete(COOKIE, { path: '/' });
		return redirect(302, '/');
	}

	await deleteSession(session.id);
	cookies.delete(COOKIE, { path: '/' });

	redirect(302, '/');
}

import { redirect } from '@sveltejs/kit';
import { getSession, deleteSession } from '$lib/server/database';
import { COOKIE } from '$lib/config';

/** @type {import('./$types').RequestHandler} */
export async function GET({ cookies }) {
	const session = await getSession(cookies.get(COOKIE));
	if (!session) {
		cookies.delete(COOKIE, { path: '/' });
		return redirect(302, '/');
	}

	await deleteSession(session.id);
	cookies.delete(COOKIE, { path: '/' });

	redirect(302, '/');
}

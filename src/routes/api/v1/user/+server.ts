import { json } from '@sveltejs/kit';

export async function GET({ locals }) {
	return json(locals.user);
}

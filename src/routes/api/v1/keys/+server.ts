import { API_KEY_PERMISSIONS } from '$lib/config.js';
import { createUserApiKey, getUserApiKeys } from '$lib/server/database';
import { json } from '@sveltejs/kit';

export async function GET({ locals }) {
	return json(await getUserApiKeys(locals.user.id));
}

export async function POST({ locals }) {
	return json(
		await createUserApiKey(
			locals.user.id,
			API_KEY_PERMISSIONS.CREATE_UPLOADS | API_KEY_PERMISSIONS.READ_ACCOUNT,
			new Date('2099')
		)
	);
}

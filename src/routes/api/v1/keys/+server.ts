import { API_KEY_PERMISSIONS } from '$lib/config.js';
import { createUserApiKey, deleteUserApiKey, getUserApiKeys } from '$lib/server/database';
import { error, json } from '@sveltejs/kit';

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

export async function DELETE({ locals, request }) {
	const body = (await request.json().catch(() => {})) as { key?: string };
	if (!body?.key) error(400, { status: 400, message: 'Missing "key" value.' });
	if (!locals.user) error(401, { status: 401, message: 'Unauthorized' });

	return json(
		await deleteUserApiKey(locals.user.id, body.key).catch((_) =>
			error(400, { status: 400, message: 'API key does not exist.' })
		)
	);
}

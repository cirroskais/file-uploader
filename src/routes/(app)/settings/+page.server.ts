import { getUserApiKeys } from '$lib/server/database.js';

export async function load({ locals }) {
	return {
		keys: (await getUserApiKeys(locals.user.id)) || []
	};
}

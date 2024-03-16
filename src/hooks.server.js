/** @type {import('@sveltejs/kit').HandleServerError} */
export async function handleError({ error, event, status, message }) {
	const id = crypto.randomUUID();

	return {
		id,
		status,
		message
	};
}

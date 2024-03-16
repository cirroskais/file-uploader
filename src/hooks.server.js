/** @type {import('@sveltejs/kit').HandleServerError} */
export async function handleError({ error, event, status, message }) {

    console.log(error)

	const id = crypto.randomUUID();

	return {
		id,
		status,
		message
	};
}

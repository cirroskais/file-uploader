// import { redirect } from '@sveltejs/kit';

// /** @type {import('@sveltejs/kit').Handle} */
// export const handle = ({ resolve }) => {
// 	return resolve();
// };

/** @type {import('@sveltejs/kit').HandleServerError} */
export async function handleError({ error, event, status, message }) {
	console.log(error);

	return {
		status,
		message
	};
}

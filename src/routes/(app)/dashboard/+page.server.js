/** @type {import("@sveltejs/kit").ServerLoad} */
export function load({ locals, fetch }) {
	const statistics = fetch('/api/statistics').then((response) => response.json());

	return {
		user: locals?.user,
		streamed: {
			statistics
		}
	};
}

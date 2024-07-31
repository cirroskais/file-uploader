/** @type {import("@sveltejs/kit").ServerLoad} */
export function load({ locals, fetch }) {
	const statistics = fetch('/api/v1/statistics').then((response) => response.json());

	return {
		streamed: {
			statistics
		}
	};
}

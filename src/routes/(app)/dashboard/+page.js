/** @type {import("@sveltejs/kit").Load } */
export function load({ fetch }) {
	const statistics = fetch('/api/statistics').then((response) => response.json());

	return {
		streamed: {
			statistics
		}
	};
}

/** @type {import("@sveltejs/kit").Load } */
export async function load({ fetch }) {
	const response = await fetch('/api/statistics');
	const statistics = await response.json();

	return { statistics };
}

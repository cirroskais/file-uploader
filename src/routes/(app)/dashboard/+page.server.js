/** @type {import("@sveltejs/kit").Load} */
export function load({ locals }) {
	return { user: locals?.user };
}

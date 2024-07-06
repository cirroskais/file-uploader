/** @type {import('@sveltejs/kit').ServerLoad} */
export const load = async ({ locals }) => {
	return {
		user: locals.user
	};
};

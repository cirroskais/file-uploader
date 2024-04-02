/** @type {import('@sveltejs/kit').Load} */
export const load = async ({ locals }) => {
	return {
		user: locals.user
	};
};

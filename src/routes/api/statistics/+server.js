import { json } from '@sveltejs/kit';

/** @type {import("@sveltejs/kit").RequestHandler} */
export async function GET() {
	return json({
		users: ':3',
		files: 'dick',
		storage: '100 gigafarts'
	});
}

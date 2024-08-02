import prisma from '$lib/server/database.js';
import { error } from '@sveltejs/kit';

export async function load({ locals, url }) {
	if (!locals.user) return error(403, { status: 403, message: 'Forbidden' });
	if (+(url.searchParams.get('i') || 0) < 0) error(400, { status: 403, message: 'Invalid Index' });

	const totalUploads = await prisma.upload.count({ where: { uploaderId: locals.user.id } });

	if (!totalUploads) return { uploads: [], totalUploads: 0 };
	if (+(url.searchParams.get('i') || 0) >= Math.ceil(totalUploads / 15))
		error(400, { status: 403, message: 'Invalid Index' });

	const uploads = prisma.upload.findMany({
		skip: +(url.searchParams.get('i') || 0) * 15,
		take: 15,
		where: {
			uploaderId: locals.user.id
		},
		orderBy: {
			uploaded: 'desc'
		}
	});

	return { uploads, totalUploads };
}

import prisma from '$lib/server/database';
import minio, { BUCKET } from '$lib/server/minio.js';
import { error, json } from '@sveltejs/kit';

export const POST = async ({ params, locals }) => {
	const id = params.id;
	const upload = await prisma.upload.findFirst({ where: { id }, include: { thumbnail: true } });
	if (!upload) error(404, { status: 404, message: 'Upload Not Found' });
	if (upload.uploaderId !== locals?.user?.id && locals.user.role !== 'ADMINISTRATOR')
		error(403, { status: 403, message: 'Forbidden' });

	await minio
		.removeObject(BUCKET, `${upload.uploaderId}/${upload.internalName}`)
		.catch((_) => false);
	if (upload.thumbnail)
		await minio.removeObject(BUCKET, upload.thumbnail.fileName).catch((_) => false);

	await prisma.upload.delete({ where: { id } }).catch((_) => false);
	if (upload.thumbnail)
		await prisma.thumbnail.delete({ where: { id: upload.thumbnail?.id } }).catch((_) => false);

	return json({ success: true });
};

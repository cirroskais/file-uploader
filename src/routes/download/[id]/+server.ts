import { getUpload } from '$lib/server/database.js';
import minio, { BUCKET } from '$lib/server/minio';
import { error } from '@sveltejs/kit';

export const GET = async ({ params }) => {
	const id = params.id;

	const file = await getUpload(id);
	if (!file) throw error(404, { status: 404, message: 'File Not Found' });

	const object = await minio.getObject(BUCKET, `${file.uploader.id}/${file.fileName}`);
	const metadata = await minio.statObject(BUCKET, `${file.uploader.id}/${file.fileName}`);

	const ac = new AbortController();

	const stream = new ReadableStream({
		start(controller) {
			object.on('data', (chunk) => {
				controller.enqueue(chunk);
			});
		},
		cancel() {
			ac.abort();
		}
	});

	return new Response(stream, {
		headers: {
			'Content-Disposition': `attachment; filename="${file.fileName}"`,
			'Content-Type': metadata.metaData['content-type'],
			'Content-Length': metadata.size.toString()
		}
	});
};

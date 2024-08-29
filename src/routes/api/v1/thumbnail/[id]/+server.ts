import { getUpload } from '$lib/server/database.js';
import minio, { BUCKET } from '$lib/server/minio';
import { createThumbnail } from '$lib/server/thumbnail';
import { error } from '@sveltejs/kit';

export const GET = async ({ request, locals, params }) => {
	let upload = await getUpload(params.id);
	if (!upload) throw error(404, { status: 404, message: 'File Not Found' });
	if (!upload.thumbnail) {
		const record = await createThumbnail(upload as any);
		if (!record) throw error(425, { status: 425, message: 'Too Early' });
		upload.thumbnail = record;
	}

	if (!upload.public && locals?.user?.id !== upload.uploader.id)
		throw error(403, { status: 403, message: 'Forbidden' });

	const object = await minio.getObject(BUCKET, upload.thumbnail.fileName);
	const metadata = await minio.statObject(BUCKET, upload.thumbnail.fileName);

	const ac = new AbortController();
	ac.signal.onabort = () => object.destroy;

	const stream = new ReadableStream({
		start(controller) {
			object.on('data', (chunk) => {
				controller.enqueue(chunk);
			});
			object.on('end', () => {
				controller.close();
			});
		},
		cancel() {
			ac.abort();
		}
	});

	return new Response(stream, {
		headers: {
			'Content-Type': metadata.metaData['content-type'],
			'Content-Length': metadata.size.toString()
		}
	});
};

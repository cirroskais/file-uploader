import { getUpload } from '$lib/server/database.js';
import minio, { BUCKET } from '$lib/server/minio';
import { error } from '@sveltejs/kit';

const MAX_CHUNK_SIZE = 5242880;

export const GET = async ({ params, locals, request }) => {
	const rangeHeader = request.headers.get('Range');
	let id: any = params.id.split('.');
	if (id.length > 1) id.pop();
	id = id.join('');

	const file = await getUpload(id);
	if (!file) throw error(404, { status: 404, message: 'File Not Found' });

	if (!file.public && locals?.user?.id !== file.uploader.id)
		throw error(403, { status: 403, message: 'Forbidden' });

	const metadata = await minio.statObject(BUCKET, `${file.uploader.id}/${file.internalName}`);

	if (rangeHeader && metadata.size > MAX_CHUNK_SIZE) {
		if (!rangeHeader.startsWith('bytes'))
			throw error(400, { status: 400, message: 'Bad Range Header' });
		const bytes = rangeHeader.replace('bytes=', '').split('-');
		if (bytes.length !== 2) throw error(400, { status: 400, message: 'Bad Range Header' });
		let start: number = Number(bytes[0]);
		let end: number | undefined = Number(bytes[1]);

		if (isNaN(start) || !isFinite(start))
			throw error(400, { status: 400, message: 'Bad Range Header' });
		if (isNaN(end) || !isFinite(end) || end === 0)
			end = Math.min(start + MAX_CHUNK_SIZE, metadata.size);

		const object = await minio.getPartialObject(
			BUCKET,
			`${file.uploader.id}/${file.internalName}`,
			start,
			end
		);

		const ac = new AbortController();
		ac.signal.onabort = () => {
			object.destroy();
			object.removeAllListeners();
		};

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
			status: 206,
			headers: {
				'Content-Type': metadata.metaData['content-type'],
				'Content-Length': (end - start).toString(),
				'Content-Range': `bytes ${start}-${end}/${metadata.size}`,
				'Accept-Ranges': 'bytes'
			}
		});
	} else {
		const object = await minio.getObject(BUCKET, `${file.uploader.id}/${file.internalName}`);

		const ac = new AbortController();
		ac.signal.onabort = () => {
			object.destroy();
			object.removeAllListeners();
		};

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
				'Content-Disposition': `attachment; filename="${file.fileName}"`,
				'Content-Type': metadata.metaData['content-type'],
				'Content-Length': metadata.size.toString(),
				'Accept-Ranges': 'bytes'
			}
		});
	}
};

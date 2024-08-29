import { getUpload } from '$lib/server/database.js';
import minio, { BUCKET } from '$lib/server/minio';
import { createSignature } from '$lib/server/thumbnail.js';
import { error } from '@sveltejs/kit';
import { timingSafeEqual } from 'crypto';

function verifyTicket(data: string, sig: string) {
	return timingSafeEqual(createSignature(data), Buffer.from(sig, 'hex'));
}

export const GET = async ({ params, locals }) => {
	let id: any = params.id.split('.');
	if (id.length > 1) id.pop();
	id = id.join('');

	const data = params.ticket.split('.')?.[0];
	const sig = params.ticket.split('.')?.[1];

	if (!data || !sig) throw error(403, { status: 403, message: 'Forbidden' });

	const file = await getUpload(id);
	if (!file) throw error(404, { status: 404, message: 'File Not Found' });

	if (!verifyTicket(data, sig)) throw error(403, { status: 403, message: 'Forbidden' });

	const object = await minio.getObject(BUCKET, `${file.uploader.id}/${file.internalName}`);
	const metadata = await minio.statObject(BUCKET, `${file.uploader.id}/${file.internalName}`);

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
			'Content-Disposition': `attachment; filename="${file.fileName}"`,
			'Content-Type': metadata.metaData['content-type'],
			'Content-Length': metadata.size.toString()
		}
	});
};

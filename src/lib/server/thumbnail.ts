import type { Upload } from '@prisma/client';
import { env } from '$env/dynamic/private';
import { createHmac, randomBytes } from 'node:crypto';
import prisma from './database';
import minio, { BUCKET } from './minio';

const processing = new Set();

export function createSignature(opts: string) {
	return createHmac('SHA1', env.THUMBOR_SECRET || 'development')
		.update(opts)
		.digest();
}

export async function createThumbnail(upload: Upload) {
	if (processing.has(upload.id)) return false;
	processing.add(upload.id);

	const ticket = randomBytes(16).toString('hex');
	const ticketSig = createSignature(ticket).toString('hex');

	const url = `${env.BASE_URL}/download/${upload.id}/${ticket}.${ticketSig}`;
	const options = '200x0/filters:format(webp):quality(50)';

	const SIGNATURE = createSignature(`${options}/${url}`)
		.toString('base64')
		.replaceAll('+', '-')
		.replaceAll('/', '_');

	try {
		const response = await fetch(`${env.THUMBOR_ENDPOINT}/${SIGNATURE}/${options}/${url}`);
		const arrayBuffer = await response.arrayBuffer();

		const filePath = `thumbnails/${Date.now()}-${upload.id}.webp`;

		const record = await prisma.thumbnail.create({
			data: {
				uploadId: upload.id,
				fileName: filePath
			}
		});

		await minio.putObject(BUCKET, filePath, Buffer.from(arrayBuffer), arrayBuffer.byteLength, {
			'Content-Type': 'image/webp'
		});

		return record;
	} catch (_) {
		console.log(new Date(), 'Failed to fetch thumbnail for url', url);
	}

	processing.delete(upload.id);
}

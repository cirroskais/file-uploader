import { getUpload } from '$lib/server/database';
import minio, { BUCKET } from '$lib/server/minio';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const file = await getUpload(params.id);
	if (!file) throw error(404, { status: 404, message: 'File Not Found' });

	const metadata = await minio.statObject(BUCKET, `${file.uploader.id}/${file.fileName}`);

	return {
		file: {
			id: file.id,
			fileName: file.fileName,
			uploaded: file.uploaded,
			size: metadata.size,
			type: metadata.metaData['content-type']
		},
		uploader: {
			username: file.uploader.username
		}
	};
}

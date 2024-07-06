import { getSettings, getUpload } from '$lib/server/database';
import minio, { BUCKET } from '$lib/server/minio';
import { error } from '@sveltejs/kit';

export async function load({ params, locals }) {
	const file = await getUpload(params.id);
	if (!file) throw error(404, { status: 404, message: 'File Not Found' });

	if (!file.public && locals?.user?.id !== file.uploader.id)
		throw error(403, { status: 403, message: 'Forbidden' });

	const settings = await getSettings(file.uploader.id);
	if (!settings) throw error(500, { status: 500, message: 'Internal Server Error' });

	const metadata = await minio.statObject(BUCKET, `${file.uploader.id}/${file.internalName}`);

	function formatString(input: string) {
		if (file && metadata)
			return input
				.replaceAll('{{file}}', file.fileName)
				.replaceAll('{{username}}', file.uploader.username)
				.replaceAll('{{time}}', file.uploaded.toUTCString());
	}

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
		},
		settings: {
			title: formatString(settings.embedTitle),
			description: formatString(settings.embedDescription),
			color: '#' + settings.embedColor.toString(16),
			large: true
		}
	};
}

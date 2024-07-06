import { authenticate } from '$lib/server/auth';
import { catIdCharacters, generateId } from '$lib/server/crypto.js';
import { createUpload } from '$lib/server/database';
import minio, { BUCKET } from '$lib/server/minio';
import { error } from '@sveltejs/kit';

export const POST = async ({ request, cookies }) => {
	const contentType = request.headers.get('Content-Type');
	if (!contentType || !contentType.includes('multipart/form-data'))
		return error(400, { status: 400, message: 'Improper Content-Type' });

	const user = await authenticate(request, cookies);
	if (!user) return error(403, { status: 403, message: 'Forbidden' });

	const data = await request.formData();
	const file = data.get('file') as File;
	let id = generateId(undefined, 10);

	console.log(id);

	const object = await minio
		.putObject(
			BUCKET,
			`${user.id}/${file.name}`,
			Buffer.from(await file.arrayBuffer()),
			file.size,
			{
				'Content-Type': file.type
			}
		)
		.catch((e) => console.log(e));
	if (!object)
		return error(500, { status: 500, message: 'Internal Server Error - Contact Administrator' });

	const objectRecord = await createUpload(id, user.id, file.name);
	if (!objectRecord)
		return error(500, { status: 500, message: 'Internal Server Error - Contact Administrator' });

	if (user.settings?.linkToRaw) return new Response(`/download/${id}`);
	return new Response(`/file/${id}`);
};

import { building } from '$app/environment';
import { env } from '$env/dynamic/private';
import * as Minio from 'minio';
import { get, writable } from 'svelte/store';

const minio = new Minio.Client({
	endPoint: building ? 'building.local' : env.MINIO_URL,
	useSSL: true,
	accessKey: building ? 'building' : env.MINIO_ACCESS_KEY,
	secretKey: building ? 'building' : env.MINIO_SECRET_KEY
});

export default minio;

export const BUCKET = building ? 'building' : env.MINIO_BUCKET;

export let USAGE = writable(0);

function du() {
	let usage = 0;
	const stream = minio.listObjects(BUCKET, undefined, true);
	stream.on('data', (object) => (usage += object.size));
	stream.on('end', () => USAGE.set(usage));
}

if (!building) {
	du();
	setTimeout(du, 1000 * 60 * 10);
}

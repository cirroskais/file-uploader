import { bytesToHumanReadable } from '$lib';
import prisma from '$lib/server/database';
import { USAGE } from '$lib/server/minio';
import { json } from '@sveltejs/kit';
import { get } from 'svelte/store';

export async function GET() {
	return json({
		users: await prisma.user.count({}),
		files: await prisma.upload.count({}),
		storage: bytesToHumanReadable(get(USAGE))
	});
}

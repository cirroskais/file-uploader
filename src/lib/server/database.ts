import { PrismaClient } from '@prisma/client';
import { randomBytes } from 'node:crypto';
import { createHash } from './crypto';

const prisma = new PrismaClient();
export default prisma;

interface FindUserQuery {
	username?: string;
	email?: string;
}

export async function createUser(username: string, email: string, password: string) {
	const user = await prisma.user.create({
		data: {
			username,
			email,
			password: await createHash(password),
			role: 'USER'
		}
	});

	await prisma.userSettings.create({
		data: {
			userId: user.id
		}
	});

	return user;
}

export async function createSession(userId: number, needsMfa = false) {
	const session = await prisma.session.create({
		data: {
			id: randomBytes(64).toString('base64'),
			userId,
			authorized: !needsMfa,
			expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 12)
		}
	});

	return session;
}

export async function findUser({ email, username }: FindUserQuery) {
	if (!email && !username) return false;

	const user = await prisma.user.findFirst({
		where: {
			email,
			username
		}
	});

	return user;
}

export async function getSession(id: string) {
	if (!id) return false;

	const session = await prisma.session.findFirst({
		where: { id },
		include: {
			user: {
				select: {
					id: true,
					username: true,
					email: true,
					password: true,
					role: true,
					createdAt: true,
					lastSeen: true,
					maxUploadMB: true,
					settings: true
				}
			}
		}
	});

	return session;
}

export async function deleteSession(id: string) {
	if (!id) return false;

	return await prisma.session.delete({
		where: { id }
	});
}

export async function createUpload(
	id: string,
	uploaderId: number,
	fileName: string,
	internalName: string,
	size: number
) {
	const settings = await prisma.userSettings.findFirst({
		where: { id: uploaderId }
	});

	return await prisma.upload.create({
		data: {
			id,
			uploaderId,
			fileName,
			internalName,
			size,
			public: settings?.newPostsPublic
		}
	});
}

export async function getUpload(id: string) {
	if (!id) return false;

	return await prisma.upload.findFirst({
		where: {
			id
		},
		select: {
			id: true,
			fileName: true,
			internalName: true,
			public: true,
			uploaded: true,
			uploader: true
		}
	});
}

export async function getSettings(id: number) {
	if (!id) return false;

	return await prisma.userSettings.findFirst({
		where: {
			userId: id
		}
	});
}

export async function getUserApiKeys(userId: number) {
	if (!userId) return false;

	return await prisma.aPIKey.findMany({
		where: {
			userId: userId
		}
	});
}

export async function createUserApiKey(userId: number, permissions: number, expiresAt: Date) {
	if (!userId) return false;

	return await prisma.aPIKey.create({
		data: {
			id: randomBytes(42).toString('base64url'),
			userId,
			permissions,
			expiresAt
		}
	});
}

export async function deleteUserApiKey(userId: number, id: string) {
	if (!userId || !id) return false;

	return await prisma.aPIKey.delete({
		where: {
			userId,
			id
		}
	});
}

export async function getUserApiKey(id: string) {
	if (!id) return false;

	return await prisma.aPIKey.findFirst({
		where: {
			id
		},
		include: {
			user: {
				select: {
					id: true,
					username: true,
					email: true,
					password: true,
					role: true,
					createdAt: true,
					lastSeen: true,
					maxUploadMB: true,
					settings: true
				}
			}
		}
	});
}

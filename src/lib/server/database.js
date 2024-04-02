import { PrismaClient } from '@prisma/client';
import { randomBytes } from 'node:crypto';
import { createHash } from './crypto';

const prisma = new PrismaClient();
export default prisma;

export async function createUser(username, email, password) {
	const user = await prisma.user.create({
		data: {
			username,
			email,
			password: await createHash(password)
		}
	});

	const settings = await prisma.userSettings.create({
		data: {
			userId: user.id
		}
	});

	return user;
}

export async function createSession(userId, needsMfa = false) {
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

export async function findUser({ email, username }) {
	if (!email || !username) return false;

	const user = await prisma.user.findFirst({
		where: {
			email,
			username
		}
	});

	return user;
}

export async function getSession(id) {
	if (!id) return false;

	const session = await prisma.session.findFirst({
		where: { id },
		include: {
			user: true
		}
	});

	return session;
}

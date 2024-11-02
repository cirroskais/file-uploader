import prisma from '$lib/server/database';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const id = params.id;
	const user = await prisma.user.findFirst({
		where: { id: Number(id) },
		select: {
			id: true,
			username: true,
			email: true,
			lastSeen: true,
			createdAt: true,
			role: true,
			uploads: true,
			_count: { select: { apiKeys: true, sessions: true, uploads: true } }
		}
	});

	if (!user) error(404, { status: 404, message: 'User Not Found' });

	return { selectedUser: user };
};

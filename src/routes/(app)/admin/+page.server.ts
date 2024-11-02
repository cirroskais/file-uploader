import prisma from '$lib/server/database';

export const load = async () => {
	const users = prisma.user.findMany({
		select: {
			id: true,
			email: true,
			username: true,
			maxUploadMB: true,
			_count: {
				select: {
					uploads: true,
					sessions: true,
					apiKeys: true
				}
			}
		}
	});

	return { users };
};

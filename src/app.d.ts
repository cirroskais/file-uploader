import type { Role } from '@prisma/client';

export interface UserSafe {
	id: number;
	username: string;
	email: string;
	maxUploadMB: number;
	role: Role;
}

declare global {
	namespace App {
		interface Error {
			status: number;
			message: string;
		}
		interface Locals {
			user: UserSafe;
		}
		interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

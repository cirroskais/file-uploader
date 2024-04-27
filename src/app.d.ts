declare global {
	namespace App {
		interface Error {
			status: number;
			message: string;
		}
		interface Locals {
			user: User;
		}
		interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

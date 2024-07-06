import { hash, verify } from 'argon2';

export const letterIdCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
export const catIdCharacters = ['🐱', '😻', '😿', '😹', '😽', '😾', '🙀', '😸', '😺', '😼', '🐈'];

export async function createHash(input: string) {
	return await hash(input);
}

export async function verifyHash(hash: string, input: string) {
	return await verify(hash, input);
}

export function generateId(characters: String[] = letterIdCharacters, length: number) {
	length = Math.max(length, 6);
	let id = '';

	for (let i = 0; length > i; i++) {
		id += characters[Math.floor(Math.random() * characters.length)];
	}

	return id;
}

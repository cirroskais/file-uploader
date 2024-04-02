import { hash, verify } from 'argon2';

export async function createHash(input) {
	return await hash(input);
}

export async function verifyHash(hash, input) {
	return await verify(hash, input);
}

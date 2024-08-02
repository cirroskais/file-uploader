import { z } from 'zod';
import { findUser } from './database';

const INTERNAL_email = z.string().email('Invalid email address.');

export const email = INTERNAL_email.parse;

export const emailAndNotUsed = INTERNAL_email.refine(async (_) => {
	return !Boolean(await findUser({ email: _ }));
}, 'Email is already being used.').parseAsync;

const INTERNAL_username = z
	.string()
	.min(3, 'Username must be at least 3 characters.')
	.max(16, 'Usernames must be no more than 16 characters.')
	.regex(
		new RegExp(/^[A-z0-9\_\-\.]+$/g),
		'Usernames must be alphanumeric with dashes, underscores, and periods.'
	);

export const username = INTERNAL_username.parse;

export const usernameAndNotUsed = INTERNAL_username.refine(async (_) => {
	return !Boolean(await findUser({ username: _ }));
}, 'Username is already being used.').parseAsync;

export const password = z
	.string()
	.min(6, 'Passwords must be longer than 6 characters.')
	.max(128, 'You do not need a password longer than 128 fucking characters.').parse;

export const embedTitle = z
	.string()
	.max(256, 'Title must not be longer than 256 characters.').parse;

export const embedDescription = z
	.string()
	.max(2000, 'Description must not be longer than 2000 characters.').parse;

export const embedColor = z
	.number()
	.max(parseInt('ffffff', 16), 'Color must be less than 16777215.').parse;

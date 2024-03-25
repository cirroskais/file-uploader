import { createHash } from 'node:crypto';
import { COOKIE } from '$lib/config.js';

const limits = new Map();

const CookieLimits = {
	Minute: 100,
	Hour: 1000
};

const ApiKeyLimits = {
	Minute: 0,
	Hour: 0
};

setInterval(function resetMinute() {}, 1000 * 60);
setInterval(function resetHour() {}, 1000 * 60 * 60);

function hash(input) {
	createHash('sha256').update(input).digest('hex');
}

export async function cookie({ cookies }) {
	const hashed = hash(cookies.get(COOKIE));
	console.log(hashed);
}

export async function apiKey(event) {}

export async function handle(event) {}

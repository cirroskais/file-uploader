export const COOKIE = '.FILE-UPLOADER-SESSION';

export const MAIL_WHITELIST = [
	'gmail.com',
	'outlook.com',
	'madhouselabs.net',
	'dfuser.xyz',
	'liloandstit.ch',
	'vea.st',
	'fwfy.club',
	'protonmail.com',
	'pm.me',
	'proton.me'
];

export const DOMAINS = [
	'cdn.cirroskais.xyz',
	'cdn.madhouselabs.net',
	'snep.lol',
	'i.chadthundercock.com',
	'doing-ya.mom',
	'*.is-gay.zip'
];

export const DEV_DOMAINS = ['cdn.dev.madhouselabs.net'];

export const API_KEY_PERMISSIONS = {
	CREATE_UPLOADS: 1 << 0,
	READ_UPLOADS: 1 << 1,
	UPDATE_UPLOADS: 1 << 2,
	DELETE_UPLOADS: 1 << 3,

	READ_ACCOUNT: 1 << 4,
	UPDATE_ACCOUNT_ACCOUNT_SETTINGS: 1 << 5, // allows for updating username & email. bad idea? probably.
	UPDATE_ACCOUNT_EMBED_SETTINGS: 1 << 6
};

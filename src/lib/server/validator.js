import validator from 'validator';
import { MAIL_WHITELIST } from '$lib/config';

// https://github.com/validatorjs/validator.js?tab=readme-ov-file#validators

export function email(input) {
	return validator.isEmail(input, { host_whitelist: MAIL_WHITELIST });
}

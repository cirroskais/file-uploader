import { browser } from '$app/environment';

export function goBack() {
	if (browser) {
		history.back();
	}
}

/** @param bytes {Number} */
export function bytesToHumanReadable(bytes) {
	if (bytes === 0) {
		return '0 B';
	}

	let e = Math.floor(Math.log(bytes) / Math.log(1024));
	return (bytes / Math.pow(1024, e)).toFixed(2) + ' ' + ' KMGTP'.charAt(e) + 'B';
}

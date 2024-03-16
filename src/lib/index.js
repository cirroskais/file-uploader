import { browser } from '$app/environment';

export function goBack() {
	if (browser) {
		history.back();
	}
}

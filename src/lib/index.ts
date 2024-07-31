import { browser } from '$app/environment';

export function goBack() {
	if (browser) {
		history.back();
	}
}

export function bytesToHumanReadable(bytes: number) {
	let i = bytes == 0 ? 0 : Math.floor(Math.log(bytes) / Math.log(1024));
	return (
		+(bytes / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'][i]
	);
}

export function request(
	data: FormData,
	progress: Function
): Promise<{ success: boolean; body: string }> {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();

		xhr.addEventListener('loadend', () => {
			resolve({
				success: xhr.readyState === 4 && xhr.status === 200,
				body: xhr.responseText
			});
		});

		xhr.addEventListener('error', (event) => {
			reject(event);
		});

		xhr.upload.addEventListener('progress', (event) => {
			if (event.lengthComputable) {
				progress(Math.floor((event.loaded / event.total) * 100));
			}
		});

		xhr.open('POST', '/api/v1/upload', true);
		xhr.send(data);
	});
}

<script>
	import { browser } from '$app/environment';
	import { darkMode } from '../stores';

	if (browser) {
		const html = document.getElementsByTagName('html')[0];

		$darkMode = localStorage.getItem('darkMode') === 'true';

		darkMode.subscribe(() => {
			console.log(`[ThemeHandler.svelte] Current theme is ${$darkMode ? 'dark' : 'light'} mode`);

			localStorage.setItem('darkMode', $darkMode);

			if ($darkMode) {
				console.log('[ThemeHandler.svelte] Setting dark mode from store');
				html.classList.add('dark');
				html.classList.add('frappe');
			} else {
				console.log('[ThemeHandler.svelte] Setting light mode from store');
				html.classList.remove('dark');
				html.classList.remove('frappe');
			}
		});
	}
</script>

<svelte:head>
	<script>
		const darkMode = localStorage.getItem('darkMode') === 'true';
		const html = document.getElementsByTagName('html')[0];

		if (darkMode) {
			console.log('[ThemeHandler.svelte] Setting dark mode from localStorage');
			html.classList.add('dark');
			html.classList.add('frappe');
		} else {
			console.log('[ThemeHandler.svelte] Setting light mode from localStorage');
			html.classList.remove('dark');
			html.classList.remove('frappe');
		}
	</script>
</svelte:head>

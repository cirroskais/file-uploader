<script>
	import '../app.css';

	import { Toaster } from 'svelte-sonner';

	import { darkMode } from '$lib/stores.js';
	import ThemeHandler from '$lib/components/ThemeHandler.svelte';
	import PageMeta from '$lib/components/PageMeta.svelte';
</script>

<PageMeta title="cirro's file uploader" />
<ThemeHandler />
<Toaster theme={$darkMode ? 'dark' : 'light'} />

<div class="container py-4">
	<slot />
</div>

<script>
	import '../app.css';

	import { Toaster } from 'svelte-sonner';

	import { darkMode, user } from '$lib/stores.js';
	import ThemeHandler from '$lib/components/ThemeHandler.svelte';
	import PageMeta from '$lib/components/PageMeta.svelte';

	export let data;

	user.set(data?.user);
</script>

<PageMeta title="cirro's file uploader" />
<ThemeHandler />
<Toaster theme={$darkMode ? 'dark' : 'light'} position={'bottom-center'} />

<div class="container">
	<slot />
</div>

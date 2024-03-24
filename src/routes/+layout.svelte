<script>
	import '../app.css';

	import { Toaster } from 'svelte-sonner';
	import { page } from '$app/stores';

	import { darkMode } from '$lib/stores.js';
	import ThemeHandler from '$lib/components/ThemeHandler.svelte';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import LoggedOut from '$lib/components/LoggedOut.svelte';
</script>

<PageMeta title="cirro's file uploader" />
<ThemeHandler />
<Toaster theme={$darkMode ? 'dark' : 'light'} />

{#if $page.data.session?.user}
	<div class="container">
		<slot />
	</div>
{:else}
	<LoggedOut />
{/if}

<script>
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
</script>

{#key $page.url}
	<div in:fade class="container">
		<slot />
	</div>
{/key}

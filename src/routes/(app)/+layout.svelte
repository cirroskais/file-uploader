<script>
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="container my-2 w-full min-h-screen">
	<div class="w-full h-12">
		<Header></Header>
	</div>

	{#key $page.url}
		<div in:fade|global class="w-full min-h-[calc(100vh-4.5rem)] my-2">
			<slot />
		</div>
	{/key}

	<div class="w-full h-20">
		<Footer></Footer>
	</div>
</div>

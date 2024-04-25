<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="my-2 w-full min-h-screen">
	<div class="w-full h-12">
		<Header></Header>
	</div>

	<div class="w-full min-h-[calc(100vh-4.5rem)] my-2">
		<slot />
	</div>

	<div class="w-full h-20">
		<Footer></Footer>
	</div>
</div>

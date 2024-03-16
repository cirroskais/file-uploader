<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import Link from '$lib/components/Link.svelte';

	function goBack() {
		if (browser) {
			history.back();
		}
	}
</script>

<div class="flex justify-center items-center h-screen">
	<div class="flex flex-col space-y-4">
		<div class="text-center">
			<h1 class="text-4xl"><strong>{$page.error.status}</strong></h1>
			<p class="text-xl">{$page.error.message}</p>
		</div>
		<div class="flex space-x-2">
			<Button click={goBack}>
				<p>Take me back!</p>
			</Button>
			<Link style="button" href="/">
				<p>Go Home</p>
			</Link>
		</div>
	</div>
</div>

<script>
	import { Undo, Home } from 'lucide-svelte';
	import { page } from '$app/stores';

	import { goBack } from '$lib/index';

	import Button from '$lib/components/Inputs/Button.svelte';
	import Link from '$lib/components/Inputs/Link.svelte';
</script>

<div class="flex justify-center items-center h-screen">
	<div class="flex flex-col space-y-4">
		<div class="text-center">
			<h1 class="text-4xl"><strong>{$page.error.status}</strong></h1>
			<p class="text-xl">{$page.error.message}</p>
		</div>
		<div class="flex space-x-2">
			<Button click={goBack}>
				<p>Go Back</p>
			</Button>
			<Link style="button" href="/">
				<p>Go Home</p>
			</Link>
		</div>
	</div>
</div>

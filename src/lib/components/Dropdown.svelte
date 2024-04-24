<script>
	import { slide } from 'svelte/transition';
	import { Menu } from 'lucide-svelte';

	let visible = false;

	function toggle() {
		visible = !visible;
	}
</script>

<div class="relative w-fit text-sm">
	<button class="w-min" on:click={toggle}><Menu></Menu></button>
	{#if visible}
		<button
			transition:slide
			class="w-52 z-10 h-fit translate-y-12 py-2 bg-neutral-900 rounded-lg origin-top right-0 absolute"
		>
			<slot />
		</button>
	{/if}
</div>

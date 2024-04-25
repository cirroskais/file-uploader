<script>
	import { slide } from 'svelte/transition';
	import { Menu } from 'lucide-svelte';

	let visible = false;

	function toggle() {
		visible = !visible;
	}
</script>

<div class="flex relative w-fit">
	<button class="my-auto w-min" on:click={toggle}>
		<Menu class="w-5 h-5"></Menu>
	</button>
	{#if visible}
		<button
			transition:slide
			class="w-[12rem] z-10 h-fit translate-y-12 py-2 bg-neutral-200 dark:bg-neutral-900 rounded-lg origin-top right-0 absolute transition-all"
		>
			<slot />
		</button>
	{/if}
</div>

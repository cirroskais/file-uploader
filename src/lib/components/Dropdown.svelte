<script>
	import { slide } from 'svelte/transition';
	import { Menu } from 'lucide-svelte';

	let visible = false;

	function toggle() {
		visible = !visible;
	}
</script>

<svelte:body
	on:mousedown={() => {
		if (visible)
			setTimeout(() => {
				visible = false;
			}, 150);
	}}
/>

<div class="flex relative w-fit">
	<button class="my-auto w-min hover:text-overlay2 {visible && 'text-overlay2'}" on:click={toggle}>
		<Menu size="20"></Menu>
	</button>
	{#if visible}
		<div
			transition:slide
			class="w-[12rem] z-10 h-fit translate-y-11 py-2 bg-crust rounded-lg origin-top right-0 absolute transition-all shadow-md translate-x-4 outline outline-1 outline-surface0"
		>
			<slot />
		</div>
	{/if}
</div>

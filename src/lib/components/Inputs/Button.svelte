<script>
	export let click,
		disabled = false,
		pulse = false;
</script>

<button
	class="group/button {pulse ? 'animate-pulse cursor-wait' : ''} transition-colors"
	type="button"
	on:click={click}
	{disabled}
>
	<div
		class="flex p-2 space-x-2 rounded-lg border-b-2 transition-colors border-neutral-400 bg-neutral-200 hover:border-neutral-500 hover:group-disabled/button:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 hover:dark:border-neutral-500 hover:group-disabled/button:dark:border-neutral-700"
	>
		<slot />
	</div>
</button>

<script>
	export let click;
</script>

<button type="button" on:click={click}>
	<div
		class="flex p-2 space-x-2 rounded-lg border-b-2 transition-colors border-neutral-400 hover:border-neutral-500 hover:dark:border-neutral-500 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-900"
	>
		<slot />
	</div>
</button>

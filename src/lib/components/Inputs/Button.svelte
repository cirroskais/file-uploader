<script>
	export let click,
		disabled = false,
		pulse = false;
</script>

<button
	class="group/button {pulse ? 'animate-pulse cursor-wait' : ''} "
	type="button"
	on:click={click}
	{disabled}
>
	<div
		class="flex p-2 space-x-2 rounded-lg border-b-2 hadow-md bg-crust border-overlay2 hover:border-overlay0 group-disabled/button:border-overlay0 group-disabled/button:hover:border-overlay0"
	>
		<slot />
	</div>
</button>

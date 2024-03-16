<script>
	export let type, name, id, placeholder;
</script>

<div class="flex p-2 space-x-1 rounded-lg transition-colors bg-neutral-200 dark:bg-neutral-900">
	<div class="py-0.5 pr-1 border-r-2 transition-colors border-neutral-400 dark:border-neutral-700">
		<slot />
	</div>
	<input
		class="py-0.5 transition-colors bg-neutral-200 dark:bg-neutral-900"
		{type}
		{name}
		{id}
		{placeholder}
	/>
</div>

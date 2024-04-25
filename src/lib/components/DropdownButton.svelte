<script>
	export let href = '';
</script>

<a
	{href}
	class="flex px-3 py-1.5 space-x-1 transition-all hover:bg-neutral-300 hover:dark:bg-neutral-800"
>
	<slot />
</a>

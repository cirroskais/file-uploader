<script>
	export let href = '';
</script>

<a {href} class="flex px-3 py-1.5 space-x-1 transition-all hover:bg-neutral-600">
	<slot />
</a>

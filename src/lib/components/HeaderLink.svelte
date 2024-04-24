<script>
	import { page } from '$app/stores';

	export let href;
	let selected = false;

	page.subscribe((pg) => {
		selected = pg.url.pathname === href;
	});
</script>

<a
	{href}
	class="my-auto md:text-lg transition-all {selected
		? 'font-bold tracking-wider'
		: 'hover:text-neutral-500 focus:text-neutral-500'}"
>
	<slot />
</a>

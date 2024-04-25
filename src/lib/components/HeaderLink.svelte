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
		: 'hover:text-overlay2 focus:text-overlay2'}"
>
	<slot />
</a>

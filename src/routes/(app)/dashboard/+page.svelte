<script>
	import { user } from '$lib/stores';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';

	export let data;

	user.set(data?.user);
</script>

<p>
	<tt class="block whitespace-pre-wrap">
		{JSON.stringify($user)}
	</tt>
</p>

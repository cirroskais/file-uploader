<script>
	import { page } from '$app/stores';
	import { signOut } from '@auth/sveltekit/client';

	import Button from '$lib/components/Button.svelte';
</script>

<p>
	<tt class="block whitespace-pre-wrap">
		{JSON.stringify($page.data?.session, null, 4)}
	</tt>
</p>

<Button click={signOut}>
	<p>Logout</p>
</Button>

<script>
	import { user } from '$lib/stores';

	export let data;

	user.set(data?.user);
</script>

<p>
	<tt class="block whitespace-pre-wrap">
		{JSON.stringify($user)}
	</tt>
</p>

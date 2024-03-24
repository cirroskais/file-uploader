<script>
	import { page } from '$app/stores';
</script>

<p>
	<tt class="block whitespace-pre-wrap">
		{JSON.stringify($page.data?.session, null, 4)}
	</tt>
</p>

<script>
	import { X } from 'lucide-svelte';

	export let key;
</script>

<tr>
	<th>
		<tt class="text-md">{key.id}</tt>
	</th>
	<th class="flex">
		<button class="m-auto hover:text-red">
			<X></X>
		</button>
	</th>
</tr>

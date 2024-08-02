<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { X } from 'lucide-svelte';

	export let key: { id: string };

	function remove() {
		fetch('/api/v1/keys', {
			method: 'DELETE',
			body: JSON.stringify({ key: key.id })
		}).then(() => invalidateAll());
	}
</script>

<tr>
	<th>
		<tt class="text-md">{key.id}</tt>
	</th>
	<th class="flex">
		<button class="m-auto hover:text-red" on:click={remove}>
			<X></X>
		</button>
	</th>
</tr>

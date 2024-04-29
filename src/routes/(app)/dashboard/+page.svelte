<script>
	import { Upload } from 'lucide-svelte';

	import { user } from '$lib/stores';

	import Button from '$lib/components/Inputs/Button.svelte';
	import ButtonText from '$lib/components/Inputs/ButtonText.svelte';

	export let data;

	user.set(data?.user);
</script>

<div class="w-96 h-[calc(100vh-4.5rem)] flex flex-col gap-2 mx-auto">
	<div class="bg-crust w-full mx-auto mt-auto p-2 rounded-lg shadow-lg">
		<button class="w-full outline-2 outline-dotted outline-surface2 rounded-sm bg-mantle h-36 flex">
			<div class="m-auto text-lg flex text-surface2">
				<Upload></Upload>
			</div>
		</button>
	</div>
	<div class="bg-crust w-full mx-auto mb-auto p-2 rounded-lg shadow-lg">
		<table class="table-auto w-full mx-auto text-sm">
			<tbody>
				<tr>
					<td class="font-bold">Registered Users</td>
					<td class="text-right">100</td>
				</tr>
				<tr>
					<td class="font-bold">Files Hosted</td>
					<td class="text-right">100 Billion</td>
				</tr>
				<tr>
					<td class="font-bold">File Storage</td>
					<td class="text-right">1 TB</td>
				</tr>
				<tr>
					<td class="font-bold">Max Upload Size</td>
					<td class="text-right">100 MB</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

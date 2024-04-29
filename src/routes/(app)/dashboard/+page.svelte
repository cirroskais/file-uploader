<script>
	import { Upload } from 'lucide-svelte';
	import { page } from '$app/stores';

	import { user } from '$lib/stores';

	import Button from '$lib/components/Inputs/Button.svelte';
	import ButtonText from '$lib/components/Inputs/ButtonText.svelte';
	import { fade } from 'svelte/transition';

	export let data;

	user.set(data?.user);
</script>

<div class="w-96 h-[calc(100vh-4.5rem)] flex mx-auto">
	<div class="my-auto flex flex-col w-full gap-2">
		<div>
			<h1 class="text-2xl font-bold">Welcome, {$page.data.user.username}.</h1>
			<p class="text-overlay1">Your max upload size is <span class="font-bold">100 MB</span>.</p>
		</div>
		<div class="bg-crust w-full mx-auto p-2 rounded-lg shadow-lg">
			<button
				class="w-full outline-2 outline-dotted outline-surface2 rounded-sm bg-mantle h-36 flex"
			>
				<div class="m-auto text-lg flex text-surface2">
					<Upload></Upload>
				</div>
			</button>
		</div>
		<div class="bg-crust w-full mx-auto mb-auto p-2 rounded-lg shadow-lg">
			<table class="table-auto w-full mx-auto text-sm">
				<tbody>
					{#await data?.streamed?.statistics}
						<div class="h-[66px]"></div>
					{:then statistics}
						<tr in:fade={{ delay: 60 * 1 }}>
							<td class="font-bold">Registered Users</td>
							<td class="text-right">{statistics?.users}</td>
						</tr>
						<tr in:fade={{ delay: 60 * 2 }}>
							<td class="font-bold">Files Hosted</td>
							<td class="text-right">{statistics?.files}</td>
						</tr>
						<tr in:fade={{ delay: 60 * 3 }}>
							<td class="font-bold">File Storage</td>
							<td class="text-right">{statistics?.storage}</td>
						</tr>
					{/await}
				</tbody>
			</table>
		</div>
	</div>
</div>

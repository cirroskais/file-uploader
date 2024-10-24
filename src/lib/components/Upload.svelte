<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { bytesToHumanReadable } from '$lib';
	import { File, Trash } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	export let upload: any, i;
	let image = true;

	async function deleteFile() {
		await fetch(`/api/v1/delete/${upload.id}`, { method: 'POST' });
		invalidateAll();
	}
</script>

<!-- in:fade|global={{ duration: 400, delay: 50 * i }} -->

<div class="relative group">
	<button
		class="hidden absolute top-3 right-3 z-10 p-2 rounded-lg transition-all group-hover:block bg-surface0/50 hover:bg-crust text-red"
		on:click={deleteFile}
	>
		<Trash></Trash>
	</button>
	<a
		href="/file/{upload.id}"
		class="flex flex-col gap-2 p-2 mx-auto w-full rounded-lg shadow-lg bg-crust"
	>
		<div class="flex w-full rounded-lg aspect-video bg-mantle">
			{#if image}
				<img
					class="object-cover mx-auto w-full rounded-lg"
					src="/api/v1/thumbnail/{upload.id}"
					alt="Thumbnail"
					on:error={() => {
						image = false;
					}}
				/>
			{:else}
				<File size="32" class="m-auto text-surface2"></File>
			{/if}
		</div>
		<div>
			<p class="font-bold overflow-ellipsis whitespace-nowrap overflow-x-clip">
				{upload.fileName}
			</p>
			<p class="text-sm text-overlay1">{bytesToHumanReadable(upload.size)}</p>
		</div>
	</a>
</div>

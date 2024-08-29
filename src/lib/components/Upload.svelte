<script>
	import { bytesToHumanReadable } from '$lib';
	import { File } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	export let upload, i;
	let image = true;
</script>

<a
	in:fade|global={{ duration: 500, delay: 100 * i }}
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

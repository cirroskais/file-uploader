<script lang="ts">
	import { File, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { bytesToHumanReadable } from '$lib';
	import { fade } from 'svelte/transition';
	import { writable, get } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	export let data;

	let pageIndex = writable(Number($page.url.searchParams.get('i')) || 0);
	pageIndex.subscribe((_) => {
		if (browser) {
			goto('/uploads?i=' + get(pageIndex));
		}
	});
</script>

{#await data.uploads then uploads}
	{#if uploads.length}
		<div class="grid grid-cols-5 grid-rows-3 gap-2">
			{#each uploads as upload, i}
				<a
					in:fade|global={{ duration: 500, delay: 100 * i }}
					href="/file/{upload.id}"
					class="flex flex-col gap-2 p-2 mx-auto w-full rounded-lg shadow-lg bg-crust"
				>
					<div class="flex w-full rounded-lg aspect-video bg-mantle">
						<File size="32" class="m-auto text-surface2"></File>
					</div>
					<div>
						<p class="font-bold overflow-ellipsis whitespace-nowrap overflow-x-clip">
							{upload.fileName}
						</p>
						<p class="text-sm text-overlay1">{bytesToHumanReadable(upload.size)}</p>
					</div>
				</a>
			{/each}
		</div>
	{:else}
		<p>no uploads</p>
	{/if}
	<div class="flex mx-auto mt-2 space-x-1 rounded-md bg-crust w-fit">
		<button
			class="p-2 my-auto hover:text-overlay2"
			on:click={() => {
				if ($pageIndex <= 0) return;
				$pageIndex -= 1;
			}}
		>
			<ChevronLeft></ChevronLeft>
		</button>
		<p class="p-2 my-auto">{$pageIndex + 1} / {Math.ceil(data.totalUploads / 15)}</p>
		<button
			class="p-2 my-auto hover:text-overlay2"
			on:click={() => {
				if ($pageIndex >= Math.ceil(data.totalUploads / 15) - 1) return;
				$pageIndex += 1;
			}}
		>
			<ChevronRight></ChevronRight>
		</button>
	</div>
{/await}

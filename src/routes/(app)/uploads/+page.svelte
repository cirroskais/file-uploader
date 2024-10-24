<script lang="ts">
	import { File, ChevronLeft, ChevronRight } from 'lucide-svelte';

	import { writable, get } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Upload from '$lib/components/Upload.svelte';

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
				<Upload {upload} {i}></Upload>
			{/each}
		</div>
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
	{/if}
{/await}

<script lang="ts">
	import { Check, Upload } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { fileProgress, user } from '$lib/stores';
	import { fade, slide } from 'svelte/transition';
	import FileComponent from '$lib/components/File.svelte';
	import { get } from 'svelte/store';
	import { request } from '$lib';

	export let data;
	user.set(data?.user);

	let input: HTMLInputElement,
		files: FileList,
		fileMap: Map<string, File> = new Map();

	let running = false;

	// lazy again
	function progress(name: string, data: any) {
		let _ = get(fileProgress);
		fileProgress.set(
			Object.assign(_, {
				[name]: data
			})
		);
	}

	async function upload() {
		if (running) return;
		running = true;

		fileMap.forEach(async (v, k) => {
			const body = new FormData();
			body.append('file', v);

			const response = await request(body, (percent: number) => {
				progress(k, { percent });
			}).catch(() => {
				progress(k, { error: true });
			});

			if (response && response.success) progress(k, { url: response.body });
			else progress(k, { error: true });
		});
	}

	function remove(name: string) {
		fileMap.delete(name);
		fileMap = fileMap;
	}

	function change() {
		fileMap = new Map();

		for (let i = 0; files.length > i; i++) {
			let file = files.item(i);
			if (!file) return;

			fileMap.set(file.name, file);
		}
	}
</script>

<input class="hidden" type="file" multiple={true} bind:this={input} bind:files on:change={change} />

<div class="w-[23rem] h-[calc(100vh-4.5rem)] flex mx-auto">
	<div class="flex flex-col gap-2 my-auto w-full">
		<div>
			<h1 class="text-2xl font-bold">Welcome, {data.user.username}.</h1>
			<p class="text-overlay1">
				Your max upload size is <span class="font-bold">{data.user.maxUploadMB} MB</span>.
			</p>
		</div>
		<div class="flex flex-col gap-2 p-2 mx-auto w-full rounded-lg shadow-lg bg-crust">
			{#key fileMap}
				{#each fileMap.values() as file, i}
					<FileComponent {file} {i} {remove} {running}></FileComponent>
				{/each}
			{/key}

			{#if !running}
				<div out:slide class="flex gap-2">
					<button
						class="flex w-full {!fileMap.size
							? 'h-36'
							: 'h-14'} rounded-md outline-2 outline-dotted outline-surface2 bg-mantle group"
						on:click={() => {
							input.click();
						}}
					>
						<div class="flex m-auto text-lg text-surface2 group-hover:text-overlay1">
							<Upload></Upload>
						</div>
					</button>
					{#if fileMap.size}
						<button
							class="flex w-[25%] h-14 rounded-md transition-all outline-2 outline-dotted outline-surface2 bg-mantle group"
							on:click={upload}
						>
							<div class="flex m-auto text-lg text-surface2 group-hover:text-green">
								<Check class=""></Check>
							</div>
						</button>
					{/if}
				</div>
			{/if}
		</div>
		<div class="p-2 mx-auto mb-auto w-full rounded-lg shadow-lg bg-crust">
			<table class="mx-auto w-full text-sm table-auto">
				<tbody>
					{#await data?.streamed?.statistics}
						<div class="h-[66px]"></div>
					{:then statistics}
						<tr in:fade={{ delay: 60 * 1 }}>
							<td class="font-bold">Registered Users</td>
							<td class="text-right">{statistics?.users}</td>
						</tr>
						<tr in:fade={{ delay: 60 * 3 }}>
							<td class="font-bold">Files Hosted</td>
							<td class="text-right">{statistics?.files}</td>
						</tr>
						<tr in:fade={{ delay: 60 * 6 }}>
							<td class="font-bold">File Storage</td>
							<td class="text-right">{statistics?.storage}</td>
						</tr>
					{/await}
				</tbody>
			</table>
		</div>
	</div>
</div>

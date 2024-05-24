<script>
	import { Check, Upload } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { user } from '$lib/stores';
	import { fade, slide } from 'svelte/transition';
	import File from '$lib/components/File.svelte';

	export let data;
	user.set(data?.user);

	/** @type {HTMLInputElement} */
	let input;

	/** @type {FileList} */
	let files;

	let running = false;
</script>

<form class="hidden" action="">
	<input type="file" name="file" id="file" multiple={true} bind:this={input} bind:files />
</form>

<div class="w-[23rem] h-[calc(100vh-4.5rem)] flex mx-auto">
	<div class="flex flex-col gap-2 my-auto w-full">
		<div>
			<h1 class="text-2xl font-bold">Welcome, {$page.data.user.username}.</h1>
			<p class="text-overlay1">Your max upload size is <span class="font-bold">100 MB</span>.</p>
		</div>
		<div class="flex flex-col gap-2 p-2 mx-auto w-full rounded-lg shadow-lg bg-crust">
			{#if files?.length}
				{#each Array.from(files) as file, i}
					<File {file} {i}></File>
				{/each}
			{/if}
			{#if !running}
				<div out:slide class="flex gap-2">
					<button
						class="flex w-full {!files?.length
							? 'h-36'
							: 'h-14'} rounded-md outline-2 outline-dotted outline-surface2 bg-mantle group"
						on:click={() => {
							input.click();
						}}
					>
						<div
							class="flex m-auto text-lg transition-colors text-surface2 group-hover:text-overlay1"
						>
							<Upload></Upload>
						</div>
					</button>
					{#if files?.length}
						<button
							class="flex w-[25%] h-14 rounded-md transition-all outline-2 outline-dotted outline-surface2 bg-mantle group"
							on:click={() => {
								running = true;
							}}
						>
							<div
								class="flex m-auto text-lg transition-colors text-surface2 group-hover:text-green"
							>
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

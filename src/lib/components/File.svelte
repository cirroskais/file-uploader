<script lang="ts">
	import { bytesToHumanReadable } from '$lib/index';
	import { fileProgress, user } from '$lib/stores';
	import { CircleAlert, X } from 'lucide-svelte';
	import { get } from 'svelte/store';
	import { fade } from 'svelte/transition';

	export let file: File;
	export let i: number;
	export let remove: Function;
	export let running = false;

	let percent = 0,
		url = '',
		error = false;

	fileProgress.subscribe((_) => {
		let fileProgress = _[file.name];
		if (!fileProgress) return;

		if (fileProgress.percent) percent = fileProgress.percent;
		if (fileProgress.url) url = fileProgress.url;
		if (fileProgress.error) error = fileProgress.error;
	});
</script>

<div class="rounded-md transition-all bg-mantle">
	<div
		in:fade|global={{ delay: 100 * i }}
		class="flex place-content-between px-1.5 w-full h-14 rounded-md transition-all
        {url ? 'bg-blue/30' : ''} {error ? 'bg-red/30' : ''}"
		style={error || url
			? ''
			: `background: linear-gradient(90deg, rgb(var(--ctp-surface0)) ${percent}%, transparent ${percent}%);`}
	>
		<div class="flex overflow-x-scroll flex-col my-auto overflow-y-clip">
			{#if url}
				<a
					href={url}
					class="font-bold overflow-ellipsis whitespace-nowrap text-blue overflow-x-clip"
					>{file.name}</a
				>
			{:else}
				<p class="overflow-ellipsis whitespace-nowrap overflow-x-clip">{file.name}</p>
			{/if}

			<div class="flex gap-0.5">
				{#if file.size > get(user).maxUploadMB * 1048576}
					<p class="font-bold text-red">
						<CircleAlert class="w-4 h-4"></CircleAlert>
					</p>
				{/if}
				<p
					class="text-xs my-auto {file.size > get(user).maxUploadMB * 1048576
						? 'text-red font-bold'
						: 'text-overlay1'}"
				>
					{bytesToHumanReadable(file.size)}
				</p>
			</div>
		</div>
		{#if !running}
			<button
				class="hover:text-red-500"
				on:click={() => {
					remove(file.name);
				}}
			>
				<X size="20"></X></button
			>
		{/if}
	</div>
</div>

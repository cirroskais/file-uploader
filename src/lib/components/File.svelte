<script>
	import { bytesToHumanReadable } from '$lib';
	import { CircleAlert } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	/** @type {File} */
	export let file;

	/** @type {Number} */
	export let i;

	let percent = 0;
</script>

<div class="rounded-md transition-all bg-mantle">
	<div
		in:fade|global={{ delay: 100 * i }}
		class="flex px-1.5 w-full h-14 rounded-md transition-all"
		style="
        background: linear-gradient(90deg, rgb(var(--ctp-surface0)) {percent}%, transparent 
        {percent}%);"
	>
		<div class="flex overflow-x-scroll flex-col my-auto overflow-y-clip">
			{#if percent === 100}
				<a href="?" class="text-blue">{file.name}</a>
			{:else}
				<p>{file.name}</p>
			{/if}

			<div class="flex gap-0.5">
				{#if file.size > 104857600}
					<p class="font-bold text-red">
						<CircleAlert class="w-4 h-4"></CircleAlert>
					</p>
				{/if}
				<p class="text-xs my-auto {file.size > 104857600 ? 'text-red font-bold' : 'text-overlay1'}">
					{bytesToHumanReadable(file.size)}
				</p>
			</div>
		</div>
	</div>
</div>

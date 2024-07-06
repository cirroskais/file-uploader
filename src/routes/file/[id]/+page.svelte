<script>
	import { bytesToHumanReadable } from '$lib';
	import Link from '$lib/components/Inputs/Link.svelte';

	export let data;
</script>

<div class="container">
	<div class="h-[85vh] md:h-screen">
		<div class="flex justify-center items-center h-full">
			<div class="flex flex-col gap-2">
				<div>
					<h1 class="text-2xl font-bold">{data.file.fileName}</h1>
					<p class="text-overlay1">
						Uploaded by <span class="font-bold">{data.uploader.username}</span>.
					</p>
				</div>
				<div class="p-2.5 rounded-lg shadow-lg bg-crust h-[50vh]">
					{#if data.file.type.includes('video')}
						<!-- svelte-ignore a11y-media-has-caption -->
						<video class="h-full" src="/download/{data.file.id}" controls></video>
					{:else if data.file.type.includes('image')}
						<img class="h-full" src="/download/{data.file.id}" alt={data.file.id} />
					{/if}
				</div>
				<Link style="button" href="/download/{data.file.id}">
					<p class="w-full font-bold text-center">
						Download ({bytesToHumanReadable(data.file.size)})
					</p>
				</Link>
			</div>
		</div>
	</div>
</div>

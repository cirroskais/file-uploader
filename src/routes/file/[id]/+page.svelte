<script>
	import { page } from '$app/stores';
	import { bytesToHumanReadable } from '$lib';
	import Link from '$lib/components/Inputs/Link.svelte';
	import AudioPlayer from '$lib/components/AudioPlayer.svelte';

	export let data;
</script>

<svelte:head>
	<title>{data.file.fileName}</title>
	<meta property="og:title" content={data.settings.title} />
	<meta property="og:description" content={data.settings.description} />
	<meta property="og:url" content="{$page.url.origin}/file/{data.file.id}" />
	<meta property="og:site_name" content="cirro's file uploader" />
	<meta name="theme-color" content={data.settings.color} />
	{#if data.file.type.includes('video')}
		<meta property="og:type" content="video.other" />
		<meta
			property="og:video:url"
			content="{$page.url.origin}/download/{data.file.id}.{data.file.ext}"
		/>
	{:else if data.file.type.includes('image')}
		{#if data.settings.large}
			<meta property="twitter:card" content="summary_large_image" />
		{/if}
		<meta
			property="og:image"
			content="{$page.url.origin}/download/{data.file.id}.{data.file.ext}"
		/>
	{/if}
</svelte:head>

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
				<div class="p-2.5 mx-auto w-full rounded-lg shadow-lg bg-crust">
					{#if data.file.type.includes('video')}
						<!-- svelte-ignore a11y-media-has-caption -->
						<video class="h-[36rem]" src="/download/{data.file.id}.{data.file.ext}" controls
						></video>
					{:else if data.file.type.includes('image')}
						<img
							class="max-h-[32rem]"
							src="/download/{data.file.id}.{data.file.ext}"
							alt={data.file.id}
						/>
					{:else if data.file.type.includes('audio')}
						<AudioPlayer src="/download/{data.file.id}.{data.file.ext}"></AudioPlayer>
					{/if}
				</div>
				<Link style="button" href="/download/{data.file.id}.{data.file.ext}">
					<p class="w-full font-bold text-center">
						Download ({bytesToHumanReadable(data.file.size)})
					</p>
				</Link>
			</div>
		</div>
	</div>
</div>

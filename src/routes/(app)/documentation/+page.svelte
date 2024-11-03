<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Inputs/Button.svelte';
	import Link from '$lib/components/Inputs/Link.svelte';
	import { API_KEY_PERMISSIONS } from '$lib/config';
	import { get } from 'svelte/store';

	let awesome = '';

	async function click() {
		const response = await fetch('/api/v1/keys');
		const body = (await response.json()) as { id: string; permissions: number }[];

		const key = body.find((key) => key.permissions & API_KEY_PERMISSIONS.CREATE_UPLOADS);
		if (!key) return (awesome = 'What the fuck did i tell you');

		awesome = `{
  "Version": "14.0.0",
  "Name": "cirros file uploader",
  "DestinationType": "ImageUploader, FileUploader",
  "RequestMethod": "POST",
  "RequestURL": "${get(page).url.origin}/api/v1/upload",
  "Headers": {
    "Authorization": "Bearer ${key.id}",
  },
  "Body": "MultipartFormData",
  "FileFormName": "file",
  "URL": "${get(page).url.origin}{response}",
}`;
	}
</script>

<h1>Domains</h1>
<div class="grid">
	<a href="https://cdn.cirroskais.xyz" target="_blank">cdn.cirroskais.xyz</a>
	<a href="https://cdn.madhouselabs.net" target="_blank">cdn.madhouselabs.net</a>
	<a href="https://snep.lol" target="_blank">snep.lol</a>
	<a href="https://i.chadthundercock.com" target="_blank">i.chadthundercock.com</a>
	<a href="https://doing-ya.mom" target="_blank">doing-ya.mom</a>
</div>

<h1>ShareX</h1>
<div class="grid">
	<p>I'll make real documentation later but for now have this ShareX button</p>
	<p class="mb-2">
		MAKE SURE TO HAVE A VALID API KEY WITH THE CREATE_UPLOADS PERMISSION ( 1 &lt;&lt; 0 )
	</p>
	<span class="max-w-sm"> <Button {click}>The sharex button in question</Button></span>

	<tt class="block mt-3 whitespace-pre-wrap">{awesome}</tt>

	{#if awesome}
		<Link href="data:text/plain;base64,{btoa(awesome)}" download={'uploader.sxcu'}>Download</Link>
	{/if}
</div>

<style lang="postcss">
	h1 {
		@apply text-2xl;
		@apply font-bold;
		@apply leading-loose;
	}

	a {
		@apply text-blue;
		@apply hover:text-overlay0;
	}
</style>

<script>
	import { bytesToHumanReadable } from '$lib';
	import Button from '$lib/components/Inputs/Button.svelte';
	import ButtonText from '$lib/components/Inputs/ButtonText.svelte';

	/** @type {HTMLInputElement} */
	let input;

	/** @type {FileList} */
	let files;
</script>

<Button
	click={() => {
		input.click();
	}}
>
	<ButtonText>Select Files</ButtonText>
</Button>

{#if files}
	{#each Array.from(files) as file}
		<p>{file.name} ({bytesToHumanReadable(file.size)})</p>
	{/each}
{/if}

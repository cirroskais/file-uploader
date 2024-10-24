<script lang="ts">
	export let href,
		download: string | undefined = undefined,
		style: 'link' | 'button' = 'link';
</script>

{#if style === 'link'}
	<a {href} {download} class="text-blue-500">
		<slot />
	</a>
{:else if style === 'button'}
	<a
		{href}
		{download}
		class="flex p-2 space-x-2 rounded-lg border-b-2 hadow-md bg-crust border-overlay2 hover:border-overlay0 group-disabled/button:border-overlay0 group-disabled/button:hover:border-overlay0"
	>
		<slot />
	</a>
{/if}

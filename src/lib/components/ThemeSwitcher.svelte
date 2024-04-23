<script>
	import { Sun, Moon } from 'lucide-svelte';
	import { darkMode } from '../stores';
	import Button from '$lib/components/Inputs/Button.svelte';

	function toggleTheme() {
		$darkMode = !$darkMode;
	}
</script>

<Button click={toggleTheme}>
	{#if $darkMode}
		<Sun />
	{:else}
		<Moon />
	{/if}
</Button>

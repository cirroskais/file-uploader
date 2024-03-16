<script>
	import { Sun, Moon } from 'lucide-svelte';
	import { darkMode } from '../stores';
	import Button from './Button.svelte';

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

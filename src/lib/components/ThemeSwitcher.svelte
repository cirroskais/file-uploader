<script>
	import { Sun, Moon } from 'lucide-svelte';
	import { darkMode } from '../stores';
	import GenericButton from './GenericButton.svelte';

	function toggleTheme() {
		$darkMode = !$darkMode;
	}
</script>

<GenericButton click={toggleTheme}>
	{#if $darkMode}
		<Sun />
	{:else}
		<Moon />
	{/if}
</GenericButton>

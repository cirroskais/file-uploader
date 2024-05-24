<script>
	import { Sun, Moon } from 'lucide-svelte';

	import { user, darkMode } from '$lib/stores';

	import HeaderLink from '$lib/components/HeaderLink.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import DropdownButton from '$lib/components/DropdownButton.svelte';
	import Logo from '$lib/components/Logo.svelte';
</script>

<div class="flex place-content-between px-4 w-full h-full rounded-xl shadow-md py-auto bg-crust">
	<div class="flex my-auto md:space-x-6">
		<a
			href="/dashboard"
			class="hidden md:block flex-none my-auto w-20 fill-text text-xl transition-all hover:scale-105 focus:scale-105 active:scale-95"
		>
			<Logo></Logo>
		</a>
		<div class="flex my-auto space-x-3">
			<HeaderLink href="/dashboard">Dashboard</HeaderLink>
			<HeaderLink href="/uploads">Uploads</HeaderLink>
			<HeaderLink href="/admin">Admin</HeaderLink>
		</div>
	</div>
	<div class="flex my-auto space-x-2">
		<p class="font-bold">{$user?.username}</p>
		<Dropdown>
			<div>
				<button
					class="flex px-3 py-1.5 space-x-1.5 w-full transition-all hover:bg-overlay0"
					on:click={() => {
						$darkMode = !$darkMode;
					}}
				>
					{#if $darkMode}
						<Sun class="my-auto w-5 h-5" />
					{:else}
						<Moon class="my-auto w-5 h-5" />
					{/if}
					<p>Theme</p>
				</button>
			</div>
			<DropdownButton href="/settings">
				<p class="my-auto">Settings</p>
			</DropdownButton>
			<DropdownButton href="/api/auth/logout">
				<p class="my-auto text-red-500">Logout</p>
			</DropdownButton>
		</Dropdown>
	</div>
</div>

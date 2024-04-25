<script>
	import HeaderLink from '$lib/components/HeaderLink.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import DropdownButton from '$lib/components/DropdownButton.svelte';
</script>

<div
	class="flex place-content-between px-4 w-full h-full rounded-xl transition-colors py-auto bg-neutral-200 dark:bg-neutral-900"
>
	<div class="flex my-auto space-x-4">
		<p class="my-auto text-xl transition-all hover:scale-105 focus:scale-105 active:scale-95">
			File Uploader
		</p>
		<div class="flex my-auto space-x-2">
			<HeaderLink href="/dashboard">Dashboard</HeaderLink>
		</div>
	</div>
	<div class="flex my-auto space-x-2">
		<Dropdown>
			<DropdownButton>
				<p class="my-auto">Uploads</p>
			</DropdownButton>
			<DropdownButton>
				<p class="my-auto">Settings</p>
			</DropdownButton>
			<DropdownButton href="/api/auth/logout">
				<p class="my-auto text-red-500">Logout</p>
			</DropdownButton>
		</Dropdown>
	</div>
</div>

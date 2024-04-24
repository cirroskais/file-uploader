<script>
	import { user } from '$lib/stores';

	import HeaderLink from '$lib/components/HeaderLink.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import DropdownButton from '$lib/components/DropdownButton.svelte';
	import { Cog, LogOut } from 'lucide-svelte';
</script>

<div
	class="w-full h-full py-auto flex px-4 place-content-between rounded-xl
    bg-neutral-200 dark:bg-neutral-900 transition-colors"
>
	<div class="my-auto flex space-x-4">
		<p class="my-auto text-xl hover:scale-105 focus:scale-105 active:scale-95 transition-all">
			File Uploader
		</p>
		<div class="flex space-x-2 my-auto">
			<HeaderLink href="/dashboard">Dashboard</HeaderLink>
		</div>
	</div>
	<div class="my-auto flex space-x-2">
		<Dropdown>
			<DropdownButton>
				<p class="my-auto">Uploads</p>
			</DropdownButton>
			<DropdownButton>
				<p class="my-auto">Settings</p>
			</DropdownButton>
			<DropdownButton>
				<p class="my-auto text-red-500">Logout</p>
			</DropdownButton>
		</Dropdown>
	</div>
</div>

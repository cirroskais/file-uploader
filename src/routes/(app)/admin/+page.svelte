<script lang="ts">
	import Link from '$lib/components/Inputs/Link.svelte';
	import { fade } from 'svelte/transition';

	export let data;
</script>

<div class="grid grid-cols-4 grid-flow-row gap-2">
	{#await data.users then users}
		{#each users.sort((a, b) => b._count.uploads - a._count.uploads) as user, i}
			<div class="p-2 rounded-lg shadow-lg bg-crust" in:fade|global={{ delay: i * 100 }}>
				<p class="text-lg font-bold">
					{user.username} <span class="text-sm text-subtext0">({user.email})</span>
				</p>
				<div class="grid grid-cols-3">
					<p class="whitespace-nowrap text-subtext0">{user._count.uploads} Uploads</p>
					<p class="whitespace-nowrap text-subtext0">{user._count.sessions} Sessions</p>
					<p class="whitespace-nowrap text-subtext0">{user._count.apiKeys} API Keys</p>
				</div>
				<Link style="link" href="/admin/user/{user.id}">Moderation Page</Link>
			</div>
		{/each}
	{/await}
</div>

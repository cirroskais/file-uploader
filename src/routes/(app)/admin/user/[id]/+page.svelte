<script lang="ts">
	import Button from '$lib/components/Inputs/Button.svelte';
	import Upload from '$lib/components/Upload.svelte';

	export let data;
</script>

<div class="grid gap-2">
	<div class="flex p-2.5 rounded-lg shadow-lg bg-crust">
		<div class="flex flex-col">
			<p class="text-2xl font-bold">
				{data.selectedUser.username}
				<span class="text-sm text-subtext0">({data.selectedUser.email})</span>
			</p>
			<p class="text-subtext0">
				Registered: {data.selectedUser.createdAt.toLocaleString()}
			</p>
			<p class="text-subtext0">Last seen: {data.selectedUser.lastSeen.toLocaleString()}</p>
		</div>
		<div class="mt-auto ml-auto">
			<Button
				color="bg-mantle"
				click={() => {
					console.log('yeas');
				}}
			>
				Destroy Sessions
			</Button>
			<Button
				color="bg-mantle"
				click={() => {
					console.log('yeas');
				}}
			>
				Delete User
			</Button>
		</div>
	</div>
	<div class="grid grid-cols-5 gap-2">
		{#each data.selectedUser.uploads.sort((a, b) => b.uploaded.getTime() - a.uploaded.getTime()) as upload, i}
			<Upload {upload} {i}></Upload>
		{/each}
	</div>
</div>

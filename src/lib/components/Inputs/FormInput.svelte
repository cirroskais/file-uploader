<script lang="ts">
	import { CircleAlert, Check } from 'lucide-svelte';

	export let type, name, id, placeholder, value: string, required;
</script>

<!-- 
    insane that i have to do this because
    'type' attr cannot be dynamic if input 
    uses two-way binding 
-->

{#if type === 'username'}
	<div class="flex p-2 space-x-2 rounded-lg shadow-md bg-crust">
		<div class="py-0.5 pr-2 border-r-2 border-overlay0">
			<slot />
		</div>
		<input
			class="py-0.5 w-64 bg-crust placeholder:text-overlay1"
			type="username"
			{name}
			{id}
			{placeholder}
			{required}
			bind:value
		/>
	</div>
{:else if type === 'email'}
	<div class="flex p-2 space-x-2 rounded-lg shadow-md bg-crust">
		<div class="py-0.5 pr-2 border-r-2 border-overlay0">
			<slot />
		</div>
		<input
			class="py-0.5 w-64 bg-crust placeholder:text-overlay1"
			type="email"
			{name}
			{id}
			{placeholder}
			{required}
			bind:value
		/>
	</div>
{:else if type === 'password'}
	<div class="flex p-2 space-x-2 rounded-lg shadow-md bg-crust">
		<div class="py-0.5 pr-2 border-r-2 border-overlay0">
			<slot />
		</div>
		<input
			class="py-0.5 w-64 bg-crust placeholder:text-overlay1"
			type="password"
			{name}
			{id}
			{placeholder}
			{required}
			bind:value
		/>
	</div>
{/if}

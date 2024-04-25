<script>
	import { CircleAlert, Check } from 'lucide-svelte';

	export let type, name, id, placeholder, value, required;
</script>

<!-- insane that i have to do this because -->
<!-- 'type' attribute cannot be dynamic if input uses two-way binding -->
{#if type === 'username'}
	<div class="flex p-2 space-x-1 rounded-lg shadow-md transition-colors bg-crust">
		<div class="py-0.5 pr-1 border-r-2 transition-colors border-overlay2">
			<slot />
		</div>
		<input
			class="py-0.5 transition-colors bg-crust peer placeholder:text-overlay1"
			type="username"
			{name}
			{id}
			{placeholder}
			{required}
			bind:value
		/>
		<div class="hidden my-auto peer-invalid:flex">
			<CircleAlert />
		</div>
		<div class="my-auto peer-invalid:hidden">
			<Check />
		</div>
	</div>
{:else if type === 'email'}
	<div class="flex p-2 space-x-1 rounded-lg shadow-md transition-colors bg-crust">
		<div class="py-0.5 pr-1 border-r-2 transition-colors border-overlay2">
			<slot />
		</div>
		<input
			class="py-0.5 transition-colors bg-crust peer placeholder:text-overlay1"
			type="email"
			{name}
			{id}
			{placeholder}
			{required}
			bind:value
		/>
		<div class="hidden my-auto peer-invalid:flex">
			<CircleAlert />
		</div>
		<div class="my-auto peer-invalid:hidden">
			<Check />
		</div>
	</div>
{:else if type === 'password'}
	<div class="flex p-2 space-x-1 rounded-lg shadow-md transition-colors bg-crust">
		<div class="py-0.5 pr-1 border-r-2 transition-colors border-overlay2">
			<slot />
		</div>
		<input
			class="py-0.5 transition-colors bg-crust peer placeholder:text-overlay1"
			type="password"
			{name}
			{id}
			{placeholder}
			{required}
			bind:value
		/>
		<div class="hidden my-auto peer-invalid:flex">
			<CircleAlert />
		</div>
		<div class="my-auto peer-invalid:hidden">
			<Check />
		</div>
	</div>
{/if}

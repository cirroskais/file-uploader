<script>
	import { CircleAlert, Check } from 'lucide-svelte';

	export let type, name, id, placeholder, bind, required;
</script>

<!-- insane that i have to do this because -->
<!-- 'type' attribute cannot be dynamic if input uses two-way binding -->
{#if type === 'username'}
	<div class="flex p-2 space-x-1 rounded-lg transition-colors bg-neutral-200 dark:bg-neutral-900">
		<div
			class="py-0.5 pr-1 border-r-2 transition-colors border-neutral-400 dark:border-neutral-700"
		>
			<slot />
		</div>
		<input
			class="py-0.5 transition-colors bg-neutral-200 dark:bg-neutral-900 peer"
			type="username"
			{name}
			{id}
			{placeholder}
			{required}
			bind:value={bind}
		/>
		<div class="peer-invalid:flex hidden my-auto">
			<CircleAlert />
		</div>
		<div class="peer-invalid:hidden my-auto">
			<Check />
		</div>
	</div>
{:else if type === 'email'}
	<div class="flex p-2 space-x-1 rounded-lg transition-colors bg-neutral-200 dark:bg-neutral-900">
		<div
			class="py-0.5 pr-1 border-r-2 transition-colors border-neutral-400 dark:border-neutral-700"
		>
			<slot />
		</div>
		<input
			class="py-0.5 transition-colors bg-neutral-200 dark:bg-neutral-900 peer"
			type="email"
			{name}
			{id}
			{placeholder}
			{required}
			bind:value={bind}
		/>
		<div class="peer-invalid:flex hidden my-auto">
			<CircleAlert />
		</div>
		<div class="peer-invalid:hidden my-auto">
			<Check />
		</div>
	</div>
{:else if type === 'password'}
	<div class="flex p-2 space-x-1 rounded-lg transition-colors bg-neutral-200 dark:bg-neutral-900">
		<div
			class="py-0.5 pr-1 border-r-2 transition-colors border-neutral-400 dark:border-neutral-700"
		>
			<slot />
		</div>
		<input
			class="py-0.5 transition-colors bg-neutral-200 dark:bg-neutral-900 peer"
			type="password"
			{name}
			{id}
			{placeholder}
			{required}
			bind:value={bind}
		/>
		<div class="peer-invalid:flex hidden my-auto">
			<CircleAlert />
		</div>
		<div class="peer-invalid:hidden my-auto">
			<Check />
		</div>
	</div>
{/if}

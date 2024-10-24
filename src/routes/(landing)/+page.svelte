<script>
	import { LogIn, UserPlus } from 'lucide-svelte';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import Button from '$lib/components/Inputs/Button.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import LoginForm from '$lib/components/Forms/LoginForm.svelte';
	import RegisterForm from '$lib/components/Forms/RegisterForm.svelte';

	export let data;

	let state = writable('/landing');

	if ($page.url.hash.replace('#', '') !== '') {
		state.set($page.url.hash.replace('#', ''));
	}

	state.subscribe((value) => {
		if (browser) {
			goto('#' + value);
		}
	});
</script>

<div class="h-[85vh] md:h-screen">
	{#if $state === '/landing'}
		<div class="flex justify-center items-center h-full">
			<div class="flex flex-col space-y-1.5">
				<div class="text-text fill-text">
					<Logo />
					{#await data.streamed.statistics}
						<p>Currently hosting <strong>...</strong> files.</p>
					{:then stats}
						<p>Currently hosting <strong>{stats.files}</strong> files.</p>
					{/await}

					<p class="italic">The best file uploader <strong>ever!!!</strong></p>
				</div>

				<div class="flex place-content-around mx-auto space-x-2">
					<ThemeSwitcher />

					<Button click={() => ($state = '/login')}>
						<LogIn />
						<p>Login</p>
					</Button>

					<Button click={() => ($state = '/register')}>
						<UserPlus />
						<p>Register</p>
					</Button>
				</div>
			</div>
		</div>
	{:else if $state === '/login'}
		<LoginForm callback={() => ($state = '/landing')} />
	{:else if $state === '/register'}
		<RegisterForm callback={() => ($state = '/landing')} />
	{/if}
</div>

<script>
	import { blur } from 'svelte/transition';
	import { LogIn, UserPlus } from 'lucide-svelte';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import Button from '$lib/components/Button.svelte';
	import Logo from '$lib/components/Logo.svelte';

	import LoginForm from '$lib/components/LoginForm.svelte';
	import RegisterForm from '$lib/components/RegisterForm.svelte';

	let state = writable('/landing');

	if ($page.url.hash.replace('#', '') !== '') {
		state.set($page.url.hash.replace('#', ''));
	}

	state.subscribe((value) => {
		if (!browser) return;
		window.history.replaceState(null, '', '#' + value);
	});
</script>

{#if $state === '/landing'}
	<div in:blur={{ amount: 1 }} class="flex justify-center items-center h-screen">
		<div class="flex flex-col space-y-1.5">
			<div>
				<div class="transition-colors fill-black dark:fill-white">
					<Logo />
				</div>
				<p>Currently hosting <strong>0</strong> files.</p>
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

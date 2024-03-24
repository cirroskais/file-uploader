<script>
	import { blur } from 'svelte/transition';
	import { LogIn, UserPlus } from 'lucide-svelte';

	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import Button from '$lib/components/Button.svelte';
	import Logo from '$lib/components/Logo.svelte';

	import LoginForm from '$lib/components/LoginForm.svelte';
	import RegisterForm from '$lib/components/RegisterForm.svelte';

	let state = 0;
</script>

{#if state === 0}
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

				<Button click={() => (state = 1)}>
					<LogIn />
					<p>Login</p>
				</Button>

				<Button click={() => (state = 2)}>
					<UserPlus />
					<p>Register</p>
				</Button>
			</div>
		</div>
	</div>
{:else if state === 1}
	<LoginForm callback={() => (state = 0)} />
{:else if state === 2}
	<RegisterForm callback={() => (state = 0)} />
{/if}

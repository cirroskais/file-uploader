<script>
	import { LogIn } from 'lucide-svelte';

	import { signIn } from '@auth/sveltekit/client';

	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import Button from '$lib/components/Button.svelte';
	import Logo from '$lib/components/Logo.svelte';
</script>

<div class="flex justify-center items-center h-screen">
	<div class="flex flex-col space-y-1.5">
		<div>
			<div class="transition-colors fill-black dark:fill-white">
				<Logo />
			</div>
			<p class="text-center">Currently hosting <strong>0</strong> files.</p>
			<p class="text-center">Elon musk <strong>found dead</strong> in a <strong>pool</strong></p>
		</div>

		<div class="flex place-content-around mx-auto space-x-2">
			<ThemeSwitcher />

			<Button click={() => signIn('keycloak')}>
				<LogIn />
				<p>Keycloak Login</p>
			</Button>
		</div>
	</div>
</div>

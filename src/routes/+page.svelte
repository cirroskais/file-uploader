<script>
	import { toast } from 'svelte-sonner';
	import { LogIn, UserPlus } from 'lucide-svelte';

	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import Link from '$lib/components/Link.svelte';
	import Button from '$lib/components/Button.svelte';
	import Logo from '$lib/components/Logo.svelte';

	function fuckYou() {
		toast.error('Not Implemented');
	}
</script>

<div class="flex justify-center items-center h-screen">
	<div class="flex flex-col space-y-1.5">
		<div>
			<div class="transition-colors fill-black dark:fill-white">
				<Logo />
			</div>
			<p>Currently hosting <strong>0</strong> files.</p>
			<p>Elon musk <strong>found dead</strong> in a <strong>pool</strong></p>
		</div>

		<div class="flex space-x-2">
			<ThemeSwitcher />

			<Link style="button" href="/login">
				<LogIn />
				<p>Login</p>
			</Link>

			<Link style="button" href="/register">
				<UserPlus />
				<p>Register</p>
			</Link>
		</div>

		<div class="flex flex-col">
			<Button click={fuckYou}>
				<p class="w-full text-center">Keycloak Login</p>
			</Button>
		</div>
	</div>
</div>

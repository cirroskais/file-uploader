<script>
	import { toast } from 'svelte-sonner';
	import { LogIn, UserPlus } from 'lucide-svelte';

	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import GenericButton from '$lib/components/GenericButton.svelte';
	import Logo from '$lib/components/Logo.svelte';

	function testToast() {
		toast.error('Not Implemented');
	}
</script>

<div class="flex justify-center items-center h-screen">
	<div class="flex flex-col space-y-1.5">
		<div>
			<div class="max-w-sm transition-colors fill-black dark:fill-white">
				<Logo />
			</div>
			<p>Currently hosting <strong>0</strong> files.</p>
			<p>Elon musk <strong>found dead</strong> in a <strong>pool</strong></p>
		</div>

		<div class="flex space-x-2">
			<ThemeSwitcher />

			<GenericButton click={testToast}>
				<LogIn />
				<p>Login</p>
			</GenericButton>

			<GenericButton click={testToast}>
				<UserPlus />
				<p>Register</p>
			</GenericButton>
		</div>
	</div>
</div>

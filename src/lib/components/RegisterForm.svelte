<script>
	import { blur } from 'svelte/transition';
	import { Mail, SquareAsterisk, Undo, User, UserPlus } from 'lucide-svelte';

	import Logo from '$lib/components/Logo.svelte';
	import FormInput from '$lib/components/FormInput.svelte';
	import Button from '$lib/components/Button.svelte';

	export let callback;
</script>

<div in:blur={{ amount: 1 }} class="flex justify-center items-center h-screen">
	<div class="flex flex-col space-y-2">
		<div class="transition-colors fill-black dark:fill-white">
			<Logo />
		</div>
		<form action="">
			<div class="flex flex-col space-y-2">
				<FormInput type={'username'} name={'username'} id={'username'} placeholder={'Username'}>
					<User />
				</FormInput>
				<FormInput type={'email'} name={'email'} id={'email'} placeholder={'user@example.com'}>
					<Mail />
				</FormInput>
				<FormInput type={'password'} name={'password'} id={'password'} placeholder={'•'.repeat(16)}>
					<SquareAsterisk />
				</FormInput>
				<FormInput
					type={'password'}
					name={'cpassword'}
					id={'cpassword'}
					placeholder={'•'.repeat(16)}
				>
					<SquareAsterisk />
				</FormInput>
				<div class="flex place-content-between">
					<Button click={callback}>
						<Undo />
						<p>Go Back</p>
					</Button>
					<Button>
						<UserPlus />
						<p>Register</p>
					</Button>
				</div>
				<p class="text-xs text-neutral-500/50 dark:text-white/30">
					By registering an account you agree to the <br />
					<a class="underline" href="/terms" data-sveltekit-reload>Terms of Service</a> and
					<a class="underline" href="/privacy" data-sveltekit-reload>Privacy Policy</a>.
				</p>
			</div>
		</form>
	</div>
</div>

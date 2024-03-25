<script>
	import { blur } from 'svelte/transition';
	import { Mail, SquareAsterisk, Undo, User, UserPlus, Dot } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	import Logo from '$lib/components/Logo.svelte';
	import FormInput from '$lib/components/FormInput.svelte';
	import Button from '$lib/components/Button.svelte';
	import ButtonText from '$lib/components/ButtonText.svelte';
	import ButtonIcon from '$lib/components/ButtonIcon.svelte';

	export let callback;

	let disabled = false;
	let username, email, password, cpassword;

	async function register() {
		disabled = true;

		setTimeout(() => {
			toast('Failed to register.');
			disabled = false;
		}, 5_000);
	}
</script>

<div in:blur={{ amount: 1 }} class="flex justify-center items-center h-screen">
	<div class="flex flex-col space-y-2">
		<div class="transition-colors fill-black dark:fill-white">
			<Logo />
		</div>
		<form on:submit|preventDefault>
			<div class="flex flex-col space-y-2">
				<FormInput
					type={'username'}
					name={'username'}
					id={'username'}
					placeholder={'Username'}
					bind={username}
					required={true}
				>
					<User />
				</FormInput>
				<FormInput
					type={'email'}
					name={'email'}
					id={'email'}
					placeholder={'user@example.com'}
					bind={email}
					required={true}
				>
					<Mail />
				</FormInput>
				<FormInput
					type={'password'}
					name={'password'}
					id={'password'}
					placeholder={'•'.repeat(16)}
					bind={password}
					required={true}
				>
					<SquareAsterisk />
				</FormInput>
				<FormInput
					type={'password'}
					name={'cpassword'}
					id={'cpassword'}
					placeholder={'•'.repeat(16)}
					bind={cpassword}
					required={true}
				>
					<SquareAsterisk />
				</FormInput>
				<div class="flex place-content-between">
					<Button click={callback} {disabled}>
						<ButtonIcon><Undo /></ButtonIcon>
						<ButtonText>Go Back</ButtonText>
					</Button>
					<Button click={register} {disabled} pulse={disabled}>
						<ButtonIcon><UserPlus /></ButtonIcon>
						<ButtonText>Register</ButtonText>
					</Button>
				</div>
				<p class="text-xs text-center text-neutral-500/50 dark:text-white/30">
					By registering an account you agree to the <br />
					<a class="underline" href="/terms" data-sveltekit-reload>Terms of Service</a> and
					<a class="underline" href="/privacy" data-sveltekit-reload>Privacy Policy</a>.
				</p>
			</div>
		</form>
	</div>
</div>

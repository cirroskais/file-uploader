<script>
	import { blur } from 'svelte/transition';
	import { Mail, SquareAsterisk, LogIn, Undo } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	import Logo from '$lib/components/Logo.svelte';
	import FormInput from '$lib/components/FormInput.svelte';
	import Button from '$lib/components/Button.svelte';
	import ButtonText from '$lib/components/ButtonText.svelte';
	import ButtonIcon from '$lib/components/ButtonIcon.svelte';

	export let callback;

	let disabled = false;
	let email, password;

	async function login() {
		disabled = true;

		setTimeout(() => {
			toast('Failed to login.');
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
				<div class="flex place-content-between">
					<Button click={callback} {disabled}>
						<ButtonIcon><Undo /></ButtonIcon>
						<ButtonText><p>Go Back</p></ButtonText>
					</Button>
					<Button click={login} {disabled} pulse={disabled}>
						<ButtonIcon><LogIn /></ButtonIcon>
						<ButtonText><p>Login</p></ButtonText>
					</Button>
				</div>
			</div>
		</form>
	</div>
</div>

<script>
	import { Mail, SquareAsterisk, Undo, User, UserPlus } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	import Logo from '$lib/components/Logo.svelte';
	import FormInput from '$lib/components/Inputs/FormInput.svelte';
	import Button from '$lib/components/Inputs/Button.svelte';
	import ButtonText from '$lib/components/Inputs/ButtonText.svelte';
	import ButtonIcon from '$lib/components/Inputs/ButtonIcon.svelte';

	export let callback = () => {};

	let disabled = false;
	let username = '',
		email = '',
		password = '',
		cpassword = '';

	async function register() {
		disabled = true;

		const id = toast.loading('Registering...');

		if (!username) {
			toast.error('Missing username.', { id });
			return (disabled = false);
		}

		if (!email) {
			toast.error('Missing email.', { id });
			return (disabled = false);
		}

		if (!password || !cpassword) {
			toast.error('Missing password.', { id });
			return (disabled = false);
		}

		if (password !== cpassword) {
			toast.error('Your passwords do not match.', { id });
			return (disabled = false);
		}

		const response = await fetch('/api/v1/auth/register', {
			method: 'POST',
			body: JSON.stringify({ username, email, password })
		}).catch((_) => toast.error(_.message));
		// @ts-ignore
		const body = await response.json().catch((_) => toast.error(_.message));

		if (!body?.success) {
			toast.error(body?.error || 'Unexpected Error', { id });
			return (disabled = false);
		}

		toast.success('Welcome, ' + body.data.username, { id });
		goto('/dashboard');
	}
</script>

<div class="flex justify-center items-center h-full">
	<div class="flex flex-col space-y-2">
		<div class="fill-text">
			<Logo />
		</div>
		<form on:submit|preventDefault>
			<div class="flex flex-col space-y-2">
				<FormInput
					type={'username'}
					name={'username'}
					id={'username'}
					placeholder={'Username'}
					bind:value={username}
					required={true}
				>
					<User />
				</FormInput>
				<FormInput
					type={'email'}
					name={'email'}
					id={'email'}
					placeholder={'jane@doefamily.com'}
					bind:value={email}
					required={true}
				>
					<Mail />
				</FormInput>
				<FormInput
					type={'password'}
					name={'password'}
					id={'password'}
					placeholder={'•'.repeat(16)}
					bind:value={password}
					required={true}
				>
					<SquareAsterisk />
				</FormInput>
				<FormInput
					type={'password'}
					name={'cpassword'}
					id={'cpassword'}
					placeholder={'•'.repeat(16)}
					bind:value={cpassword}
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
				<p class="text-xs text-center text-overlay1">
					By registering an account you agree to the <br />
					<a class="underline" href="/terms" data-sveltekit-reload>Terms of Service</a> and
					<a class="underline" href="/privacy" data-sveltekit-reload>Privacy Policy</a>.
				</p>
			</div>
		</form>
	</div>
</div>

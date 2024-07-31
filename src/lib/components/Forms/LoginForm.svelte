<script>
	import { fade } from 'svelte/transition';
	import { Mail, SquareAsterisk, LogIn, Undo } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	import Logo from '$lib/components/Logo.svelte';
	import FormInput from '$lib/components/Inputs/FormInput.svelte';
	import Button from '$lib/components/Inputs/Button.svelte';
	import ButtonText from '$lib/components/Inputs/ButtonText.svelte';
	import ButtonIcon from '$lib/components/Inputs/ButtonIcon.svelte';

	export let callback = () => {};

	let disabled = false;
	let email = '',
		password = '';

	async function login() {
		disabled = true;

		const id = toast.loading('Logging in...');

		if (!email) {
			toast.error('Missing email.', { id });
			return (disabled = false);
		}

		if (!password) {
			toast.error('Missing password.', { id });
			return (disabled = false);
		}

		const response = await fetch('/api/v1/auth/login', {
			method: 'POST',
			body: JSON.stringify({ email, password })
		}).catch((_) => toast.error(_.message));
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
					type={'email'}
					name={'email'}
					id={'email'}
					placeholder={'user@example.com'}
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

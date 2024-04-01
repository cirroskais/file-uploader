<script>
	import { blur } from 'svelte/transition';
	import { Mail, SquareAsterisk, Undo, User, UserPlus } from 'lucide-svelte';
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

		const response = await fetch('/api/auth/register', {
			method: 'POST',
			body: JSON.stringify({ username, email, password })
		}).catch((_) => toast.error(_.message));
		const body = await response.json().catch((_) => toast.error(_.message));

		if (response.status >= 400 && response.status < 500) {
			toast.error(body?.error || 'Client Error', { id });
			return (disabled = false);
		}

		if (response.status >= 500) {
			toast.error(body?.error || 'Server Error', { id });
			return (disabled = false);
		}
	}
</script>

<div in:blur={{ amount: 1 }} class="flex justify-center items-center h-full">
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
					bind:value={username}
					required={true}
				>
					<User />
				</FormInput>
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
				<p class="text-xs text-center text-neutral-500/50 dark:text-white/30">
					By registering an account you agree to the <br />
					<a class="underline" href="/terms" data-sveltekit-reload>Terms of Service</a> and
					<a class="underline" href="/privacy" data-sveltekit-reload>Privacy Policy</a>.
				</p>
			</div>
		</form>
	</div>
</div>

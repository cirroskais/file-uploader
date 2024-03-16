<script>
	import { Mail, SquareAsterisk, LogIn, Undo } from 'lucide-svelte';
	import { goBack } from '$lib/';

	import Logo from '$lib/components/Logo.svelte';
	import FormInput from '$lib/components/FormInput.svelte';
	import Button from '$lib/components/Button.svelte';
</script>

<div class="flex justify-center items-center h-screen">
	<div class="flex flex-col space-y-2">
		<div class="max-w-sm transition-colors fill-black dark:fill-white">
			<Logo />
		</div>
		<form action="">
			<div class="flex flex-col space-y-2">
				<FormInput type={'email'} name={'email'} id={'email'} placeholder={'user@example.com'}>
					<Mail />
				</FormInput>
				<FormInput type={'password'} name={'password'} id={'password'} placeholder={'•'.repeat(16)}>
					<SquareAsterisk />
				</FormInput>
				<div class="flex place-content-between">
					<Button click={goBack}>
						<Undo />
						<p>Go Back</p>
					</Button>
					<Button>
						<LogIn />
						<p>Login</p>
					</Button>
				</div>
			</div>
		</form>
	</div>
</div>

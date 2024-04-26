<script>
	import { user } from '$lib/stores';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import Button from '../../../lib/components/Inputs/Button.svelte';
	import ButtonText from '../../../lib/components/Inputs/ButtonText.svelte';

	export let data;

	user.set(data?.user);
</script>

<p>
	<tt class="block whitespace-pre-wrap">
		{JSON.stringify($user)}
	</tt>
</p>

<Button disabled={true}>
	<ButtonText>help</ButtonText>
</Button>

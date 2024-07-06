<script>
	import '../app.css';

	import { Toaster } from 'svelte-sonner';
	import { CircleAlert, TriangleAlert, Info, Check, Loader } from 'lucide-svelte';
	import { user } from '$lib/stores';
	import ThemeHandler from '$lib/components/ThemeHandler.svelte';
	import PageMeta from '$lib/components/PageMeta.svelte';

	export let data;

	user.set(data?.user);
</script>

<PageMeta title="cirro's file uploader" />
<ThemeHandler />
<Toaster
	position={'bottom-center'}
	toastOptions={{
		classes: {
			toast: '!bg-crust !fill-text !border-crust',
			title: '!text-text',
			description: '!text-subtext0',
			actionButton: 'bg-zinc-400',
			cancelButton: 'bg-orange-400',
			closeButton: 'bg-lime-400'
		}
	}}
>
	<Loader size="20" class="animate-spin text-text" slot="loading-icon" />
	<Check size="20" class="text-text" slot="success-icon" />
	<CircleAlert size="20" class="text-text" slot="error-icon" />
	<Info size="20" class="text-text" slot="info-icon" />
	<TriangleAlert size="20" class="text-text" slot="warning-icon" />
</Toaster>

<slot />

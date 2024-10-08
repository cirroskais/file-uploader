/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'selector',
	theme: {
		extend: {},
		container: { center: true }
	},
	plugins: [
		require('@catppuccin/tailwindcss')({
			defaultFlavour: 'latte'
		})
	]
};

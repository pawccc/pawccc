<script lang="ts">
	import locale from '$lib/locales';
	import Form from '../Form.svelte';
	import { Input, ButtonGroup, InputAddon } from 'flowbite-svelte';
</script>

<svelte:head>
	<title>{$locale.forgotPassword.title}</title>
</svelte:head>

<Form>
	<h1 class="text-xl font-bold">{$locale.forgotPassword.title}</h1>
	<p class="mt-2 text-sm">
		{$locale.forgotPassword.description}
	</p>

	<ButtonGroup class="mt-4 w-full">
		<InputAddon>
			<span class="fa fa-fw fa-lg fa-user"></span>
		</InputAddon>
		<Input name="username" placeholder={$locale.forgotPassword.username} required />
	</ButtonGroup>

	{#snippet button()}
		{$locale.forgotPassword.action}
	{/snippet}
</Form>

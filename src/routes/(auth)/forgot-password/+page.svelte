<script lang="ts">
	import { ButtonGroup, Input, InputAddon } from 'flowbite-svelte';

	import locale from '$lib/locales';

	import Form from '../Form.svelte';
</script>

<svelte:head>
	<title>{$locale.forgotPassword.title} • pawc.cc</title>
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
		{$locale.changePassword.action}
	{/snippet}
</Form>

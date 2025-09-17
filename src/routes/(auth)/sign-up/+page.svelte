<script lang="ts">
	import { ButtonGroup, Checkbox, Input, InputAddon } from 'flowbite-svelte';

	import { resolve } from '$app/paths';

	import locale from '$lib/locales';

	import Form from '../Form.svelte';
</script>

<svelte:head>
	<title>{$locale.signUp.title} • pawc.cc</title>
</svelte:head>

<Form>
	<ButtonGroup class="w-full">
		<InputAddon>
			<span class="fa fa-fw fa-lg fa-user"></span>
		</InputAddon>
		<Input name="username" placeholder={$locale.signUp.username} required />
	</ButtonGroup>

	<ButtonGroup class="mt-4 mb-4 w-full">
		<InputAddon>
			<span class="fa fa-fw fa-lg fa-envelope"></span>
		</InputAddon>
		<Input type="email" name="email" placeholder={$locale.signUp.email} required />
	</ButtonGroup>

	<Checkbox required>{$locale.signUp.terms}</Checkbox>

	{#snippet button()}
		{$locale.signUp.action}
	{/snippet}
</Form>

<p class="mt-4 text-sm">
	{$locale.signUp.questionUsername}
	<a href={resolve('/sign-in')} class="text-primary-600">{$locale.signIn.action}</a>
</p>

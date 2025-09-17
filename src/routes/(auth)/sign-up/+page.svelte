<script lang="ts">
	import locale from '$lib/locales';
	import Form from '../Form.svelte';
	import { Checkbox, Input, ButtonGroup, InputAddon } from 'flowbite-svelte';
</script>

<svelte:head>
	<title>{$locale.signUp.title}</title>
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

	<Checkbox>{$locale.signUp.terms}</Checkbox>

	{#snippet button()}
		{$locale.signUp.action}
	{/snippet}
</Form>

<p class="mt-4 text-sm">
	{$locale.signUp.questionUsername}
	<a href="/sign-in" class="text-primary-600">{$locale.signIn.action}</a>
</p>

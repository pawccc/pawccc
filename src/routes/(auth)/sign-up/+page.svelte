<script lang="ts">
	import locale from '$lib/locales';
	import Form from '../Form.svelte';
	import { Checkbox, Input, ButtonGroup, InputAddon } from 'flowbite-svelte';
	import { EnvelopeOutline, UserOutline } from 'flowbite-svelte-icons';
</script>

<svelte:head>
	<title>{$locale.signUp.title}</title>
</svelte:head>

<Form>
	<ButtonGroup class="w-full">
		<InputAddon>
			<UserOutline class="h-6 w-6" />
		</InputAddon>
		<Input name="username" placeholder={$locale.signUp.username} required />
	</ButtonGroup>

	<ButtonGroup class="w-full mt-4 mb-4">
		<InputAddon>
			<EnvelopeOutline class="h-6 w-6" />
		</InputAddon>
		<Input type="email" name="email" placeholder={$locale.signUp.email} required />
	</ButtonGroup>

	<Checkbox>{$locale.signUp.terms}</Checkbox>

	{#snippet button()}
		{$locale.signUp.action}
	{/snippet}
</Form>

<p class="text-sm mt-4">
	{$locale.signUp.questionUsername}
	<a href="/sign-in" class="text-primary-600">{$locale.signIn.action}</a>
</p>

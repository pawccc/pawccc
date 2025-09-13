<script lang="ts">
	import Form from '$lib/components/Form.svelte';
	import locale from '$lib/locales';
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
		<Input name="username" required placeholder={$locale.signUp.username} />
	</ButtonGroup>

	<ButtonGroup class="w-full mt-4 mb-4">
		<InputAddon>
			<EnvelopeOutline class="h-6 w-6" />
		</InputAddon>
		<Input name="email" type="email" required placeholder={$locale.signUp.email} />
	</ButtonGroup>

	<Checkbox>{$locale.signUp.terms}</Checkbox>

	{#snippet button()}
		{$locale.signUp.action}
	{/snippet}
</Form>

<p class="text-sm mt-4">
	{$locale.signUp.questionUsername}
	<a class="text-primary-600" href="/sign-in">{$locale.signIn.action}</a>
</p>

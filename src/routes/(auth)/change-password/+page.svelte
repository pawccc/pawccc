<script lang="ts">
	import { ButtonGroup, Input, InputAddon } from 'flowbite-svelte';

	import locale from '$lib/locales';

	import Form from '../Form.svelte';
</script>

<svelte:head>
	<title>{$locale.changePassword.title} • pawc.cc</title>
</svelte:head>

<Form>
	<h1 class="text-xl font-bold">{$locale.changePassword.title}</h1>

	<ButtonGroup class="mt-4 w-full">
		<InputAddon>
			<span class="fa fa-fw fa-lg fa-lock"></span>
		</InputAddon>
		<Input
			type="password"
			name="password"
			autocomplete="new-password"
			placeholder={$locale.changePassword.password}
			required
		/>
	</ButtonGroup>
	<ButtonGroup class="mt-4 w-full">
		<InputAddon>
			<span class="fa fa-fw fa-lg fa-lock"></span>
		</InputAddon>
		<Input
			type="password"
			autocomplete="new-password"
			placeholder={$locale.changePassword.passwordRepeat}
			required
		/>
	</ButtonGroup>

	{#snippet button()}
		{$locale.changePassword.action}
	{/snippet}
</Form>

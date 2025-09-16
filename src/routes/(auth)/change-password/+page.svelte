<script lang="ts">
	import locale from '$lib/locales';
	import Form from '../Form.svelte';
	import { Input, ButtonGroup, InputAddon } from 'flowbite-svelte';
	import { LockOutline } from 'flowbite-svelte-icons';
</script>

<svelte:head>
	<title>{$locale.changePassword.title}</title>
</svelte:head>

<Form>
	<ButtonGroup class="w-full">
		<InputAddon>
			<LockOutline class="h-6 w-6" />
		</InputAddon>
		<Input
			type="password"
			name="password"
			autocomplete="new-password"
			placeholder={$locale.changePassword.password}
			required
		/>
	</ButtonGroup>
	<ButtonGroup class="w-full mt-4">
		<InputAddon>
			<LockOutline class="h-6 w-6" />
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

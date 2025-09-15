<script lang="ts">
	import locale from '$lib/locales';
	import Form from '../Form.svelte';
	import { Input, ButtonGroup, InputAddon } from 'flowbite-svelte';
	import { UserOutline } from 'flowbite-svelte-icons';
</script>

<svelte:head>
	<title>{$locale.forgotPassword.title}</title>
</svelte:head>

<Form>
	<ButtonGroup class="w-full">
		<InputAddon>
			<UserOutline class="h-6 w-6" />
		</InputAddon>
		<Input name="username" required placeholder={$locale.forgotPassword.username} />
	</ButtonGroup>

	{#snippet button()}
		{$locale.forgotPassword.action}
	{/snippet}
</Form>

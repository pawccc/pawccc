<script lang="ts">
	import { ButtonGroup, Input, InputAddon } from 'flowbite-svelte';

	import { resolve } from '$app/paths';

	import locale from '$lib/locales';

	import Form from '../Form.svelte';

	let showPassword = $state(false);
</script>

<svelte:head>
	<title>{$locale.signIn.title} • pawc.cc</title>
</svelte:head>

<Form>
	<input type="hidden" name="providerId" value="credentials" />

	<ButtonGroup class="w-full">
		<InputAddon>
			<span class="fa fa-fw fa-lg fa-user"></span>
		</InputAddon>
		<Input name="username" placeholder={$locale.signIn.username} required />
	</ButtonGroup>

	<ButtonGroup class="mt-4 w-full">
		<InputAddon>
			<button type="button" tabindex="-1" onclick={() => (showPassword = !showPassword)}>
				<span class={{ 'fa fa-fw fa-lg fa-eye': true, 'fa-eye-slash': showPassword }}></span>
			</button>
		</InputAddon>
		<Input
			type={showPassword ? 'text' : 'password'}
			name="password"
			placeholder="Password"
			required
		/>
	</ButtonGroup>
	<p class="mt-4 text-sm">
		{$locale.signIn.questionPassword}
		<a href={resolve('/forgot-password')} class="text-primary-600">
			{$locale.changePassword.action}
		</a>
	</p>

	{#snippet button()}
		{$locale.signIn.action}
	{/snippet}
</Form>

<p class="mt-4 text-sm">
	{$locale.signIn.questionUsername}
	<a href={resolve('/sign-up')} class="text-primary-600">{$locale.signUp.action}</a>
</p>

<script lang="ts">
	import locale from '$lib/locales';
	import Form from '../Form.svelte';
	import { Input, ButtonGroup, InputAddon } from 'flowbite-svelte';
	import { EyeOutline, EyeSlashOutline, UserOutline } from 'flowbite-svelte-icons';

	let showPassword = $state(false);
</script>

<svelte:head>
	<title>{$locale.signIn.title}</title>
</svelte:head>

<Form>
	<input type="hidden" name="providerId" value="credentials" />

	<ButtonGroup class="w-full">
		<InputAddon>
			<UserOutline class="h-6 w-6" />
		</InputAddon>
		<Input name="username" placeholder={$locale.signIn.username} required />
	</ButtonGroup>

	<ButtonGroup class="w-full mt-4">
		<InputAddon>
			<button type="button" tabindex="-1" onclick={() => (showPassword = !showPassword)}>
				{#if showPassword}
					<EyeOutline class="h-6 w-6" />
				{:else}
					<EyeSlashOutline class="h-6 w-6" />
				{/if}
			</button>
		</InputAddon>
		<Input
            type={showPassword ? 'text' : 'password'}
			name="password"
			placeholder="Password"
            required
		/>
	</ButtonGroup>
	<p class="text-sm mt-4">
		{$locale.signIn.questionPassword}
		<a href="/forgot-password" class="text-primary-600">{$locale.forgotPassword.action}</a>
	</p>

	{#snippet button()}
		{$locale.signIn.action}
	{/snippet}
</Form>

<p class="text-sm mt-4">
	{$locale.signIn.questionUsername}
	<a href="/sign-up" class="text-primary-600">{$locale.signUp.action}</a>
</p>

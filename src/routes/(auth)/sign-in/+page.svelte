<script lang="ts">
	import { enhance } from '$app/forms';
	import locale from '$lib/locales';
	import { Input, ButtonGroup, InputAddon, Button } from 'flowbite-svelte';
	import { EyeOutline, EyeSlashOutline, UserOutline } from 'flowbite-svelte-icons';

	let loading = $state(false);
	let showPassword = $state(false);
</script>

<svelte:head>
	<title>{$locale.signIn.title}</title>
</svelte:head>

<form
	method="POST"
	use:enhance={() => {
		loading = true;
		return ({ update }) => {
			update({ invalidateAll: false }).finally(async () => {
				loading = false;
			});
		};
	}}
>
	<input type="hidden" name="providerId" value="credentials" />

	<ButtonGroup class="w-full">
		<InputAddon>
			<UserOutline class="h-6 w-6" />
		</InputAddon>
		<Input name="username" required placeholder={$locale.signIn.username} />
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
			name="password"
			type={showPassword ? 'text' : 'password'}
			required
			placeholder="Password"
		/>
	</ButtonGroup>
	<p class="text-sm mt-4">
		{$locale.signIn.questionPassword}
		<a class="text-primary-600" href="/forgot-password">{$locale.forgotPassword.action}</a>
	</p>

	<Button type="submit" class="w-full mt-10" {loading}>{$locale.signIn.action}</Button>
	<p class="text-sm mt-4">
		{$locale.signIn.questionUsername}
		<a class="text-primary-600" href="/sign-up">{$locale.signUp.action}</a>
	</p>
</form>

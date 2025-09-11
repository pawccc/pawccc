<script lang="ts">
	import { enhance } from '$app/forms';
	import { Input, ButtonGroup, InputAddon, Button } from 'flowbite-svelte';
	import { EyeOutline, EyeSlashOutline, UserOutline } from 'flowbite-svelte-icons';

	let showPassword = $state(false);
</script>

<svelte:head>
	<title>Sign-in</title>
</svelte:head>

<form method="POST" use:enhance>
	<input type="hidden" name="providerId" value="credentials" />

	<ButtonGroup class="w-full">
		<InputAddon>
			<UserOutline class="h-6 w-6" />
		</InputAddon>
		<Input name="username" placeholder="Username or E-Mail" />
	</ButtonGroup>

	<ButtonGroup class="w-full mt-4">
		<InputAddon>
			<button type="button" onclick={() => (showPassword = !showPassword)}>
				{#if showPassword}
					<EyeOutline class="h-6 w-6" />
				{:else}
					<EyeSlashOutline class="h-6 w-6" />
				{/if}
			</button>
		</InputAddon>
		<Input name="password" type={showPassword ? 'text' : 'password'} placeholder="Password" />
	</ButtonGroup>
	<p class="text-sm mt-4">
		Forgot your password? <a class="text-primary-600" href="/forgot-password">Change password</a>
	</p>

	<Button type="submit" class="w-full mt-10">Sign-in</Button>
	<p class="text-sm mt-4">
		Don't have an account? <a class="text-primary-600" href="/sign-up">Sign-up</a>
	</p>
</form>

<script lang="ts">
	import { enhance } from '$app/forms';
	import { Input, ButtonGroup, InputAddon, Button } from 'flowbite-svelte';
	import { EyeOutline, EyeSlashOutline } from 'flowbite-svelte-icons';

	let showPassword = $state(false);
</script>

<svelte:head>
	<title>Change password</title>
</svelte:head>

<form method="POST" use:enhance>
	<ButtonGroup class="w-full">
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
		<Input
			name="password-repeat"
			type={showPassword ? 'text' : 'password'}
			placeholder="Confirm password"
		/>
	</ButtonGroup>

	<Button type="submit" class="w-full mt-10">Change Password</Button>
</form>

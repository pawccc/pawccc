<script lang="ts">
	import { enhance } from '$app/forms';
	import { Input, ButtonGroup, InputAddon, Button } from 'flowbite-svelte';
	import { UserOutline } from 'flowbite-svelte-icons';
</script>

<svelte:head>
	<title>Forgot password</title>
</svelte:head>

<form method="POST" use:enhance>
	<ButtonGroup class="w-full">
		<InputAddon>
			<UserOutline class="h-6 w-6" />
		</InputAddon>
		<Input name="username" placeholder="Username or E-Mail" />
	</ButtonGroup>

	<Button type="submit" class="w-full mt-10">Change Password</Button>
</form>

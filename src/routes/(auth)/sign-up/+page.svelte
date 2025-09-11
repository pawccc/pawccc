<script lang="ts">
	import { enhance } from '$app/forms';
	import { Checkbox, Input, ButtonGroup, InputAddon, Button } from 'flowbite-svelte';
	import { EnvelopeOutline, UserOutline } from 'flowbite-svelte-icons';
</script>

<svelte:head>
	<title>Sign-up</title>
</svelte:head>

<form method="POST" use:enhance>
	<ButtonGroup class="w-full">
		<InputAddon>
			<UserOutline class="h-6 w-6" />
		</InputAddon>
		<Input name="username" placeholder="Username" />
	</ButtonGroup>

	<ButtonGroup class="w-full mt-4 mb-4">
		<InputAddon>
			<EnvelopeOutline class="h-6 w-6" />
		</InputAddon>
		<Input name="email" placeholder="E-Mail" />
	</ButtonGroup>

	<Checkbox>Agree to terms and conditions</Checkbox>

	<Button type="submit" class="w-full mt-10">Sign-up</Button>
	<p class="text-sm mt-4">
		Already have an account? <a class="text-primary-600" href="/sign-in">Sign-in</a>
	</p>
</form>

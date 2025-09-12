<script lang="ts">
	import { enhance } from '$app/forms';
	import locale from '$lib/locales';
	import { Input, ButtonGroup, InputAddon, Button } from 'flowbite-svelte';
	import { UserOutline } from 'flowbite-svelte-icons';

	let loading = $state(false);
</script>

<svelte:head>
	<title>{$locale.forgotPassword.title}</title>
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
	<ButtonGroup class="w-full">
		<InputAddon>
			<UserOutline class="h-6 w-6" />
		</InputAddon>
		<Input name="username" required placeholder={$locale.forgotPassword.username} />
	</ButtonGroup>

	<Button type="submit" class="w-full mt-10" {loading}>{$locale.forgotPassword.action}</Button>
</form>

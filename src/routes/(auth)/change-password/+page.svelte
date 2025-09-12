<script lang="ts">
	import { enhance } from '$app/forms';
	import locale from '$lib/locales';
	import { Input, ButtonGroup, InputAddon, Button } from 'flowbite-svelte';
	import { LockOutline } from 'flowbite-svelte-icons';

	let loading = $state(false);
</script>

<svelte:head>
	<title>{$locale.changePassword.title}</title>
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
			<LockOutline class="h-6 w-6" />
		</InputAddon>
		<Input
			name="password"
			type="password"
			autocomplete="new-password"
			required
			placeholder={$locale.changePassword.password}
		/>
	</ButtonGroup>
	<ButtonGroup class="w-full mt-4">
		<InputAddon>
			<LockOutline class="h-6 w-6" />
		</InputAddon>
		<Input
			type="password"
			autocomplete="new-password"
			required
			placeholder={$locale.changePassword.passwordRepeat}
		/>
	</ButtonGroup>

	<Button type="submit" class="w-full mt-10" {loading}>{$locale.changePassword.action}</Button>
</form>

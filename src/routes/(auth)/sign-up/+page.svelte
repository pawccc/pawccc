<script lang="ts">
	import { enhance } from '$app/forms';
	import locale from '$lib/locales';
	import { Checkbox, Input, ButtonGroup, InputAddon, Button } from 'flowbite-svelte';
	import { EnvelopeOutline, UserOutline } from 'flowbite-svelte-icons';

	let loading = $state(false);
</script>

<svelte:head>
	<title>{$locale.signUp.title}</title>
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
		<Input name="username" required placeholder={$locale.signUp.username} />
	</ButtonGroup>

	<ButtonGroup class="w-full mt-4 mb-4">
		<InputAddon>
			<EnvelopeOutline class="h-6 w-6" />
		</InputAddon>
		<Input name="email" type="email" required placeholder={$locale.signUp.email} />
	</ButtonGroup>

	<Checkbox>{$locale.signUp.terms}</Checkbox>

	<Button type="submit" class="w-full mt-10" {loading}>{$locale.signUp.action}</Button>
	<p class="text-sm mt-4">
		{$locale.signUp.questionUsername}
		<a class="text-primary-600" href="/sign-in">{$locale.signIn.action}</a>
	</p>
</form>

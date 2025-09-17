<script lang="ts">
	import type { Snippet } from 'svelte';

	import { Button } from 'flowbite-svelte';

	import { enhance } from '$app/forms';

	let { children, button }: { children: Snippet; button: Snippet } = $props();

	let loading = $state(false);
	let failure = $state(false);
</script>

<form
	method="POST"
	use:enhance={() => {
		loading = true;
		failure = false;
		return ({ update, result }) => {
			update({ invalidateAll: false }).finally(async () => {
				loading = false;
				failure = result.type === 'failure';
			});
		};
	}}
>
	{@render children()}

	<Button type="submit" class={{ 'mt-10 w-full': true, 'animation-shake': failure }} {loading}>
		{@render button()}
	</Button>
</form>

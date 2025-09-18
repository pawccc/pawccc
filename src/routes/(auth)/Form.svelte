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

	<Button type="submit" class={{ 'mt-10 w-full': true, 'animate-failure': failure }} {loading}>
		{@render button()}
	</Button>
</form>

<style>
	:global(.animate-failure) {
		animation: failure 0.8s ease both;
	}

	@keyframes failure {
		0%,
		100% {
			transform: translateX(0);
		}

		10%,
		30%,
		50%,
		70% {
			transform: translateX(-4px);
		}

		20%,
		40%,
		60% {
			transform: translateX(4px);
		}

		80% {
			transform: translateX(2px);
		}

		90% {
			transform: translateX(-2px);
		}
	}
</style>

<script lang="ts">
	import { Card } from 'flowbite-svelte';

	let { children } = $props();
</script>

<Card class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform p-4">
	{@render children?.()}
</Card>

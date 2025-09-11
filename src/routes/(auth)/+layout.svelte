<script lang="ts">
	import { Card } from 'flowbite-svelte';

	let { children } = $props();
</script>

<Card class="p-4 absolute top-1/2 left-1/2" style="transform: translate(-50%, -50%)">
	{@render children?.()}
</Card>

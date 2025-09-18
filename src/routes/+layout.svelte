<script lang="ts">
	import { navigating } from '$app/state';

	import '../app.css';

	let { children } = $props();
</script>

{#if navigating.to}
	<div class="fixed top-0 left-0 h-1 w-full">
		<div class="animate-progress h-full bg-primary-700 dark:bg-primary-600"></div>
	</div>
{/if}

{@render children?.()}

<style>
	:global(.animate-progress) {
		animation: progress 60s cubic-bezier(0.1, 1, 0.2, 1) forwards;
	}

	@keyframes progress {
		from {
			width: 0;
		}
		to {
			width: 100%;
		}
	}
</style>

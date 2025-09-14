<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.error.message}</title>
</svelte:head>

<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
	<h1
		class="mb-4 text-7xl lg:text-9xl tracking-tight font-extrabold text-primary-600 dark:text-primary-500"
	>
		{page.status}
	</h1>
	<p class="mb-4 text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
		{page.error.message}
	</p>
	<p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
		{JSON.stringify(page.error)}
	</p>
</div>

<script lang="ts">
	import { Avatar, BottomNav, BottomNavItem } from 'flowbite-svelte';

	let { data, children } = $props();
</script>

<div class="mx-auto max-w-7xl">
	{@render children?.()}
</div>

<BottomNav position="absolute" navType="pagination" classes={{ inner: 'grid-cols-3' }}>
	<BottomNavItem btnName="Explore" href="/" data-sveltekit-replacestate>
		<span
			class="fa fa-fw fa-lg fa-search mb-1 text-gray-500 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-500"
		></span>
	</BottomNavItem>
	<BottomNavItem btnName="Inbox" href="/{data.username}/chat">
		<span
			class="fa fa-fw fa-lg fa-paper-plane mb-1 text-gray-500 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-500"
		></span>
	</BottomNavItem>
	<BottomNavItem btnName="Profile" href="/{data.username}" data-sveltekit-replacestate>
		<Avatar
			class="mb-1 h-8 w-8 text-gray-500 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-500"
		/>
	</BottomNavItem>
</BottomNav>

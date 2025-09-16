<script lang="ts">
	import { BottomNav, BottomNavItem, Avatar } from 'flowbite-svelte';
	import { HomeSolid, SearchSolid, PaperPlaneSolid } from 'flowbite-svelte-icons';

	let { children } = $props();
</script>

<div class="max-w-7xl mx-auto">
	{@render children?.()}
</div>

<BottomNav position="absolute" navType="pagination" class="h-15" classes={{ inner: 'grid-cols-4' }}>
	<BottomNavItem btnName="Home" href="/">
		<HomeSolid
			class="group-hover:text-primary-600 dark:group-hover:text-primary-500 mb-1 h-8 w-8 text-gray-500 dark:text-gray-400"
		/>
	</BottomNavItem>
	<BottomNavItem btnName="Explore" href="/">
		<SearchSolid
			class="group-hover:text-primary-600 dark:group-hover:text-primary-500 mb-1 h-8 w-8 text-gray-500 dark:text-gray-400"
		/>
	</BottomNavItem>
	<BottomNavItem btnName="Chats" href="/valaphee/chat">
		<PaperPlaneSolid
			class="group-hover:text-primary-600 dark:group-hover:text-primary-500 mb-1 h-8 w-8 rotate-45 text-gray-500 dark:text-gray-400"
		/>
	</BottomNavItem>
	<BottomNavItem btnName="Profile" href="/valaphee">
		<Avatar
			class="group-hover:text-primary-600 dark:group-hover:text-primary-500 mb-1 h-8 w-8 text-gray-500 dark:text-gray-400"
		/>
	</BottomNavItem>
</BottomNav>

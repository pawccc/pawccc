<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from 'flowbite-svelte';
</script>

<svelte:head>
	<title>Sign-out</title>
</svelte:head>

<form method="POST" use:enhance>
	<Button type="submit" class="w-full">Sign-out</Button>
</form>

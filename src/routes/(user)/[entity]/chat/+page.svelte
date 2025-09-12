<script lang="ts">
	import { enhance } from '$app/forms';
	import { ToolbarButton, Textarea } from 'flowbite-svelte';
	import { ImageOutline, FaceGrinOutline, PaperPlaneOutline } from 'flowbite-svelte-icons';

	let form: HTMLFormElement;
</script>

<form
	method="POST"
	use:enhance={() => {
		return ({ update }) => {
			update({ invalidateAll: false });
		};
	}}
	bind:this={form}
	class="flex items-center rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700"
	style="align-items: flex-end"
>
	<ToolbarButton color="dark" class="text-gray-500 dark:text-gray-400">
		<ImageOutline class="h-6 w-6" />
	</ToolbarButton>
	<ToolbarButton color="dark" class="text-gray-500 dark:text-gray-400">
		<FaceGrinOutline class="h-6 w-6" />
	</ToolbarButton>
	<Textarea
		class="mx-4 w-full resize-none overflow-hidden bg-white dark:bg-gray-800"
		classes={{ div: 'w-full' }}
		rows={1}
		placeholder="Your message..."
		oninput={(event) => {
			event.target.style.height = '0px';
			event.target.style.height = event.target.scrollHeight + 2 + 'px';
		}}
		onkeypress={(event) => {
			if (event.keyCode === 13 && !event.shiftKey) {
				event.preventDefault();
				form.requestSubmit();
			}
		}}
	/>
	<ToolbarButton type="submit" color="primary" class="ml-6 rounded-full">
		<PaperPlaneOutline class="h-6 w-6 rotate-45" />
	</ToolbarButton>
</form>

<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';
	import { ToolbarButton, Textarea, Avatar } from 'flowbite-svelte';
	import { ImageOutline, FaceGrinOutline, PaperPlaneOutline } from 'flowbite-svelte-icons';

	let { data }: PageProps = $props();

	let form: HTMLFormElement;
</script>

<svelte:head>
	<title></title>
</svelte:head>

<div class="flex flex-col h-screen max-w-7xl mx-auto">
	<div class="flex-1 overflow-y-scroll">
		{#each data.messages as message (message.id)}
			<div class="flex items-start gap-2.5">
				<Avatar />
				<div class="flex flex-col w-full max-w-[320px] leading-1.5">
					<div class="flex items-center space-x-2 rtl:space-x-reverse">
						<span class="text-sm font-semibold text-gray-900 dark:text-white">{message.name}</span>
						<span class="text-sm font-normal text-gray-500 dark:text-gray-400">{message.date}</span>
					</div>
					<p
						class="text-sm font-normal py-2 mb-1 text-gray-900 dark:text-white p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700"
					>
						{message.text}
					</p>
				</div>
			</div>
		{/each}
	</div>

	<form
		method="POST"
		use:enhance={() => {
			return ({ update }) => {
				update({ invalidateAll: false });
			};
		}}
		bind:this={form}
		class="flex items-end rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700"
	>
		<ToolbarButton color="dark" class="text-gray-500 dark:text-gray-400 mb-1.5">
			<ImageOutline class="h-6 w-6" />
		</ToolbarButton>
		<ToolbarButton color="dark" class="text-gray-500 dark:text-gray-400 mb-1.5">
			<FaceGrinOutline class="h-6 w-6" />
		</ToolbarButton>
		<Textarea
			class="mx-4 w-full resize-none overflow-hidden bg-white dark:bg-gray-800"
			classes={{ div: 'w-full' }}
			rows={1}
			placeholder="Message"
			oninput={(event) => {
				event.target.style.height = '0px';
				event.target.style.height = event.target.scrollHeight + 2 + 'px';
			}}
			onkeypress={(event) => {
				if (event.keyCode === 13 && !event.shiftKey) {
					event.preventDefault();
					form.requestSubmit();

					event.target.value = '';
					event.target.style.height = '0px';
					event.target.style.height = event.target.scrollHeight + 2 + 'px';
				}
			}}
		/>
		<ToolbarButton type="submit" color="primary" class="ml-6 rounded-full mb-1.5">
			<PaperPlaneOutline class="h-6 w-6 rotate-45" />
		</ToolbarButton>
	</form>
</div>

<script lang="ts">
	import { page } from '$app/state';
	import { ToolbarButton, Textarea, Avatar } from 'flowbite-svelte';
	import { ImageOutline, FaceGrinOutline, PaperPlaneOutline } from 'flowbite-svelte-icons';

	let ws: WebSocket;
	const messages = $state([]);

	$effect(() => {
		ws = new WebSocket(`ws://${location.host}/`);
		ws.addEventListener('message', (evt) => {
			const event = JSON.parse(evt.data);
			if (event.event === 'Chat' && event.id == page.params.chat) {
				messages.push(...event.messages);
			}
		});
		ws.addEventListener('open', () => {
			ws.send(
				JSON.stringify({
					event: 'OpenChat',
					id: Number(page.params.chat)
				})
			);
		});
	});
</script>

<svelte:head>
	<title></title>
</svelte:head>

<div class="flex flex-col h-screen max-w-7xl mx-auto">
	<div class="flex-1 overflow-y-scroll">
		{#each messages as message (message.id)}
			<div class="flex items-start gap-2.5">
				<Avatar />
				<div class="flex flex-col w-full max-w-[320px] leading-1.5">
					<div class="flex items-center space-x-2 rtl:space-x-reverse">
						<span class="text-sm font-semibold text-gray-900 dark:text-white">{message.user}</span>
						<span class="text-sm font-normal text-gray-500 dark:text-gray-400">{message.date}</span>
					</div>
					<p
						class="text-sm font-normal py-2 mb-1 rounded-e-xl rounded-es-xl text-gray-900 dark:text-white p-4 border-gray-200 bg-gray-100 dark:bg-gray-700"
					>
						{message.text}
					</p>
				</div>
			</div>
		{/each}
	</div>

	<div class="flex items-end rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700">
		<ToolbarButton color="dark" class="text-gray-500 dark:text-gray-400 mb-1.5">
			<ImageOutline class="h-6 w-6" />
		</ToolbarButton>
		<ToolbarButton color="dark" class="text-gray-500 dark:text-gray-400 mb-1.5">
			<FaceGrinOutline class="h-6 w-6" />
		</ToolbarButton>
		<Textarea
			name="text"
			placeholder="Message"
			rows={1}
			class="mx-4 w-full resize-none overflow-hidden bg-white dark:bg-gray-800"
			classes={{ div: 'w-full' }}
			oninput={(evt) => {
				evt.target.style.height = '0px';
				evt.target.style.height = evt.target.scrollHeight + 2 + 'px';
			}}
			onkeypress={(evt) => {
				if (evt.keyCode === 13 && !evt.shiftKey) {
					evt.preventDefault();

					if (evt.target.value === '') return;
					ws.send(
						JSON.stringify({
							event: 'SendChat',
							id: Number(page.params.chat),
							text: evt.target.value
						})
					);

					evt.target.value = '';
					evt.target.style.height = '0px';
					evt.target.style.height = evt.target.scrollHeight + 2 + 'px';
				}
			}}
		/>
		<ToolbarButton type="submit" color="primary" class="ml-6 mb-1.5 rounded-full">
			<PaperPlaneOutline class="h-6 w-6 rotate-45" />
		</ToolbarButton>
	</div>
</div>

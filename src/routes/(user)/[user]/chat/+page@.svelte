<script lang="ts">
	import { Avatar, Textarea, ToolbarButton } from 'flowbite-svelte';

	const messages = $state([]);
</script>

<svelte:head>
	<title></title>
</svelte:head>

<div class="mx-auto flex h-screen max-w-7xl flex-col">
	<div class="flex-1 overflow-y-scroll">
		{#each messages as message (message.id)}
			<div class="flex items-start gap-2.5">
				<Avatar />
				<div class="flex w-full max-w-[320px] flex-col leading-1.5">
					<div class="flex items-center space-x-2 rtl:space-x-reverse">
						<span class="text-sm font-semibold text-gray-900 dark:text-white">{message.user}</span>
						<span class="text-sm font-normal text-gray-500 dark:text-gray-400">{message.date}</span>
					</div>
					<p
						class="mb-1 rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 p-4 py-2 text-sm font-normal text-gray-900 dark:bg-gray-700 dark:text-white"
					>
						{message.text}
					</p>
				</div>
			</div>
		{/each}
	</div>

	<div class="flex items-end rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-700">
		<ToolbarButton color="dark" class="mb-1.5 text-gray-500 dark:text-gray-400">
			<span class="fa fa-fw fa-lg fa-image"></span>
		</ToolbarButton>
		<ToolbarButton color="dark" class="mb-1.5 text-gray-500 dark:text-gray-400">
			<span class="fa fa-fw fa-lg fa-grin"></span>
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

					evt.target.value = '';
					evt.target.style.height = '0px';
					evt.target.style.height = evt.target.scrollHeight + 2 + 'px';
				}
			}}
		/>
		<ToolbarButton type="submit" color="primary" class="mb-1.5 ml-6 rounded-full">
			<span class="fa fa-fw fa-lg fa-paper-plane"></span>
		</ToolbarButton>
	</div>
</div>

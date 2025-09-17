<script lang="ts">
	import { PUBLIC_AUTH_PASSCODE_EXPIRY } from '$env/static/public';

	import locale from '$lib/locales';

	let { passcode }: { passcode: string } = $props();
</script>

<svelte:head>
	<mj-attributes>
		<mj-all font-family="Open Sans, Helvetica, Arial, sans-serif" />
		<mj-section padding="0" />
		<mj-column padding="0" />
		<mj-text font-size="16px" line-height="24px" color="#404242" />
		<mj-button background-color="#eb4f27" color="white" font-size="16px" border-radius="4px" />
	</mj-attributes>
</svelte:head>

<mj-section background-color="#ffffff" border-top="10px solid #eb4f27" padding="20px 40px">
	<mj-column>
		{@html $locale.changePassword.letter.content
			.replace('{passcode}', passcode)
			.replace('{passcode_expiry}', PUBLIC_AUTH_PASSCODE_EXPIRY)}
	</mj-column>
</mj-section>

<mj-section background-color="#ffffff" padding="20px 40px">
	<mj-column>
		{@html $locale.changePassword.letter.signature}
	</mj-column>
</mj-section>

<mj-section background-color="#f6f6f6" padding="20px 40px">
	<mj-column>
		<mj-text font-size="13px" color="#8f8f8f" align="center">
			{$locale.changePassword.letter.copyright}
		</mj-text>
	</mj-column>
</mj-section>

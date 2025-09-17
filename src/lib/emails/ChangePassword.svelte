<script lang="ts">
	import { PUBLIC_AUTH_PASSCODE_EXPIRY } from '$env/static/public';

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
		<mj-text>Hello,</mj-text>
		<mj-text>
			We received a request to change the password for your account.<br />
			If you made this request, click the button below to set a new password:
		</mj-text>
		<mj-button href="https://pawc.cc/change-password?passcode={passcode}">Change password</mj-button
		>
		<mj-text>
			For your security, this link will expire in {PUBLIC_AUTH_PASSCODE_EXPIRY}.<br />
			If you didn’t request a password reset, you can safely ignore this email — your password will stay
			the same.
		</mj-text>
	</mj-column>
</mj-section>

<mj-section background-color="#ffffff" padding="20px 40px">
	<mj-column>
		<mj-text>Thanks,<br />The pawc.cc Team</mj-text>
	</mj-column>
</mj-section>

<mj-section background-color="#f6f6f6" padding="20px 40px">
	<mj-column>
		<mj-text font-size="13px" color="#8f8f8f" align="center">
			Copyright (c) 2025, pawc.cc. All rights reserved.
		</mj-text>
	</mj-column>
</mj-section>

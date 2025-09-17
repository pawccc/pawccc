import type { Component, ComponentProps, ComponentType, SvelteComponent } from 'svelte';
import { render } from 'svelte/server';

import mjml2html from 'mjml';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { RESEND_API_KEY } from '$env/static/private';

const transporter = nodemailer.createTransport({
	host: 'smtp.resend.com',
	auth: {
		user: 'resend',
		pass: RESEND_API_KEY
	},
	secure: true,
	port: 465
});

export const sendMail = async <
	Comp extends SvelteComponent<any> | Component<any>,
	Props extends ComponentProps<Comp> = ComponentProps<Comp>
>(
	mailOptions: Mail.Options,
	component: Comp extends SvelteComponent<any> ? ComponentType<Comp> : Comp,
	props: Omit<Props, '$$slots' | '$$events'>
) => {
	const { head, body } = render(component, { props });

	const mjml = `<mjml>
    <mj-head>${head}</mj-head>
    <mj-body background-color="#f6f6f6">${body}</mj-body>
  </mjml>`;
	const { html } = mjml2html(mjml);

	await transporter.sendMail({ html, ...mailOptions });
};

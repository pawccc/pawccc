import type { Component, ComponentProps, ComponentType, SvelteComponent } from 'svelte';
import { render } from 'svelte/server';

import mjml2html from 'mjml';
import nodemailer from 'nodemailer';

import { env } from '$env/dynamic/private';

const transporter = nodemailer.createTransport({
	host: 'smtp.resend.com',
	auth: {
		user: 'resend',
		pass: env.RESEND_API_KEY
	},
	secure: true,
	port: 465
});

export const sendEmail = async <
	Comp extends SvelteComponent<any> | Component<any>,
	Props extends ComponentProps<Comp> = ComponentProps<Comp>
>(
	to: string,

	comp: Comp extends SvelteComponent<any> ? ComponentType<Comp> : Comp,
	props: Omit<Props, '$$slots' | '$$events'>
) => {
	const { body } = render(comp, { props });
	const { html, json } = await mjml2html(body);
	await transporter.sendMail({
		from: 'pawc.cc <no-reply@pawc.cc>',
		to,
		subject: json.attributes.subject,
		html
	});
};

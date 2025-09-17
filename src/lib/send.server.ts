import nodemailer from 'nodemailer';
import { RESEND_API_KEY } from '$env/static/private';

const transporter = nodemailer.createTransport({
	host: 'smtp.resend.com',
	auth: {
		user: 'resend',
		pass: RESEND_API_KEY,
	},
	secure: true,
	port: 465
})

export const sendMail = transporter.sendMail

// mail.ts reads SMTP settings at module scope, so the env must already be
// loaded no matter which entrypoint (server or worker) imports it first.
import "dotenv/config";
import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer/index.js";

const port = Number(process.env.SMTP_PORT) || 587;
const from = process.env.EMAIL_FROM;

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    connectionTimeout: Number(process.env.SMTP_CONNECTION_TIMEOUT) || 10_000,
    greetingTimeout: Number(process.env.SMTP_GREETING_TIMEOUT) || 10_000,
    socketTimeout: Number(process.env.SMTP_SOCKET_TIMEOUT) || 20_000,
}, {
    from,
});

export async function sendEmail({
    from,
    to,
    subject,
    html,
    attachments
}: {
    from?: string,
    to: string,
    subject: string,
    html: string,
    attachments?: Mail.Attachment[]
}) {
    await transporter.sendMail({
        ...(from ? { from } : {}),
        to,
        subject,
        html,
        ...(attachments ? { attachments } : {})
    });
}

export default { transporter, sendEmail };

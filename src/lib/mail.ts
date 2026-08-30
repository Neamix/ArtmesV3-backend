import nodemailer from "nodemailer";

const port = Number(process.env.SMTP_PORT) || 587;
const from = process.env.MAIL_FROM_EMAIL;

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
}, {
    from,
});

export async function sendEmail({
    from,
    to,
    subject,
    html
}: {
    from?: string,
    to: string,
    subject: string,
    html: string
}) {
    // omit `from` entirely when unset so the transporter default applies —
    // passing it as undefined counts as "present" and skips the default
    await transporter.sendMail({
        ...(from ? { from } : {}),
        to,
        subject,
        html
    });
}

export default { transporter, sendEmail };

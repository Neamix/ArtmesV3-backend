import { Worker } from 'bullmq';
import bullconnection from '../../../lib/bullMQ.js';
import { sendEmail } from '../../../lib/mail.js';
import { logoAttachment } from '../../../emails/logoAttachment.js';
import { renderVerificationEmail } from '../../../emails/renderVerificationEmail.js';
import { renderResetPasswordEmail } from '../../../emails/renderResetPasswordEmail.js';
import { renderPasswordChangedEmail } from '../../../emails/renderPasswordChangedEmail.js';
import type { EmailJobName, EmailJobPayload } from './email.types.js';

const workerEmail = new Worker<EmailJobPayload, void, EmailJobName>("email-queue", async (job) => {
    // Every template embeds the logo as `cid:`, so each message carries it.
    const attachments = [logoAttachment];

    switch (job.data.type) {
        case "verify-email":
            await sendEmail({
                to: job.data.to,
                subject: "Artmes | Verify your email",
                html: await renderVerificationEmail({
                    name: job.data.name,
                    verificationUrl: job.data.verifyUrl,
                }),
                attachments,
            });
            return;

        case "reset-password":
            await sendEmail({
                to: job.data.to,
                subject: "Artmes | Reset your password",
                html: await renderResetPasswordEmail({
                    name: job.data.name,
                    resetUrl: job.data.resetUrl,
                    expiresInSeconds: job.data.expiresInSeconds,
                }),
                attachments,
            });
            return;

        case "password-changed":
            await sendEmail({
                to: job.data.to,
                subject: "Artmes | Your password was changed",
                html: await renderPasswordChangedEmail({
                    name: job.data.name,
                    changedAt: job.data.changedAt,
                }),
                attachments,
            });
            return;

        default: {
            // Exhaustiveness guard: a new payload variant fails to compile here
            // instead of being silently dropped at runtime.
            const unhandled: never = job.data;
            throw new Error(`Unhandled email job: ${JSON.stringify(unhandled)}`);
        }
    }
}, {
    connection: bullconnection,
    concurrency: 5,
    limiter: {
        max: 10,
        duration: 1000
    }
});

workerEmail.on('completed', (job) => console.log(`Job completed, job id: #${job.id}: ${job.name}`));
workerEmail.on('failed', (job, error) => {
    const attempts = job?.opts.attempts ?? 1;
    const exhausted = (job?.attemptsMade ?? 0) >= attempts;
    console.error(
        `Job failed, job id: #${job?.id}: ${job?.name} (attempt ${job?.attemptsMade}/${attempts})${exhausted ? ' — giving up' : ''}`,
        error
    );
});
workerEmail.on('error', (error) => console.error('Email worker error', error));
workerEmail.on('stalled', (jobId) => console.warn(`Email job stalled, job id: #${jobId}`));

export default workerEmail;

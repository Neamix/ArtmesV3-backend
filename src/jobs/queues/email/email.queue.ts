import { Queue } from "bullmq";
import bullconnection from "../../../lib/bullMQ.js";
import type { EmailJobName, EmailJobPayload } from "./email.types.js";

const emailQueue = new Queue<EmailJobPayload, void, EmailJobName>("email-queue", {
    connection: bullconnection,
    defaultJobOptions: {
        attempts: 5,
        backoff: { type: "exponential", delay: 5_000 },
        removeOnComplete: { age: 60 * 60, count: 1000 },
        removeOnFail: { count: 1000 },
    },
});

export async function enqueueEmail(payload: EmailJobPayload) {
    await emailQueue.add(payload.type, payload);
}

export default emailQueue;

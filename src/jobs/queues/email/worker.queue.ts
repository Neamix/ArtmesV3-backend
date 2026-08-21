import { Worker, Job } from 'bullmq';
import bullconnection from '../../../lib/bullMQ.js';

const workerEmail = new Worker("email-queue", async (job: Job,token?: string,signal?: AbortSignal) => {
    console.log(job);
}, {
    connection: bullconnection,
    concurrency: 5,
    removeOnComplete: {
        age: 60 * 60,
        count: 1000
    }
});

workerEmail.on('completed', (job) => console.log(`Email has been sent, job id: ${job.id}`));
workerEmail.on('failed', (job, error) => console.log(`Failed to send email, job id: ${job?.id}`, error));

export default workerEmail;
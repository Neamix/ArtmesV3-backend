import { Worker, Job } from 'bullmq';
import bullconnection from '../../../lib/bullMQ.js';

const workerEmail = new Worker("email-queue", async (job: Job) => {
    console.log(`Processing job ${job.id} (${job.name})`, job.data);

    return {
        processedAt: new Date().toISOString(),
    };
}, {
    connection: bullconnection,
    concurrency: 5,
    removeOnComplete: {
        age: 60 * 60,
        count: 1000
    }
});

workerEmail.on('completed', (job) => console.log(`Job completed, job id: ${job.id}`));
workerEmail.on('failed', (job, error) => console.error(`Job failed, job id: ${job?.id}`, error));
workerEmail.on('error', (error) => console.error('Email worker error', error));

export default workerEmail;

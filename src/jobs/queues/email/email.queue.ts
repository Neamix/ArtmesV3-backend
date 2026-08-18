import { Queue } from "bullmq";
import bullconnection from "../../../lib/bullMQ.js";

const emailQueue: Queue = new Queue("email-queue",{
    connection: bullconnection
});

export default emailQueue;
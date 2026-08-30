import workerEmail from "./queues/email/worker.queue.js";
import redisClient from "../lib/redisClient.js";

const workers = [
    workerEmail
]

let shuttingDown = false;

const shutdown = async (signal: string) => {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  console.log(`${signal} received`);

  await Promise.all(
    workers.map((worker) => worker.close())
  );

  if (redisClient.isOpen) {
    await redisClient.quit();
  }

  console.log("Workers stopped");
};

for (const signal of ['SIGTERM', 'SIGINT'] as const) {
  process.once(signal, () => {
    void shutdown(signal).catch((error: unknown) => {
      console.error('Failed to stop workers cleanly', error);
      process.exitCode = 1;
    });
  });
}

await Promise.all(workers.map((worker) => worker.waitUntilReady()));
console.log(`Workers started: ${workers.length}`);

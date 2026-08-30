import express from 'express';
import type { Express, NextFunction, Request, Response } from 'express';
import { prisma } from './lib/prisma.js';
import cors from "cors";
import authRoutes from './modules/authentications/authentication.routes.js';
import { fileURLToPath } from 'node:url';
import redisClient from './lib/redisClient.js';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.js';
import userRouter from './modules/users/user.routes.js';
import emailQueue from './jobs/queues/email/email.queue.js';
import bootstrap from './bootstrap.js';

const port:number = Number(process.env.SERVER_PORT)  || 8000;
const app:Express = express();
const publicDirectory = fileURLToPath(new URL('../public', import.meta.url));

await bootstrap();

//----------------------------------- Middlewares --------------------------------------------- //
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}));

app.all('/api/auth/*splat', toNodeHandler(auth));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicDirectory));

//----------------------------------- Modules route Registery --------------------------------------------- //
app.use('/api/v1',authRoutes);
app.use('/api/v1/users', userRouter);
app.get('/api/v1/queue-test', async (_req: Request, res: Response): Promise<void> => {
    try {
        const job = await emailQueue.add('queue-smoke-test', {
            createdAt: new Date().toISOString(),
            source: 'GET /api/v1/queue-test',
        });

        res.status(202).json({
            status: true,
            message: 'Job queued',
            jobId: job.id,
        });
    } catch (error: unknown) {
        console.error('Failed to queue test job', error);
        res.status(503).json({
            status: false,
            message: 'Could not queue job',
        });
    }
});
app.get('/health',(req: Request,res: Response):void => {
    res.status(200).json({
        data: 'ping,ping,ping'
    })
})
app.use((req: Request,res: Response) => {
    res.status(404).json("No route found")
})

//----------------------------------- Database --------------------------------------------- //
try {
    await prisma.$connect();
} catch {
    process.exit(1);
}

const server = app.listen(port);

let shuttingDown = false;

for (const signal of ["SIGINT", "SIGTERM"] as const) {
    process.once(signal, (): void => {
        if (shuttingDown) {
            return;
        }

        shuttingDown = true;
        server.close(() => {
            void (async () => {
                await Promise.all([
                    prisma.$disconnect(),
                    emailQueue.close(),
                ]);

                if (redisClient.isOpen) {
                    await redisClient.quit();
                }
            })()
                .then(() => process.exit(0))
                .catch((error: unknown) => {
                    console.error('Failed to stop API cleanly', error);
                    process.exit(1);
                });
        });
    });
}

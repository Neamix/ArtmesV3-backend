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

const port:number = Number(process.env.SERVER_PORT)  || 8000;
const app:Express = express();
const publicDirectory = fileURLToPath(new URL('../public', import.meta.url));


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
app.get('/health',(req: Request,res: Response):void => {
    res.status(201).json({
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

for (const signal of ["SIGINT", "SIGTERM"] as const) {
    process.on(signal, (): void => {
        server.close(() => {
            void Promise.all([
                prisma.$disconnect(),
                redisClient.quit(),
            ]).then(() => process.exit(0));
        });
    });
}

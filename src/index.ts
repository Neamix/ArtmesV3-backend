import express from 'express';
import type { Express, NextFunction, Request, Response } from 'express';
import { prisma } from './lib/prisma.js';
import cors from "cors";
import authRoutes from './modules/authentications/authentication.routes.js';
import { fileURLToPath } from 'node:url';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.js';
import userRouter from './modules/users/user.routes.js';
import bootstrap from './bootstrap.js';
import { errorHandler } from './utilities/errorHandler.js';

const port:number = Number(process.env.SERVER_PORT)  || 8000;
const app:Express = express();
const publicDirectory = fileURLToPath(new URL('../public', import.meta.url));

await bootstrap();

//----------------------------------- Middlewares --------------------------------------------- //
app.use(cors({
    origin: [process.env.FRONT_END as string],
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
    res.status(200).json({
        data: 'ping,ping,ping'
    })
})

app.use((req: Request,res: Response) => {
    res.status(404).json("No route found")
})

// must come last: converts thrown errors (incl. Better Auth APIError) to JSON
app.use(errorHandler);

//----------------------------------- Database --------------------------------------------- //
try {
    await prisma.$connect();
} catch {
    process.exit(1);
}

const server = app.listen(port);


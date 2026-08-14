import express from 'express';
import type { Express, NextFunction, Request, Response } from 'express';
import { userRouter } from './modules/users/user.routes.js';
import { prisma } from './lib/prisma.js';
import cors from "cors";
import authRoutes from './modules/authentications/authentication.routes.js';
import multer from 'multer';
import { validateJwtConfiguration } from './utilities/jwt.js';
import { fileURLToPath } from 'node:url';

const port:number = Number(process.env.SERVER_PORT)  || 8000;
const app:Express = express();
const publicDirectory = fileURLToPath(new URL('../public', import.meta.url));
const allowedOrigins = process.env.CORS_ORIGINS
    ?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean) ?? [];

if (process.env.NODE_ENV === "production" && allowedOrigins.length === 0) {
    throw new Error("CORS_ORIGINS must be configured in production");
}

validateJwtConfiguration();

//----------------------------------- Middlewares --------------------------------------------- //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicDirectory));
app.use(cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : true,
}));

//----------------------------------- Modules route Registery --------------------------------------------- //
app.use('/api/v1',authRoutes);
app.use('/api/v1/users', userRouter);
app.get('/health',(req: Request,res: Response):void => {
    res.status(201).json({
        data: 'test server is live'
    })
})
app.use((req: Request,res: Response) => {
    res.status(404).json("No route found")
})

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof multer.MulterError) {
        return res.status(400).json({
            status: false,
            message: "Invalid multipart form data",
        });
    }

    return res.status(500).json({
        status: false,
        message: "Internal server error",
    });
});

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
            void prisma.$disconnect().then(() => process.exit(0));
        });
    });
}

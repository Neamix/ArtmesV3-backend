import express from 'express';
import type { Express,Request, Response } from 'express';
import { userRouter } from './modules/users/user.routes.js';
import { prisma } from './lib/prisma.js';
import cors from "cors";
import authRoutes from './modules/authentications/authentication.routes.js';

const port:number = Number(process.env.SERVER_PORT)  || 8000;
const app:Express = express();

//----------------------------------- Middlewares --------------------------------------------- //
app.use(express.json());
app.use(cors());


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

//----------------------------------- Database --------------------------------------------- //
try {
    await prisma.$connect();
    console.log("Database connected");
} catch (error) {
    console.error("Database connection failed: ", error);
    process.exit(1);
}

const server = app.listen(port,():void => {
    console.log("Listening on port: ",port);
});

for (const signal of ["SIGINT", "SIGTERM"] as const) {
    process.on(signal, (): void => {
        server.close(() => {
            void prisma.$disconnect().then(() => process.exit(0));
        });
    });
}

import express from 'express';
import type { Express } from 'express';
import { userRouter } from './modules/users/user.routes.js';
import type { Request, Response } from "express";
import cors from "cors";

const port:number = 8000;
const app:Express = express();

app.use(cors());
app.use(express.json());

app.get('/health',(req: Request,res: Response):void => {
    res.status(201).json({
        data: 'test server is live'
    })
})

app.use('/api/users', userRouter);

app.use((_req: Request, res: Response): void => {
    res.status(404).json({
        message: "No route found",
    });
});

app.listen(port,():void => {
    console.log("Listening on port: ",port);
});

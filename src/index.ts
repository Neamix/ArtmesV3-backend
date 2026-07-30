import express from 'express';
import type { Express,Request, Response } from 'express';
import { userRouter } from './modules/users/user.routes.js';
import cors from "cors";

const port:number = 8000;
const app:Express = express();

app.use(express.json());
app.use(cors());

app.get('/health',(req: Request,res: Response):void => {
    res.status(201).json({
        data: 'test server is live'
    })
})

app.use('/api/users', userRouter);

app.use((req: Request,res: Response) => {
    res.status(404).json("No route found")
})

app.listen(port,():void => {
    console.log("Listening on port: ",port);
});

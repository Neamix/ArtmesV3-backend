import express from 'express';
import type { Express } from 'express';

const port:number = 8000;
const app:Express = express();

app.use(express.json());

app.listen(port,() => {
    console.log("Listening on port: ",port);
})
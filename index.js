
import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http'
import userRouter from './api/routes/userRoute.js';
import postRouter from './api/routes/postRoute.js';
import callLogRouter from './api/routes/callLogRoute.js';


const app = express();
app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(postRouter);
app.use(callLogRouter)
app.get("/",(req,res)=>{
    res.json({"message":"welcome to yours api"})
})
export default app;
export const handler = serverless(app);

import express from 'express';
import cors from 'cors';
import userRouter from './routes/auth.routes.js';

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// api endpoints
app.use('/api/user', userRouter);

export default app;
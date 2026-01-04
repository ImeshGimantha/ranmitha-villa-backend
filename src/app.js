import express from 'express';
import cors from 'cors';
import userRouter from './routes/auth.routes.js';
import roomRouter from './routes/room.routes.js';

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// api endpoints
app.use('/api/user', userRouter);
app.use('/api/room', roomRouter);

export default app;
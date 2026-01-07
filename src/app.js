import express from 'express';
import cors from 'cors';
import userRouter from './routes/auth.routes.js';
import roomRouter from './routes/room.routes.js';
import error from './middlewares/error.middleware.js';
import bookingRouter from './routes/booking.routes.js';

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(error);

// api endpoints
app.use('/api/user', userRouter);
app.use('/api/room', roomRouter);
app.use('/api/booking', bookingRouter);

export default app;
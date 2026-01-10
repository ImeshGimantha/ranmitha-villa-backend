import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.routes.js';
import roomRouter from './routes/room.routes.js';
import error from './middlewares/error.middleware.js';
import bookingRouter from './routes/booking.routes.js';
import userRouter from './routes/user.routes.js';
import tourRouter from './routes/tour.routes.js';

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(error);

// api endpoints
app.use('/api/user', authRouter);
app.use('/api/room', roomRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/user', userRouter);
app.use('/api/tour', tourRouter);

export default app;
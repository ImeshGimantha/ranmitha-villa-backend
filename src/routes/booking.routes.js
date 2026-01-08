import express from 'express';
import BookingController from '../controllers/booking.controller.js';
import userAuth from '../middlewares/userAuth.middleware.js';

const bookingRouter = express.Router();

bookingRouter.post('/tempory', BookingController.temporyReserveRoom);
bookingRouter.post('/confirm', userAuth, BookingController.confirmReservation);
bookingRouter.post('/cancel', userAuth, BookingController.cancelReservation);
bookingRouter.get('/list', BookingController.listAllReservation);

export default bookingRouter;
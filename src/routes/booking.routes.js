import express from 'express';
import auth from '../middlewares/auth.middleware.js';
import BookingController from '../controllers/booking.controller.js';

const bookingRouter = express.Router();

bookingRouter.post('/tempory', auth, BookingController.temporyReserveRoom); // change auth to user auth. currently use admin auth.
bookingRouter.post('/confirm', auth, BookingController.confirmReservation);
bookingRouter.post('/cancel', auth, BookingController.cancelReservation);
bookingRouter.get('/list', BookingController.listAllReservation);

export default bookingRouter;
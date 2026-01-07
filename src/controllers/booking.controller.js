import BookingService from "../services/booking.service.js";

const BookingController = {
    temporyReserveRoom: async (req, res, next) => {
        try {
            const reservation = await BookingService.temporyReserve(req.body);
            res.json({
                success: true,
                reservation
            });
        } catch (error) {
            next(error);
        }
    },
    confirmReservation: async (req, res, next) => {
        try {
            await BookingService.confirmReservation(req.body);
            res.json({
                success: true,
                message: "Room reservation has successful"
            });
        } catch (error) {
            next(error);
        }
    },
    cancelReservation: async (req, res, next) => {
        try {
            await BookingService.cancelReservation(req.body);
            res.json({
                success: true,
                message: "Reservation successfully cancelled"
            });
        } catch (error) {
            next(error);
        }
    },
    listAllReservation: async (req, res, next) => {
        try {
            const reservations = await BookingService.allReservation();
            res.json({
                success: true,
                reservations
            });
        } catch (error) {
            next(error);
        }
    },
    listUserReservations: async (req, res, next) => {}
}

export default BookingController;
import BookingRepository from "../repositories/booking.repository.js";
import RoomRepository from "../repositories/room.repository.js";
import { AppError } from "../utils/errorHandler.js";
import userService from "./user.service.js";

class BookingService {
    async temporyReserve(body) {
        try {
            const { roomId, booking_id, room_id, user_id, check_in_date, check_out_date } = body;
            
            const checkIn = new Date(check_in_date).getTime();
            const checkOut = new Date(check_out_date).getTime();

            const room = await RoomRepository.getOne(roomId);
            const nights = (checkOut - checkIn)/(1000 * 60 * 60 * 24);
            
            if (!await BookingRepository.isAvailabe(room_id, checkIn, checkOut)) {
                throw new AppError(`Room is not available`, 200);
            }
            
            const bookingData = {
                booking_id,
                room_id,
                user_id,
                check_in_date: checkIn,
                check_out_date: checkOut,
                status: 'pending',
                total_price: room.pricePerNight * nights
            }
            
            return await BookingRepository.create(bookingData);
            
        } catch (error) {
            throw new AppError(`Room reservation unsuccessfull: ${error.message}`, 500);
        }
    }
    
    /*
        1. if user not have tempory booking, first we have create new booking and after that change booking status to "confirmed"
        2. if we do that, we want to store booking id in frontend
        3. when call that api, pass that booking id with other necessery parameters
    */
    async confirmReservation(body) {
        try {
            const { bookingId } = body;
            let reservation = {};

            // if user not in the sysytem, then user register
            await userService.register(body);

            if (!bookingId) throw new AppError("Booking ID must be needed");

            reservation = await BookingRepository.getOne(bookingId);
            
            if (!reservation) {
                reservation = await this.temporyReserve(body); 
            }

            const booking = {
                booking_id: reservation['booking_id'],
                room_id: reservation['room_id'],
                user_id: reservation['user_id'],
                check_in_date: reservation["check_in_date"],
                check_out_date: reservation["check_out_date"],
                status: 'confirmed',
                total_price: reservation["total_price"],
                $unset: { expiresAt: 1}
            }
            return await BookingRepository.confirm(bookingId, booking);
        } catch (error) {
            throw new AppError(`Can't change reservation status or reserve room: ${error.message}`, 500);
        }
    }

    async cancelReservation(body) {
        try {
            const { bookingId } = body;

            const reservation = await BookingRepository.getOne(bookingId);
            const checkIn = new Date(reservation['check_in_date']).getTime();
            const datesToCheckIn = (checkIn - Date.now())/(1000 * 60 * 60 * 24);
            console.log("dated: ", datesToCheckIn);
            if (datesToCheckIn < 5) throw new AppError("Dates are too short to cancelled this reservation", 200); 
            
            return await BookingRepository.updateStatus(bookingId, "cancelled");
        } catch (error) {
            throw new AppError(`Can't cancelled reservation: ${error.message}`, 400);
        }
    }

    async allReservation() {
        try {
            return await BookingRepository.getAll();
        } catch (error) {
            throw new AppError(`Can't fetch reservations: ${error.message}`, 500);
        }
    }
}

export default new BookingService;
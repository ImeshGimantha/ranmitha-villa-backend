import bookingRepository from "../repositories/booking.repository.js";
import mailRepository from "../repositories/mail.repository.js";
import roomRepository from "../repositories/room.repository.js";
import { AppError } from "../utils/errorHandler.js";

class MailService {
    async booking(body) {
        try {
            const { bookingId, roomId } = body;
    
            const reservation = await bookingRepository.getOne(bookingId);
            const room = await roomRepository.getOne(roomId);
    
            return await mailRepository.booking(reservation, room);
        } catch (error) {
            throw new AppError(`Can't send mail: ${error.message}`, 500);
        }
    }

}

export default new MailService;
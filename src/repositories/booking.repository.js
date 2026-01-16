import BlockedDate from "../models/BlockedDates.model.js";
import Booking from "../models/Booking.model.js";

class BookingRepository {
    async getAll() {
        return await Booking.find({});
    }

    async create(bookingData) {
        const booking = new Booking(bookingData);
        await booking.save();
        return booking;
    }

    async getOne(bookingId) {
        return await Booking.findById(bookingId);
    }

    async isAvailabe(roomId, room_id, check_in_date, check_out_date) {
        const overlapingBooking = await Booking.findOne({
            room_id: room_id,
            status: {$in: ['pending', 'confirmed']},
            check_in_date: {$lt: check_out_date},
            check_out_date: {$gt: check_in_date}
        });

        const blockedBooking = await BlockedDate.findOne({
            room: roomId,
            isActive: true,
            from: {$lt: check_out_date},
            to: {$gt: check_in_date}
        });
        return overlapingBooking || blockedBooking ? false : true;
    }

    async confirm(bookingId, booking) {
        return await Booking.findByIdAndUpdate(bookingId, booking, {new: true});
    }

    async updateStatus(bookingId, status) {
        return await Booking.findByIdAndUpdate(bookingId, {status});
    }
}

export default new BookingRepository;
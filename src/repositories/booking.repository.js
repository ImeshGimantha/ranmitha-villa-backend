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

    async isAvailabe(room_id, check_in_date, check_out_date) {
        const overlapingBooking = await Booking.findOne({
            room_id: room_id,
            status: {$in: ['pending', 'confirmed']},
            check_in_date: {$lt: check_out_date},
            check_out_date: {$gt: check_in_date}
        });
        return overlapingBooking ? false : true;
    }

    async updateStatus(bookingId, status) {
        return await Booking.findByIdAndUpdate(bookingId, {status});
    }
}

export default new BookingRepository;
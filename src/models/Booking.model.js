import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    booking_id: { type: String, required: true },
    room_id: { type: String, required: true },
    user_id: { type: String, required: true },
    check_in_date: { type: Date, required: true },
    check_out_date: { type: Date, required: true },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    total_price: { type: Number, required: true }
}, {
    timestamps: true,
});

const Booking = mongoose.models.booking || mongoose.model('booking', bookingSchema);

export default Booking;
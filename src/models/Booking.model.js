import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    booking_id: { type: String, required: true },
    room_id: { type: String, required: true },
    user_id: { type: String, required: true },
    check_in_date: { type: Date, required: true },
    check_out_date: { type: Date, required: true },
    guests: { type: Number, required: true },
    nights: { type: Number, required: true },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    total_price: { type: Number, required: true },
    expiresAt: {
        type: Date, 
        default: () => new Date(Date.now() + 5 * 60 * 1000)
    }
}, {
    timestamps: true,
});

bookingSchema.index(
    { expiresAt: 1 }, 
    { 
        expireAfterSeconds: 0,
        partialFilterExpression: { status: 'pending' }
    }
);

const Booking = mongoose.models.booking || mongoose.model('booking', bookingSchema);

export default Booking;
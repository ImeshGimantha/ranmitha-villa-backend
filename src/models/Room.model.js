import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    rid: { type: String, required: true },
    type: {
        type: String,
        enum: ['Standerd Villa', "Family Villa"],
        required: true
    },
    description: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    maxGuests: { type: Number, required: true },
    beds: {
        king: { type: String, required: true, default: 0 },
        queen: { type: String, required: true, default: 0 },
        twin: { type: String, required: true, default: 0 },
    },
    size: { type: String, required: true },
    images: { type: Array, required: true },
    amenities: { type: Array, required: true },
    bedrooms: { type: Number, required: true, default: 1 },
    bathrooms: { type: Number, required: true },
    hasAC: { type: Boolean, required: true },
    status: {
        type: String,
        enum: ["available", "booked", "maintenance"],
        default: "available"
    },
}, {
    timestamps: true,
    minimize: false
});

const Room = mongoose.models.room || mongoose.model('room', roomSchema);

export default Room;
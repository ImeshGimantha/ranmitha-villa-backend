import mongoose from "mongoose";

const blockedDateSchema = new mongoose.Schema({
    block_id: { type: String, required: true },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true
    },
    from: { type: Date, required: true },
    to: { type: Date, required: true },
    reason: { type: String, trim: true, required: true },
    isActive: { type: Boolean, required: true, default: true },
}, { timestamps: true });

const BlockedDate = mongoose.models.blocked_date || mongoose.model("blocked_date", blockedDateSchema);

export default BlockedDate;
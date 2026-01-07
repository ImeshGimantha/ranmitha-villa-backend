import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: Number, required: true },
}, {
    timestamps: true,
    minimize: false
});

const User = mongoose.models.user || mongoose.model('user', userSchema);

export default User;
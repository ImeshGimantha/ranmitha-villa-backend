import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    mobile: { type: Number, required: true },
}, {
    timestamps: true,
});

const User = mongoose.models.user || mongoose.model('user', userSchema);

export default User;
import User from "../models/User.model.js";

class UserRepository {
    async checkExists(email) {
        return await User.findOne({email});
    }

    async register(userData) {
        return await new User(userData).save();
    }

    async update(user) {
        return await User.findByIdAndUpdate(user._id, user);
    }

    async delete(userId) {
        return await User.findByIdAndDelete(userId);
    }

    async getAll() {
        return await User.find({});
    }

    async getOne(userId) {
        return await User.findById(userId);
    }
}

export default new UserRepository;
import BlockedDate from "../models/BlockedDates.model.js";

class BlockedDateRepository {
    async create(blockedDateDetails) {
        return await new BlockedDate(blockedDateDetails).save();
    }

    async update(blockedDate) {
        return await BlockedDate.findByIdAndUpdate(blockedDate._id, blockedDate);
    }

    async getOne(blockId) {
        return await BlockedDate.findById(blockId);
    }

    async getAll() {
        return await BlockedDate.find({});
    }

    async updateStatus(blockedDate) {
        return await BlockedDate.findByIdAndUpdate(blockedDate._id, blockedDate);
    }
}

export default new BlockedDateRepository;
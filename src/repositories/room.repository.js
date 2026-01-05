import Room from "../models/Room.model.js"

class RoomRepository {
    async create(roomData) {
        const room = new Room(roomData);
        await room.save();
        return room;
    }

    async getAll() {
        return await Room.find({});
    }

    async getOne(roomId) {
        return await Room.findById(roomId);
    }

    async delete(roomId) {
        return await Room.findByIdAndDelete(roomId);
    }

    async update(room) {
        return await Room.findByIdAndUpdate(room._id, room);
    }
}

export default new RoomRepository;
import Room from "../models/Room.model.js"

const RoomRepository = {
    create: async (roomData) => {
        try {
            const room = new Room(roomData);
            await room.save();
            return room;
        } catch (error) {
            console.log(error);
            throw new Error(`Error creating new room in db: ${error.message}`);
        }
    }
}

export default RoomRepository;
import RoomService from "../services/room.service.js";

const RoomController = {
    createRoom: async (req, res, next) => {
        try {
            const room = await RoomService.createRoom(req.body, req.files);
            console.log(room);
            res.status(201).json({
                success: true,
                message: "New room successfully added!"
            });
        } catch (error) {
            next(error);
        }
    },
    listRooms: async (req, res, next) => {
        try {
            const rooms = await RoomService.getRooms();
            res.status(200).json({
                success: true,
                rooms
            });
        } catch (error) {
            next(error);
        }
    },
    listOneRoom: async (req, res, next) => {
        try {
            const { roomId } = req.body;
            const room = await RoomService.getRoom(roomId);
            res.status(200).json({
                success: true,
                room
            });
        } catch (error) {
            next(error);
        }
    },
    removeRoom: async (req, res, next) => {
        try {
            const { roomId } = req.body;
            await RoomService.removeRoom(roomId);
            res.status(200).json({
                success: true,
                message: "Room successfully removed"
            });
        } catch (error) {
            next(error);
        }
    },
    updateRoom: async (req, res, next) => {
        try {
            await RoomService.updateRoom(req.body, req.files);
            res.status(200).json({
                success: true,
                message: "Room successfully updated"
            });
        } catch (error) {
            next(error);
        }
    },
    updateRoomStatus: async (req, res, next) => {
        try {
            const { roomId, status } = req.body;
            await RoomService.updateStatus(roomId, status);
            res.status(200).json({
                success: true,
                message: "Room status successfully updated"
            });
        } catch (error) {
            next(error);
        }
    }
};

export default RoomController;
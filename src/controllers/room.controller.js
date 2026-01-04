import RoomService from "../services/room.service.js";

const RoomController = {
    addRoom: async (req, res) => {
        try {
            const room = await RoomService.addRoom(req.body, req.files);
            console.log(room);
            res.json({
                success: true,
                message: "New room successfully added!"
            });
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
                message: error.message
            });
        }
    },
    listRooms: async (req, res) => {
        try {
            const rooms = await RoomService.getRooms();
            res.json({
                success: true,
                rooms
            });
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
                message: error.message
            });
        }
    },
    listOneRoom: async (req, res) => {
        try {
            const { roomId } = req.body;
            const room = await RoomService.getRoom(roomId);
            res.json({
                success: true,
                room
            });
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
                message: error.message
            });
        }
    },
    removeRoom: async (req, res) => {},
    updateRoom: async (req, res) => {},
};

export default RoomController;
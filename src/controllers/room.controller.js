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
    }
};

export default RoomController;
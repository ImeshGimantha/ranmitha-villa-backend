import express from 'express';
import RoomController from '../controllers/room.controller.js';
import auth from '../middlewares/auth.middleware.js';
import upload from '../middlewares/upload.middleware.js';

const roomRouter = express.Router();

roomRouter.post('/add', auth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
    { name: 'image5', maxCount: 1 },
]), RoomController.createRoom);
roomRouter.get('/list', RoomController.listRooms);
roomRouter.post('/single', RoomController.listOneRoom);
roomRouter.post('/remove', auth, RoomController.removeRoom);
roomRouter.post('/update', auth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
    { name: 'image5', maxCount: 1 },
]), RoomController.updateRoom);
roomRouter.post('/updateStatus', auth, RoomController.updateRoomStatus);

export default roomRouter;
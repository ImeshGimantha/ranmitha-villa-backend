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
]), RoomController.addRoom);

export default roomRouter;
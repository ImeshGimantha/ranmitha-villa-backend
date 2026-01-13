import express from 'express';
import TourController from '../controllers/tour.controller.js';
import auth from '../middlewares/auth.middleware.js';
import upload from '../middlewares/upload.middleware.js';

const tourRouter = express.Router();

tourRouter.post('/create', auth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
    { name: 'image5', maxCount: 1 },
]), TourController.addTour);
tourRouter.post('/update', auth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
    { name: 'image5', maxCount: 1 },
]), TourController.updateTour);
tourRouter.get('/list', TourController.listTours);
tourRouter.post('/single', TourController.listOneTour);
tourRouter.post('/remove', auth, TourController.deleteTour);

export default tourRouter;
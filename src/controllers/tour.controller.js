import TourService from "../services/tour.service.js";

const TourController = {
    addTour: async (req, res, next) => {
        try {
            const tour = await TourService.createTour(req.body, req.files);
            console.log(tour);
            res.json({
                success: true,
                message: "Tour successfully created"
            });
        } catch (error) {
            next(error);
        }
    },
    updateTour: async (req, res, next) => {
        try {
            const tour = await TourService.updateTour(req.body, req.files);
            console.log(tour);
            res.json({
                success: true,
                message: "Tour details successfully updated"
            });
        } catch (error) {
            next(error);
        }
    },
    listTours: async (req, res, next) => {
        try {
            const tours = await TourService.listTour();
            res.json({
                success: true,
                tours
            });
        } catch (error) {
            next(error);
        }
    },
    listOneTour: async (req, res, next) => {
        try {
            const tour = await TourService.listOne(req.body);
            res.json({
                success: true,
                tour
            });
        } catch (error) {
            next(error)
        }
    },
    deleteTour: async (req, res, next) => {
        try {
            await TourService.removeTour(req.body);
            res.json({
                success: true,
                message: "Tour record successfully removed"
            });
        } catch (error) {
            next(error);
        }
    },
};

export default TourController;
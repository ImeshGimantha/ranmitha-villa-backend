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
    updateTour: async (req, res, next) => {},
    deleteTour: async (req, res, next) => {},
    listTours: async (req, res, next) => {},
    listOneTour: async (req, res, next) => {},
};

export default TourController;
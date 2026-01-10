import Tour from "../models/Tour.model.js";

class TourRepository {
    async create(tourData) {
        return await new Tour(tourData).save();
    }
}

export default new TourRepository;
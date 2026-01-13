import Tour from "../models/Tour.model.js";

class TourRepository {
    async create(tourData) {
        return await new Tour(tourData).save();
    }
    
    async getOne(tourId) {
        return await Tour.findById(tourId);
    }

    async getAll()  {
        return await Tour.find({});
    }
    
    async update(tourData) {
        return await Tour.findByIdAndUpdate(tourData._id, tourData);
    }

    async remove(tourId) {
        return await Tour.findByIdAndDelete(tourId);
    }
}

export default new TourRepository;
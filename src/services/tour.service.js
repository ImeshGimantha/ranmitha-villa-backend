import TourRepository from "../repositories/tour.repository.js";
import { AppError } from "../utils/errorHandler.js";
import { v2 as cloudinary } from "cloudinary";

class TourService {
    async createTour(body, files) {
        try {
            const { tid, name, description } = body;
            const image1 = files?.image1[0];
            const image2 = files?.image2[0];
            const image3 = files?.image3[0];
            const image4 = files?.image4[0];
            const image5 = files?.image5[0];

            const images = [image1, image2, image3, image4, image5].filter(image => image !== undefined);

            let imageUrl = await Promise.all(
                images.map(async image => {
                    let result = await cloudinary.uploader.upload(image.path, { resource_type: 'image'});
                    return result.secure_url;
                })
            );

            const tourData = {
                tid,
                name,
                description,
                images: imageUrl
            };

            const tour = await TourRepository.create(tourData);

            if (!tour) throw new AppError("Tour creation failed", 500);

            return tour;
        } catch (error) {
            throw new AppError(`Can't create new tour: ${error.message}`, 500);
        }
    }
    
    async updateTour(body) {}

    async listTour() {}

    async listOne(body) {}

    async removeTour(body) {}
}

export default new TourService;
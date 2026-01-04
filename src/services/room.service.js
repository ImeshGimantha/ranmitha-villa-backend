import { v2 as cloudinary } from 'cloudinary';
import RoomRepository from "../repositories/room.repository.js";

const RoomService = {
    addRoom: async (body, files) => {
        const { rid, type, description, pricePerNight, maxGuests, bedType, size, amenities, bathrooms, hasAC, status, createdAt, updatedAt } = body;
        const image1 = files?.image1[0];
        const image2 = files?.image2[0];
        const image3 = files?.image3[0];
        const image4 = files?.image4[0];
        const image5 = files?.image5[0];

        const images = [image1, image2, image3, image4, image5].filter(image => image !== undefined);

        let imageUrl = await Promise.all(
            images.map(async image => {
                let result = await cloudinary.uploader.upload(image.path, {resource_type: 'image'});
                return result.secure_url;
            })
        );

        const roomData = {
            rid,
            type,
            description,
            pricePerNight: Number(pricePerNight),
            maxGuests: Number(maxGuests),
            bedType,
            size,
            images: imageUrl,
            amenities: JSON.parse(amenities),
            bathrooms: Number(bathrooms),
            hasAC: hasAC === "true",
            status,
        };

        return await RoomRepository.create(roomData);
    }
};

export default RoomService;
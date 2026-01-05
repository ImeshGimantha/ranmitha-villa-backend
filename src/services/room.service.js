import { v2 as cloudinary } from 'cloudinary';
import RoomRepository from "../repositories/room.repository.js";
import { AppError } from '../utils/errorHandler.js';

class RoomService {
    async createRoom(body, files) {
        try {
            const { rid, type, description, pricePerNight, maxGuests, bedType, size, amenities, bathrooms, hasAC, status } = body;

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
            const room = await RoomRepository.create(roomData);
    
            if (!room) {
                throw new AppError("Room creation failed", 500);
            }

            return room;
        } catch (error) {
            if (error.name === 'ValidationError') {
                throw new AppError(error.message, 400);
            }

            throw new AppError("Failed to create room", 500);
        }
    }

    async getRooms() {
        try {
            return await RoomRepository.getAll();
        } catch (error) {
            throw new AppError(`Failed to fetch all room details: ${error.message}`, 500);
        }
    }

    async getRoom(roomId) {
        try {
            if (!roomId) {
                throw new AppError('Room ID must be needed', 400);
            }
            return await RoomRepository.getOne(roomId);
        } catch (error) {
            throw new AppError(`Failed to fetch room details: ${error.message}`, 500);
        }
    }

    async removeRoom(roomId) {
        try {
            if (!roomId) {
                throw new AppError('Room ID must be needed', 400);
            }
            return await RoomRepository.delete(roomId);
        } catch (error) {
            throw new AppError(`Failed to delete room: ${error.message}`, 500);
        }
    }

    async updateRoom(body, files) {
        try {
            console.log(body);
            const { roomId, type, description, pricePerNight, maxGuests, bedType, size, amenities, bathrooms, hasAC } = body;

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

            if (!roomId) {
                throw new AppError("Room ID must be needed", 400);
            }

            const room = await RoomRepository.getOne(roomId);
            
            room['type'] = type;
            room['description'] = description;
            room['pricePerNight'] = pricePerNight;
            room['maxGuests'] = maxGuests;
            room['bedType'] = bedType;
            room['size'] = size;
            room['images'] = imageUrl;
            room['amenities'] = amenities;
            room['bathrooms'] = bathrooms;
            room['hasAC'] = hasAC;

            return await RoomRepository.update(room);
        } catch (error) {
            throw new AppError(`Failed to update room data: ${error.message}`, 500);
        }
    }
}

export default new RoomService;
import blockedDateRepository from "../repositories/blockedDate.repository.js";
import { AppError } from "../utils/errorHandler.js";

class BlockedDateService {
    async addDate(body) {
        try {
            const { block_id, room, from, to, reason } = body;
    
            const blockedDateDetails = {
                block_id,
                room,
                from: new Date(from).getTime(),
                to: new Date(to).getTime(),
                reason
            };
    
            const blockedDate = await blockedDateRepository.create(blockedDateDetails);
            if (!blockedDate) throw new AppError("Block date not found", 400);
    
            return blockedDate;
        } catch (error) {
            throw new AppError(`Can't block date: ${error.message}`, 500);
        }
    }

    async updateDate(body) {
        try {
            const { blockId, room, from, to, reason } = body;

            const blockedDate = await blockedDateRepository.getOne(blockId);
            if (!blockedDate) throw new AppError("Date not found", 200);

            blockedDate['room'] = room;
            blockedDate['from'] = new Date(from).getTime();
            blockedDate['to'] = new Date(to).getTime();
            blockedDate['reason'] = reason;

            return await blockedDateRepository.update(blockedDate);
        } catch (error) {
            throw new AppError(`Can't update blocked date: ${error.message}`, 500);
        }
    }

    async listAllDates() {
        try {
            const blockedDates = await blockedDateRepository.getAll();
            if (!blockedDates) throw new AppError("Not found blocked dates", 400);
            return blockedDates;
        } catch (error) {
            throw new AppError(`Can't fetch blocked dates: ${error.message}`, 500);
        }
    }

    async listOneDate(body) {
        try {
            const { blockId } = body;
            if (!blockId) throw new AppError("Not found block ID", 400);

            const blockedDate = await blockedDateRepository.getOne(blockId);
            if (!blockedDate) throw new AppError("Blocked date not found", 200);

            return blockedDate;
        } catch (error) {
            throw new AppError(`Can't fetch blocked date: ${error.message}`, 500);
        }
    }

    async disableDate(body) {
        try {
            const { blockId } = body;
            if (!blockId) throw new AppError("Not found block ID", 400);

            const blockedDate = await blockedDateRepository.getOne(blockId);
            if (!blockedDate) throw new AppError("Blocked date not found", 200);

            blockedDate['isActive'] = false;

            return await blockedDateRepository.updateStatus(blockedDate);
        } catch (error) {
            throw new AppError(`Can't disable this date: ${error.message}`, 500);
        } 
    }
}

export default new BlockedDateService;
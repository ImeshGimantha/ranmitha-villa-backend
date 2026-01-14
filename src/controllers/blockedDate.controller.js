import blockedDateService from "../services/blockedDate.service.js";

const BlockedDateController = {
    createBlockedDate: async (req, res, next) => {
        try {
            const blockedDate = await blockedDateService.addDate(req.body);
            console.log(blockedDate);
            res.json({
                success: true,
                message: "Date successfully blocked"
            });
        } catch (error) {
            next(error);
        }
    },
    updateBlockedDate: async (req, res, next) => {
        try {
            const updatedBlockedDate = await blockedDateService.updateDate(req.body);
            console.log(updatedBlockedDate);
            res.json({
                success: true,
                message: "Blocked date successfully updated"
            });
        } catch (error) {
            next(error)
        }
    },
    disableBlockedDate: async (req, res, next) => {
        try {
            await blockedDateService.disableDate(req.body);
            res.json({
                success: true,
                message: "Blocked date successfully disabled"
            });
        } catch (error) {
            next(error);
        }
    },
    listAllBlockedDates: async (req, res, next) => {
        try {
            const blockedDates = await blockedDateService.listAllDates(req.body);
            res.json({
                success: true,
                blockedDates
            });
        } catch (error) {
            next(error);
        }
    },
    listOneBlockedDate: async (req, res, next) => {
        try {
            const blockedDate = await blockedDateService.listOneDate(req.body);
            res.json({
                success: true,
                blockedDate
            });
        } catch (error) {
            next(error);
        }
    }
};

export default BlockedDateController;
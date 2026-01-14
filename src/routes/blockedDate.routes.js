import express from 'express';
import auth from '../middlewares/auth.middleware.js';
import BlockedDateController from '../controllers/blockedDate.controller.js';

const blockedDateRouter = express.Router();

blockedDateRouter.post('/create', auth, BlockedDateController.createBlockedDate);
blockedDateRouter.post('/update', auth, BlockedDateController.updateBlockedDate);
blockedDateRouter.post('/disable', auth, BlockedDateController.disableBlockedDate);
blockedDateRouter.get('/list', BlockedDateController.listAllBlockedDates);
blockedDateRouter.post('/single', BlockedDateController.listOneBlockedDate);

export default blockedDateRouter;
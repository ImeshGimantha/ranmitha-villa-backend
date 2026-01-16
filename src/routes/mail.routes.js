import express from 'express';
import userAuth from '../middlewares/userAuth.middleware.js';
import MailController from '../controllers/mail.controller.js';

const mailRouter = express.Router();

mailRouter.post('/confirm', userAuth, MailController);

export default mailRouter;
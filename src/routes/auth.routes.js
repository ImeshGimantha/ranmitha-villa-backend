import express from 'express';
import UserController from '../controllers/auth.controller.js';

const userRouter = express.Router();

userRouter.post('/admin', UserController.login);

export default userRouter;
import express from 'express';
import AuthController from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/admin', AuthController.login);

export default authRouter;
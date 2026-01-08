import express from 'express';
import UserController from '../controllers/user.controller.js';
import userAuth from '../middlewares/userAuth.middleware.js';
import auth from '../middlewares/auth.middleware.js';

const userRouter = express.Router();

userRouter.post('/register', UserController.registerUser);
userRouter.post('/update', userAuth, UserController.updateUser);
userRouter.post('/remove', auth, UserController.removeUser);
userRouter.get('/list', UserController.getUsers);
userRouter.post ('/single', UserController.getOneUser);

export default userRouter;
import userRepository from "../repositories/user.repository.js";
import { AppError } from "../utils/errorHandler.js";
import validator from 'validator';
import jwt from 'jsonwebtoken';

class UserService {
    async register(body) {
        try {
            const { user_id, firstname, lastname, email, country, mobile, urlHash } = body;
            
            if (await userRepository.checkExists(email)) {
                // if user exists, don't register that user again. just make booking or redirect to site
                // if continue to booking process, check current url and make condition
                if (urlHash === "booking") return null;
                throw new AppError("User already exists", 400);
            }
    
            if (!validator.isEmail(email)) throw new AppError("Enter valid email address", 400);
    
            const newUser = {
                user_id,
                firstname,
                lastname,
                email,
                country,
                mobile: Number(mobile)
            };
    
            const user = await userRepository.register(newUser);
            return this.createUserToken(user._id);
        } catch (error) {
            throw new AppError(`Can't register user: ${error.message}`, 500);
        }
    }

    createUserToken(id) {
        return jwt.sign({id}, process.env.JWT_SECRET);
    }

    async update(body) {
        try {
            const { userId, firstname, lastname, mobile } = body;
    
            const user = await userRepository.getOne(userId);
            
            user['firstname'] = firstname;
            user['lastname'] = lastname;
            user['mobile'] = mobile;
    
            return await userRepository.update(user);
        } catch (error) {
            throw new AppError(`Can't update user: ${error.message}`, 500);
        }
    }

    async remove(body) {
        try {
            const { userId } = body;
    
            if (!userId) throw new AppError("User ID not found", 400);
    
            return await userRepository.delete(userId);
        } catch (error) {
            throw new AppError(`Can't remove user: ${error.message}`, 500);
        }
    }

    async getUsers() {
        try {
            return await userRepository.getAll();
        } catch (error) {
            throw new AppError(`Can't fetch users: ${error.message}`, 500);
        }
    }

    async getUser(body) {
        try {
            const { userId } = body;
    
            if (!userId) throw new AppError("User ID not found", 400);
    
            return await userRepository.getOne(userId);
        } catch (error) {
            throw new AppError(`Can't fetch user: ${error.message}`, 500);
        }
    }
}

export default new UserService;
import userService from "../services/user.service.js";

const UserController = {
    registerUser: async (req, res, next) => {
        try {
            const token = await userService.register(req.body);
            res.json({
                success: true,
                token
            });
        } catch (error) {
            next(error);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            await userService.update(req.body);
            res.json({
                success: true,
                message: "User successfully updated"
            });
        } catch (error) {
            next(error);
        }
    },
    removeUser: async (req, res, next) => {
        try {
            await userService.remove(req.body);
            res.json({
                success: true,
                message: "User successfully removed"
            });
        } catch (error) {
            next(error);
        }
    },
    getUsers: async (req, res, next) => {
        try {
            const users = await userService.getUsers();
            res.json({
                success: true,
                users
            });
        } catch (error) {
            next(error);
        }
    },
    getOneUser: async (req, res, next) => {
        try {
            const user = await userService.getUser(req.body);
            res.json({
                success: true,
                user
            });
        } catch (error) {
            next(error);
        }
    }
};

export default UserController;
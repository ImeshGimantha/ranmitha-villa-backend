import authService from "../services/auth.service.js";

const AuthController = {
    login: async (req, res) => {
        try {
            const { token } = await authService.authenticateUser(req.body);
            if (token) {
                res.status(200).json({
                    success: true,
                    token
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "Invalid Credentials"
                });
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
};

export default AuthController;
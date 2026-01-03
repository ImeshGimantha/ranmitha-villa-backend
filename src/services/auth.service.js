import jwt from 'jsonwebtoken';

const authService =  {
    authenticateUser: async (userData) => {
        const { username, password } = userData;

        const user = {
            username: process.env.USERNAME,
            password: process.env.PASSWORD
        };
        if (!user) {
            throw new Error('Invalid Username or Password');
        }
        if (username === user.username && password === user.password) {
            const token = jwt.sign(username +  password, process.env.JWT_SECRET);
            return { token };
        }
        return { token: false };
    }
};

export default authService;
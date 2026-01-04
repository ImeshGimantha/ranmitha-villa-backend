import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const { token } = req.headers;
    
        if (!token) {
            return res.json({
                success: false,
                message: "Unauthorized Login"
            });
        }
    
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
        if (decodedToken !== process.env.USERNAME + process.env.PASSWORD) {
            return res.json({
                success: false,
                message: "Username or Password is Invaild"
            });
        }
    
        next();
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
};

export default auth;
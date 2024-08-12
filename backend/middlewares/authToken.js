import jwt from 'jsonwebtoken';
import { User } from '../models/User.model.js';

const authToken = async (req, res, next) => {
    const token = req.cookies.token; // Only use token from cookies
    if (!token) {
        return res.status(403).json({ message: "No token found" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY); // Verify the token
        req.user = await User.findById(decoded.id).select('-password'); // Fetch user data from database and attach to req.user
        if (!req.user) {
            return res.status(404).json({ message: "User not found" });
        }
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
};

export default authToken;

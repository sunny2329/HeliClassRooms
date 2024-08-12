import jwt from 'jsonwebtoken'
import { User } from '../models/User.model.js';



const isAuthPrincipal = async (req, res, next) => {
    console.log(req.cookies.token);
    const token = req.cookies.token || req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token found." });
    }
    try {
        //! Verify the token
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findById(decoded.id);
        if (!user || user.role !== 'principal') {
            return res.status(403).json({ message: "Access denied. User is not a principal" });
        }
        //! Attach user information to request object
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}

export default isAuthPrincipal;
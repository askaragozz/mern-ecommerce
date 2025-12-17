import jwt from 'jsonwebtoken';
import User from '../../models/user.model.js';
import { JWT_ACCESS_KEY } from '../../config/env.js';

export const requireAuth = async (req, res, next) => {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(accessToken, JWT_ACCESS_KEY);
        const user = await User.findById(decoded.id);
        req.user = { id: user._id, role: user.role };
        next();
    } catch (error) {
        return res.status(401).json({ message: `Invalid or expired token, Error => ${error}`});
    }
}
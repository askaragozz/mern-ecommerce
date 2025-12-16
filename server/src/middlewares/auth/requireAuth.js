import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: `Invalid or expired token, Error => ${error}`});
    }
}
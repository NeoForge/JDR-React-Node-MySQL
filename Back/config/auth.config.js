import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.header("token");
    if (!token) {
        return res.status(401).json({ message: "User's not authenticated" });
    }
    try {
        const decoded = jwt.verify(token, "userLoginStringForToken");
        req.user = decoded.user;
        next();
    } catch (e) {
        res.status(500).send({ message: "Invalid Token" + e });
    }
};

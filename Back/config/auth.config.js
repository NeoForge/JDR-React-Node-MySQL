import jwt from 'jsonwebtoken';
const JWT_Secret = 'secret';

//Verify the token and add the user id to the request if the token is valid and add an option to have only admin access

export const Auth = (req, res, next) => {
    VerifyToken(false,req, res, next);
}
export const AuthAdmin = (req, res, next) => {
    VerifyToken(true,req, res, next);
}
const VerifyToken = (admin,req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({message: "No token provided"});
    }
    jwt.verify(token, JWT_Secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({message: "Unauthorized"});
        }
        req.userId = decoded.id;
        req.isAdmin = decoded.isAdmin;
        if(admin && !req.isAdmin){
            return res.status(401).json({message: "Unauthorized"});
        }
        next();
    });
}
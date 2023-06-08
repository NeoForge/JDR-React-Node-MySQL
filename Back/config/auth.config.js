import jwt from 'jsonwebtoken';

const JWT_Secret = 'secret';
const JWT_Secret_Admin = 'secret_admin';

export const auth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }
    let decoded = verifyToken(token);
    if (decoded) {
        req.userId = decoded.id;
        next();
    }
    else {
        decoded = verifyTokenAdmin(token);
        if (decoded) {
            req.userId = decoded.id;
            req.isAdmin = true;
            next();
        }
        else {
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
        }
    }
}

export const authAdmin = (req, res, next) => {
    //Token in Authorization header
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }
    let decoded = verifyTokenAdmin(token);
    if (decoded) {
        req.userId = decoded.id;
        req.isAdmin = true;
        next();
    }
    else {
        return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
    }
}

const verifyToken = (token) => {
    return jwt.verify(token, JWT_Secret, (err, decoded) => {
        if (err) {
            console.log(err);
            return false;
        }
        return decoded;
    });
}

const verifyTokenAdmin = (token) => {
    return jwt.verify(token, JWT_Secret_Admin, (err, decoded) => {
        if (err) {
            console.log(err);
            return false;
        }
        return decoded;
    });
}
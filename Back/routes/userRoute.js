import UserController from '../controllers/userController.js';
import {auth, authAdmin} from "../config/auth.config.js";

export const userRoutes = (app) => {
    app.post('/register', UserController.register);
    app.post('/login', UserController.login);
    app.get('/users',authAdmin, UserController.getAllUser);
    app.get('/users/:id',auth,UserController.getOneById);
    app.get('/users/email/:email',auth,UserController.getOneByMail);
    app.put('/users/:id',auth, UserController.updateOneById);
    app.delete('/users/:id',authAdmin, UserController.deleteOneById);
};
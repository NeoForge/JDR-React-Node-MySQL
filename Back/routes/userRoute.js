import UserController from '../controllers/userController.js';
import { Auth, AuthAdmin } from "../config/auth.config.js";

export const userRoutes = (app) => {
    app.post('/register', UserController.register);
    app.post('/login', UserController.login);
    app.get('/users', AuthAdmin, UserController.getAllUser);
    app.get('/users/:id', Auth, UserController.getOneById);
    app.get('/users/email/:email', AuthAdmin, UserController.getOneByMail);
    app.get('/user/campaigns/:id', Auth, UserController.getAllCampaignFromUser);
    app.put('/users/:id', Auth, UserController.updateOneById);
    app.delete('/users/:id', AuthAdmin, UserController.deleteOneById);
};
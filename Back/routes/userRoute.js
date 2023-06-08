import UserController from '../controllers/userController.js';

export const userRoutes = (app) => {
    app.post('/register', UserController.register);
    app.post('/login', UserController.login);
    app.get('/users', UserController.getAllUser);
    app.get('/users/:id',UserController.getOneById);
    app.get('/users/email/:email',UserController.getOneByMail);
    app.put('/users/:id', UserController.updateOneById);
    app.delete('/users/:id', UserController.deleteOneById);
};
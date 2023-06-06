import { userRoutes } from './userRoute.js';

export const routeLoader = (app) => {
    userRoutes(app);
};
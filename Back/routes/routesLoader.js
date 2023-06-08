import { userRoutes } from './userRoute.js';
import { campaignRoutes } from './campaignRoute.js';
export const routeLoader = (app) => {
    userRoutes(app);
    campaignRoutes(app);
};
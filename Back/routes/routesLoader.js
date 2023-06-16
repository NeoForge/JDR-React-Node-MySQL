import { userRoutes } from './userRoute.js';
import { campaignRoutes } from './campaignRoute.js';
import { playerCharacterRoutes } from './playerCharacterRoutes.js';
import { statRoutes } from './statRoute.js';
import { skillRoutes } from './skillRoute.js';
import { itemRoutes } from './itemRoute.js';
export const routeLoader = (app) => {
    userRoutes(app);
    campaignRoutes(app);
    playerCharacterRoutes(app);
    statRoutes(app);
    skillRoutes(app);
    itemRoutes(app);
};
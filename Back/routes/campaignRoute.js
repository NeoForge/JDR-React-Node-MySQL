import CampaignController from "../controllers/campaignController.js";
import {Auth, AuthAdmin} from "../config/auth.config.js";

export const campaignRoutes = (app) => {
    app.get('/campaigns/GetByGameMaster/:id', CampaignController.getCampaignsByGameMasterId);
    app.get('/campaigns/GetByPlayer/:id',CampaignController.getCampaignsByUserId);
    app.get('/campaigns',CampaignController.getAllCampaigns);
    app.get('/campaigns/:id',CampaignController.getCampaignById);
    app.post('/campaigns',Auth,CampaignController.createCampaign);
    app.put('/campaigns/:id', CampaignController.updateCampaign);
    app.delete('/campaigns/:id', CampaignController.deleteCampaign);


}

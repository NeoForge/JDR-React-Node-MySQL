import CampaignController from "../controllers/campaignController.js";
import {auth} from "../config/auth.config.js";

export const campaignRoutes = (app) => {
    app.get('/campaigns',auth,CampaignController.getAllCampaigns);
    app.get('/campaigns/:id',auth,CampaignController.getCampaignById);
    app.post('/campaigns',auth,CampaignController.createCampaign);
    app.put('/campaigns/:id',auth, CampaignController.updateCampaign);
    app.delete('/campaigns/:id',auth, CampaignController.deleteCampaign);
    app.get('/campaigns/GetByGameMaster',auth, CampaignController.getCampaignsByGameMasterId);
    app.get('/campaigns/GetByPlayer', auth,CampaignController.getCampaignsByUserId);

}
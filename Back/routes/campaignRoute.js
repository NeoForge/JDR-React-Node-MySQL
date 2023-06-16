import CampaignController from "../controllers/campaignController.js";
import { Auth, AuthAdmin } from "../config/auth.config.js";

export const campaignRoutes = (app) => {
    app.get('/campaigns/GetByGameMaster/:id', Auth, CampaignController.getCampaignsByGameMasterId);
    app.get('/campaigns/GetByPlayer/:id', Auth, CampaignController.getCampaignsByUserId);
    app.get('/campaigns/all', Auth, CampaignController.getAllCampaigns);
    app.get('/campaigns/:id', Auth, CampaignController.getCampaignById);
    app.post('/campaigns/create', Auth, CampaignController.createCampaign);
    app.put('/campaigns/update/:id', Auth, CampaignController.updateCampaign);
    app.delete('/campaigns/delete/:id', Auth, CampaignController.deleteCampaign);


}

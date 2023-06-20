import {models} from '../data/sequelize.js';
import playercharacter from "../models/playercharacter.js";

const Campaign = models.campaign;
const CampaignUser = models.campaign_user;


class CampaignController {

    //Create a new campaign in the database , the user must be logged in and game_master_id must be the same as the user id
    async createCampaign(req, res) {
        try {
            const {campaign_name, description} = req.body;
            const userId = req.userId;
            const newCampaign = await Campaign.create({
                campaign_name: campaign_name,
                description: description,
                date_created: new Date(),
                game_master_id: userId
            });
            res.status(201).json(newCampaign);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    //Get all campaigns from the database
    async getAllCampaigns(req, res) {
        try {
            const campaigns = await Campaign.findAll();
            res.status(200).json(campaigns);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    //Get a campaign from the database by its id
    async getCampaignById(req, res) {
        try {
            const campaignId = req.params.id;
            const campaign = await Campaign.findByPk(campaignId);
            res.status(200).json(campaign);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    //Update a campaign in the database by its id, the user must be logged in and game_master_id must be the same as the user id or the user must be an admin
    async updateCampaign(req, res) {
        try {
            const campaignId = req.params.id;
            const {campaign_name, description} = req.body;
            const userId = req.userId;
            const isAdmin = req.isAdmin;
            const campaign = await Campaign.findByPk(campaignId);
            if (campaign.game_master_id === userId || isAdmin) {
                campaign.campaign_name = campaign_name;
                campaign.description = description;
                await campaign.save();
                res.status(200).json(campaign);
            } else {
                res.status(403).json({message: "You are not allowed to update this campaign"});
            }
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    //Delete a campaign from the database by its id, the user must be logged in and game_master_id must be the same as the user id or the user must be an admin
    async deleteCampaign(req, res) {
        try {
            const campaignId = req.params.id;
            const userId = req.userId;
            const isAdmin = req.isAdmin;
            const campaign = await Campaign.findByPk(campaignId);
            if (campaign.game_master_id === userId || isAdmin) {
                await campaign.destroy();
                res.status(200).json({message: "Campaign deleted"});
            } else {
                res.status(403).json({message: "You are not allowed to delete this campaign"});
            }
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    //Get all campaigns from the database by the game_master_id
    async getCampaignsByGameMasterId(req, res) {
        try {
            const gameMasterId = req.params.id;
            const campaigns = await Campaign.findAll({where: {game_master_id: gameMasterId}});
            res.status(200).json(campaigns);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    //Get all campaigns from the database by the user_id
    async getCampaignsByUserId(req, res) {
        try {
            const userId = req.params.id;
            const campaigns = await CampaignUser.findAll({where: {user_id: userId}});
            res.status(200).json(campaigns);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    async getAllCharacterFromCampaign(req, res) {
        try {
            const campaignId = req.params.id;
            const characters = await Campaign.findByPk(campaignId, {
                include: {
                    model: models.playercharacter,
                    as: 'playercharacters'
                }
            });
            res.status(200).json(characters);
        } catch (e) {
            res.status(400).json({message: e.message});
        }
    }

    async getAllUserFromCampaign(req, res) {
        try {
            const campaignId = req.params.id;
            const campaignUsers = await Campaign.findByPk(campaignId,
                {
                    include: [{
                        model: models.campaign_user, as: 'campaign_users', attributes: ['user_id'],
                        include: {model: models.user, as: 'user', attributes: ['username', 'email']}
                    }, 
                    {
                        model: models.user, as: 'game_master', attributes: ['user_id', 'username', 'email']
                    }]
                });
            res.status(200).json(campaignUsers);
        } catch (e) {
            res.status(400).json({message: e.message});
        }
    }
}

export default new CampaignController();

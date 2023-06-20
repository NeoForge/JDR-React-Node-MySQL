import { models } from "../data/sequelize.js";
const PlayerCharacter = models.playercharacter;
const Campaign = models.campaign;

class PlayerCharacterController {
    async createCharacter(req, res) {
        try {
            const { campaign_id, character_first_name, character_last_name, character_age, character_affinity } = req.body;
            const userId = req.userId;
            const newCharacter = await PlayerCharacter.create({
                user_id: userId,
                campaign_id: campaign_id,
                character_first_name: character_first_name,
                character_last_name: character_last_name,
                character_age: character_age,
                character_affinity: character_affinity,
                character_level: 1,
                character_money: 0,
            })
            res.status(201).json(newCharacter);
        } catch (error) {
            res.status(400).json({ message: error.message })
        }

    }

    async getAllCharacter(req, res) {
        try {
            const character = await PlayerCharacter.findAll();
            res.status(200).json(character);
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    async getCharacterById(req, res) {
        try {
            const character_id = req.params.id;
            const character = await PlayerCharacter.findByPk(character_id);
            res.status(200).json(character)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }

    }

    async updateCharacter(req, res) {
        try {
            const character_id = req.params.id;
            const { campaign_id, character_first_name, character_last_name, character_age, character_affinity, character_level, character_money } = req.body;
            const userId = req.userId;
            const isAdmin = req.isAdmin;
            const character = await PlayerCharacter.findByPk(character_id);
            const campaign = await Campaign.findByPk(campaign_id)
            if (campaign.game_master_id === userId || isAdmin) {
                character.character_first_name = character_first_name;
                character.character_last_name = character_last_name;
                character.character_age = character_age;
                character.character_affinity = character_affinity;
                character.character_level = character_level;
                character.character_money = character_money;
                await character.save();
                res.status(200).json(character);
            } else {
                res.status(403).json({ message: "You are not allowed to update this !" })
            }
            res.status(200).json(character);
        } catch (error) {
            res.status(400).json({ message: error.message });

        }
    }

    async deleteCharacter(req, res) {
        try {
            const character_id = req.params.id;
            const { campaign_id } = req.body;
            const userId = req.userId;
            const isAdmin = req.isAdmin;
            const character = await PlayerCharacter.findByPk(character_id);
            const campaign = await Campaign.findByPk(campaign_id)
            if (campaign.game_master_id === userId || isAdmin || character.user_id === userId) {
                await character.destroy();
                res.status(200).json({ message: "Character deleted" });
            } else {
                res.status(403).json({ message: "You are not allowed to delete this campaign" });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }

    }


    async getAllCharacterFromUser(req, res) {
        try {
            const userId = req.userId;
            const character = await PlayerCharacter.findAll({
                where: {
                    user_id: userId
                }
            });
            res.status(200).json(character);
        } catch (error) {
            res.status(400).json({ message: error.message });

        }
    }

    async getAllCharacterFromCampaign(req, res) {
        try {
            const campaignId = req.params.id;
            const character = await PlayerCharacter.findAll({
                where: {
                    campaign_id: campaignId
                }
            });
            res.status(200).json(character)
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getCharFromUserAndCampaign(req, res) {
        try {
            const userId = req.params.id;
            const {campaignId} = req.body;
            const characterFromUserCampaign = await PlayerCharacter.findAll({
                where: {
                    user_id: userId,
                    campaign_id: campaignId,
                }
            })
            res.status(200).json(characterFromUserCampaign)
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    }

    async updateCharForPlayer(req, res) {
        try {
            const userId = req.userId;
            const characterId = req.params.id;
            const character = await PlayerCharacter.findByPk(characterId);
            const { character_money, character_level } = req.body;
            if (character.user_id === userId) {
                character.character_level = character_level;
                character.character_money = character_money;
                character.save();
                res.status(200).json(character);
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllTheShitFromChar(req, res) {
        try {
            const characterId = req.params.id;
            const characterShit = await PlayerCharacter.findAll({
                where: {character_id: characterId},
                include: [{
                    model: models.character_stat, as: 'character_stats',
                    include: {
                        model: models.stat, as: 'stat', attribute: ['stat_abrv'
                        ]
                    }
                }, {
                    model: models.character_skill, as: 'character_skills',
                    include: {
                        model: models.skill, as: 'skill', attributes: ['skill_name', 'skill_type', 'skill_level', 'skill_description']
                    }
                }, {
                    model: models.equipment, as: 'equipments',
                    include: {
                        model: models.item, as: 'item', attributes: ['item_name', 'item_type', 'item_rarity', 'item_description', 'item_effect']
                    }
                }, {
                    model: models.character_item, as: 'character_items',
                    include: {
                        model: models.item, as: 'item', attributes: ['item_name', 'item_type', 'item_rarity', 'item_description', 'item_effect', 'item_price']
                    }
                },
                ]
            })
            res.status(200).json(characterShit)
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    }
}


export default new PlayerCharacterController()
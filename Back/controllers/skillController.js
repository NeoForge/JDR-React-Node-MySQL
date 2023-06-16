import { models } from "../data/sequelize.js";
const Skill = models.skill;
const CharacterSkill = models.character_skill;

class SkillsController {
    async createSkill(req, res) {
        try {
            const { skill_name, skill_description, skill_type, skill_Level, skill_Effect } = req.body;
            const newSkill = await Skill.create({
                skill_name: skill_name,
                skill_description: skill_description,
                skill_type: skill_type,
                skill_Level: skill_Level,
                skill_Effect: skill_Effect,
            })
            res.status(201).json(newSkill);
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    async getAllSkill(req, res) {
        try {
            const skill = await Skill.findAll();
            res.status(200).json(stat);
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    async getSkillById(req, res) {
        try {
            const skill_id = req.params.id;
            const skill = await Skill.findByPk(skill_id);
            res.status(200).json(skill)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    async updateSkill(req, res) {
        try {
            const skill_id = req.params.id;
            const { skill_name, skill_description, skill_type, skill_Level, skill_Effect } = req.body;
            const skill = await Skill.findByPk(skill_id);
            skill.skill_name = skill_name,
                skill.skill_description = skill_description,
                skill.skill_type = skill_type,
                skill.skill_Level = skill_Level,
                skill.skill_Effect = skill_Effect,
                await skill.save();
            res.status(200).json(skill);
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    async deleteSkill(req, res) {
        try {
            const skill_id = req.params.id;
            const skill = await Skill.findByPk(skill_id);
            await skill.destroy()
            res.status(200).json({ message: "Skill deleted" })
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async addCharSkill(req, res) {
        try {
            const characterId = req.params.id;
            const skillId = req.body;
            const newCharSkill = await CharacterSkill.create({
                character_id: characterId,
                skill_id: skillId,
            })
            res.status(200).json(newCharSkill);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllCharSkill(req, res) {
        try {
            const characterId = req.params.id;
            const characterSkill = await CharacterSkill.findAll({
                where: {
                    character_id: characterId
                }
            });
            res.status(200).json(characterSkill);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteCharSkill(req, res) {
        try {
            const characterSkillId = req.params.id;
            const characterSkill = await CharacterSkill.findByPk(characterSkillId);
            await characterSkill.destroy();
            res.status(200).json({ message: "Character skill deleted" })
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }


}

export default new SkillsController();
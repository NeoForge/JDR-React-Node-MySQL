import { models } from "../data/sequelize.js";
const Stat = models.stat;
const CharacterStat = models.character_stat;

class StatsController {
    async createStat(req, res) {
        try {
            const { stat_name, stat_abrv } = req.body;
            const newStat = await Stat.create({
                stat_name: stat_name,
                stat_abrv: stat_abrv,
            })
            res.status(201).json(newStat);
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    async getAllStat(req, res) {
        try {
            const stat = await Stat.findAll();
            res.status(200).json(stat);
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    async getStatById(req, res) {
        try {
            const stat_id = req.params.id;
            const stat = await Stat.findByPk(stat_id);
            res.status(200).json(stat)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    async updateStat(req, res) {
        try {
            const stat_id = req.params.id;
            const { stat_name, stat_abrv } = req.body;
            const stat = await Stat.findByPk(stat_id);
            stat.stat_name = stat_name;
            stat.stat_abrv = stat_abrv;
            await stat.save();
            res.status(200).json(stat);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteStat(req, res) {
        try {
            const stat_id = req.params.id;
            const stat = await Stat.findByPk(stat_id);
            await stat.destroy();
            res.status(200).json({ message: "Stat deleted" })
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async addStatToPlayer(req, res) {
        try {
            const characterId = req.params.id;
            const { statId, value } = req.body;
            const newCharStat = await CharacterStat.create({
                character_id: characterId,
                stat_id: statId,
                value: value,
            });
            res.status(200).json(newCharStat);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateCharUpdate(req, res) {
        try {
            const characterStatId = req.params.id;
            const statValue = req.body;
            const stat = await CharacterStat.findByPk(characterStatId);
            stat.value = statValue;
            await stat.save();
            res.status(200)
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllCharStat(req, res) {
        try {
            const characterId = req.params.id;
            const characterStat = await CharacterStat.findAll({
                where: {
                    character_id: characterId
                }
            });
            res.status(200).json(characterStat);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteCharStat(req, res) {
        try {
            const characterStatId = req.params.id;
            const characterStat = await CharacterStat.findByPk(characterStatId);
            await characterStat.destroy();
            res(200).json({ message: "Character stat deleted" })
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }


}

export default new StatsController();


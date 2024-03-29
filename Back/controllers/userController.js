import { models } from '../data/sequelize.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import campaign_user from "../models/campaign_user.js";
const JWT_Secret = 'secret';
const User = models.user;
const CampaignUser = models.campaign_user;

class UserController {
    async register(req, res) {
        try {
            const { username, email, password } = req.body;
            const user = await User.findOne({
                where: {
                    [Op.or]: [
                        { username: username },
                        { email: email }
                    ]
                }
            });
            if (user) {
                res.status(409).json({ message: "User already exists" });
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = await User.create({
                    username: username,
                    email: email,
                    password: hashedPassword,
                    isAdmin: false
                });
                const token = jwt.sign({ id: newUser.user_id, isAdmin: newUser.isAdmin }, JWT_Secret);
                res.status(200).json({ token: token });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email: email } });
            if (!user) {
                res.status(404).json({ message: "User not found" });
            } else {
                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    res.status(401).json({ message: "Incorrect password" });
                } else {
                    const token = jwt.sign({ id: user.user_id, isAdmin: user.isAdmin }, JWT_Secret);
                    res.status(200).json({ token: token });
                }
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllUser(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getOneById(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getOneByMail(req, res) {
        try {
            const user = await User.findOne({ where: { email: req.params.email } });
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateOneById(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (user) {
                await user.update(req.body);
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteOneById(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (user) {
                await user.destroy();
                res.status(200).json({ message: "User deleted" });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllCampaignFromUser(req, res){
        try {
            const userId = req.params.id;
            const usersCampaigns = await CampaignUser.findAll({
                where: {user_id: userId},
                include: [{
                    model: models.campaign, as: 'campaign',
                    include: {
                        model: models.user, as: 'game_master', attributes:
                            ['username', 'email']
                    }
                }]
            })
            res.status(200).json(usersCampaigns)
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    }

};

export default new UserController();

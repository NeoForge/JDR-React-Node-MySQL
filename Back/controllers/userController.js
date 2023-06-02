const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {sequelize} = require('../data/sequelize');
const {Op} = require('sequelize');
const JWT_Secret = 'secret';
const JWT_Secret_Admin = 'secret_admin';

module.exports = class {
    async register(req, res) {
        try {
            const {username, email, password, isAdmin} = req.body;
            const user = await User.findOne({
                where: {
                    [Op.or]: [
                        {username: username},
                        {email: email}
                    ]
                }
            });
            if (user) {
                res.status(409).json({message: "User already exists"});
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = await User.create({
                    username: username,
                    email: email,
                    password: hashedPassword,
                    isAdmin: isAdmin
                });
                res.status(201).json(newUser);
            }
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({where: {email: email}});
            if (!user) {
                res.status(404).json({message: "User not found"});
            } else {
                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    res.status(401).json({message: "Incorrect password"});
                } else {
                    if(user.isAdmin)
                    {
                        const token = jwt.sign({id: user.user_id}, JWT_Secret_Admin);
                        res.status(200).json({token: token});
                    }
                    const token = jwt.sign({id: user.user_id}, JWT_Secret);
                    res.status(200).json({token: token});
                }
            }
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    async getAllUser(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    async getOneById(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({message: "User not found"});
            }
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    async getOneByMail(req, res) {
        try{
            const user = await User.findOne({where: {email: req.params.email}});
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({message: "User not found"});
            }
        }
        catch(error){
            res.status(400).json({message: error.message});
        }
    }

    async updateOneById(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (user) {
                await user.update(req.body);
                res.status(200).json(user);
            } else {
                res.status(404).json({message: "User not found"});
            }
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    async deleteOneById(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (user) {
                await user.destroy();
                res.status(200).json({message: "User deleted"});
            } else {
                res.status(404).json({message: "User not found"});
            }
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
}

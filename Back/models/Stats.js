const {DataTypes} = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
    sequelize.define('Stats', {
        // The following specification of the 'id' attribute could be omitted
        // since it is the default.
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUIDV4
        },
        Force: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        Agilite: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        Intelligence: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        Sagesse: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        Charisme: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        Constitution: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        Chance: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        Perception: {
            allowNull: false,
            type: DataTypes.INTEGER,
        }
    });
};
const {DataTypes} = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
    sequelize.define('Personnages', {
        // The following specification of the 'id' attribute could be omitted
        // since it is the default.
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUIDV4
        },
        nom: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        prenom: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        age: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        Affinite: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        Niveau: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        HP: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        MP: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        Exp: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        Monnaie: {
            allowNull: false,
            type: DataTypes.INTEGER,
        }
    });
};
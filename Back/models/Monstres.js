import { DataTypes } from 'sequelize';

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
export const Monstres = (sequelize) => {
    sequelize.define('Monstres', {
        // The following specification of the 'id' attribute could be omitted
        // since it is the default.
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING
        },
        nom: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        description: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        niveau: {
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
        Attaque: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        Defense: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
    });
};
import e from 'cors';
import { DataTypes } from 'sequelize';
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
export const Objets = (sequelize) => {
    sequelize.define('Objets', {
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
        type: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        Effets: {
            allowNull: false,
            type: DataTypes.STRING,//"FOR:5,AGI:-8"
        }
    });
};
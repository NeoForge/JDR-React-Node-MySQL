import { DataTypes } from 'sequelize';

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
export const Inventaires = (sequelize) => {
    sequelize.define('Inventaires', {
        // The following specification of the 'id' attribute could be omitted
        // since it is the default.
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING
        },
        quantite: {
            allowNull: false,
            type: DataTypes.INTEGER,
        }
    });
};
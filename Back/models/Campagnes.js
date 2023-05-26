import { DataTypes } from 'sequelize';
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
export const Campagnes = (sequelize) => {
    sequelize.define('Campagnes', {
        // The following specification of the 'id' attribute could be omitted
        // since it is the default.
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING
        },
        titre: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
            validate: {
                // We require usernames to have length of at least 3, and
                // only use letters, numbers and underscores.
                is: /^\w{3,}$/
            }
        },
        description: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        dateDebut: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        id_MJ: {
            allowNull: false,
            type: DataTypes.STRING,
        }
    });
};
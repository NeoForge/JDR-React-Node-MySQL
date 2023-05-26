import { DataTypes } from 'sequelize';

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
export const Utilisateurs = (sequelize) => {
    sequelize.define('Utilisateurs', {
        // The following specification of the 'id' attribute could be omitted
        // since it is the default.
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
            validate: {
                // We require usernames to have length of at least 3, and
                // only use letters, numbers and underscores.
                is: /^\w{3,}$/
            }
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                // We require passwords to have length of at least 8
                len: [8, 100]
            }
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        isAdmin: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
};
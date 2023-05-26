const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
    sequelize.define('Inventaires', {
        // The following specification of the 'id' attribute could be omitted
        // since it is the default.
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUIDV4
        },
        quantite: {
            allowNull: false,
            type: DataTypes.INTEGER,
        }
    });
};
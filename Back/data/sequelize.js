const {Sequelize} = require('sequelize');
const {initModels} = require("../models/init-models");
const sequelize = new Sequelize("jdr_project", "root", "", {
    host: "localhost",
    dialect: "mysql"
});

initModels(sequelize);
//Start the connection to the database
async function startDBConnection() {
    try {
        // Establish the database connection
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        // Synchronize the models with the database
        await sequelize.sync();
        console.log('Models synchronized with the database.');

        // Start your application
        // ...
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
module.exports = {startDBConnection, sequelize};

import {Sequelize} from "sequelize";

const sequelize = new Sequelize('project_jdr', 'root', '', {
    host: 'localhost',
    dialect: "mysql"
});
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


const modelDefiners = [
    import('./models/Utilisateurs'),
    import('./models/Campagnes'),
    import('./models/Personnages'),
    import("./models/Objets"),
    import("./models/Monstres"),
    import("./models/Stats"),
    import("./models/Inventaires")
];
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

let association = import('./sequelizeAssociation');
association(sequelize);

await sequelize.sync({ force: true });
console.log("All models were synchronized successfully.");

module.exports = sequelize;
import {Sequelize} from "sequelize";
import {
    Inventaires
} from "../models/Inventaires.js";
import {
    Utilisateurs
} from "../models/Utilisateurs.js";
import {
    Monstres
} from "../models/Monstres.js";
import {
    Campagnes
} from "../models/Campagnes.js";
import {
    Objets
} from "../models/Objets.js";
import {
    Stats
} from "../models/Stats.js";
import {
    Personnages
} from "../models/Personnages.js";
import {
    applyExtraSetup
} from "./sequelizeAssociation.js";

export const sequelize = new Sequelize('project_jdr', 'root', '', {
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
    Utilisateurs,
    Monstres,
    Campagnes,
    Objets,
    Stats,
    Inventaires,
    Personnages
];
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

applyExtraSetup(sequelize);

await sequelize.sync({force: true});
console.log("All models were synchronized successfully.");

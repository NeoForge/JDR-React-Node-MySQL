module.exports = (sequelize) => {
    const { Campagnes,Inventaires,Monstres,Objets,Stats,Personnages,Utilisateurs  } = sequelize.models;

    Campagnes.hasMany(Personnages);
    Personnages.belongsTo(Campagnes);
    Personnages.belongsTo(Utilisateurs);
    Utilisateurs.hasMany(Personnages);
    //------------------------------------------
    Personnages.hasOne(Stats);
    Stats.belongsTo(Personnages);
    //---------------------------------------------
    Personnages.hasMany(Objets);
    Objets.belongsTo(Personnages);

    Inventaires.hasMany(Objets);
    Objets.belongsTo(Inventaires);

    Inventaires.belongsTo(Personnages);
    Personnages.hasMany(Inventaires);

    //--------------------------------------------
    Monstres.hasMany(Objets);
    Objets.belongsTo(Monstres);
}

module.exports = { applyExtraSetup };
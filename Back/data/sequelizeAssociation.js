export const applyExtraSetup = (sequelize) => {
    const { Campagnes,Inventaires,Monstres,Objets,Stats,Personnages,Utilisateurs  } = sequelize.models;

    Campagnes.hasMany(Personnages);
    Personnages.belongsTo(Campagnes);
    Personnages.belongsTo(Utilisateurs);
    Utilisateurs.hasMany(Personnages);
    Utilisateurs.hasMany(Campagnes);
    Campagnes.belongsTo(Utilisateurs);
    //------------------------------------------
    Personnages.hasOne(Stats);
    Stats.belongsTo(Personnages);
    //---------------------------------------------
    Personnages.hasMany(Objets);
    Objets.belongsTo(Personnages);

    Inventaires.hasMany(Objets);
    Objets.hasMany(Inventaires);

    Inventaires.belongsTo(Personnages);
    Personnages.hasMany(Inventaires);

    //--------------------------------------------
    Monstres.hasMany(Objets);
    Objets.hasMany(Monstres);
}


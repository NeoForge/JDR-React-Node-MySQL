export default function(sequelize, DataTypes) {
  return sequelize.define('monster', {
    monster_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    monster_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    monster_hp: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    monster_attack: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'monster',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "monster_id" },
        ]
      },
    ]
  });
};

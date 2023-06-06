export default function(sequelize, DataTypes) {
  return sequelize.define('monster_skill', {
    monster_skill_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    monster_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'monster',
        key: 'monster_id'
      }
    },
    skill_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'skill',
        key: 'skill_id'
      }
    }
  }, {
    sequelize,
    tableName: 'monster_skill',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "monster_skill_id" },
        ]
      },
      {
        name: "fk_monster_skill_monster",
        using: "BTREE",
        fields: [
          { name: "monster_id" },
        ]
      },
      {
        name: "fk_monster_skill_skill",
        using: "BTREE",
        fields: [
          { name: "skill_id" },
        ]
      },
    ]
  });
};

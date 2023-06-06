export default function(sequelize, DataTypes) {
  return sequelize.define('character_skill', {
    character_skill_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    character_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'playercharacter',
        key: 'character_id'
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
    tableName: 'character_skill',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "character_skill_id" },
        ]
      },
      {
        name: "fk_character_skill_character",
        using: "BTREE",
        fields: [
          { name: "character_id" },
        ]
      },
      {
        name: "fk_character_skill_skill",
        using: "BTREE",
        fields: [
          { name: "skill_id" },
        ]
      },
    ]
  });
};

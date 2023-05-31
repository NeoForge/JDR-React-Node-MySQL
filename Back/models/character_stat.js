module.exports = function(sequelize, DataTypes) {
  return sequelize.define('character_stat', {
    character_stat_id: {
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
    stat_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'stat',
        key: 'stat_id'
      }
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'character_stat',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "character_stat_id" },
        ]
      },
      {
        name: "fk_character_stat_character",
        using: "BTREE",
        fields: [
          { name: "character_id" },
        ]
      },
      {
        name: "fk_character_stat_stat",
        using: "BTREE",
        fields: [
          { name: "stat_id" },
        ]
      },
    ]
  });
};

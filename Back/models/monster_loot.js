module.exports = function(sequelize, DataTypes) {
  return sequelize.define('monster_loot', {
    monster_loot_id: {
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
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'item',
        key: 'item_id'
      }
    },
    drop_rate: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'monster_loot',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "monster_loot_id" },
        ]
      },
      {
        name: "fk_monster_loot_monster",
        using: "BTREE",
        fields: [
          { name: "monster_id" },
        ]
      },
      {
        name: "fk_monster_loot_item",
        using: "BTREE",
        fields: [
          { name: "item_id" },
        ]
      },
    ]
  });
};

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('equipment', {
    equipment_id: {
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
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'item',
        key: 'item_id'
      }
    }
  }, {
    sequelize,
    tableName: 'equipment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "equipment_id" },
        ]
      },
      {
        name: "fk_equipment_character",
        using: "BTREE",
        fields: [
          { name: "character_id" },
        ]
      },
      {
        name: "fk_equipment_item",
        using: "BTREE",
        fields: [
          { name: "item_id" },
        ]
      },
    ]
  });
};

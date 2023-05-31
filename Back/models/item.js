module.exports = function(sequelize, DataTypes) {
  return sequelize.define('item', {
    item_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    item_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    item_description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    item_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    item_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    item_effect: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    item_rarity: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'item',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "item_id" },
        ]
      },
    ]
  });
};

export default function(sequelize, DataTypes) {
  return sequelize.define('campaign', {
    campaign_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    campaign_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    date_created: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    date_started: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    game_master_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'campaign',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "campaign_id" },
        ]
      },
      {
        name: "game_master_id",
        using: "BTREE",
        fields: [
          { name: "game_master_id" },
        ]
      },
    ]
  });
};

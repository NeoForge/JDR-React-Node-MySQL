export default function(sequelize, DataTypes) {
  return sequelize.define('playercharacter', {
    character_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    campaign_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'campaign',
        key: 'campaign_id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    character_first_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    character_last_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    character_age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    character_affinity: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    character_level: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    character_money: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'playercharacter',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "character_id" },
        ]
      },
      {
        name: "fk_player_character_campaign",
        using: "BTREE",
        fields: [
          { name: "campaign_id" },
        ]
      },
      {
        name: "fk_player_character_user",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};

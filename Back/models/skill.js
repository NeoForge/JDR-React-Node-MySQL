export default function (sequelize, DataTypes) {
  return sequelize.define('skill', {
    skill_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    skill_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    skill_description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    skill_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    skill_Level: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    skill_Effect: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'skill',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "skill_id" },
        ]
      },
    ]
  });
};

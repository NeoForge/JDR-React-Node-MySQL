const DataTypes = require("sequelize").DataTypes;
const _campaign = require("./campaign");
const _campaign_user = require("./campaign_user");
const _character_item = require("./character_item");
const _character_skill = require("./character_skill");
const _character_stat = require("./character_stat");
const _equipment = require("./equipment");
const _item = require("./item");
const _monster = require("./monster");
const _monster_loot = require("./monster_loot");
const _monster_skill = require("./monster_skill");
const _playercharacter = require("./playercharacter");
const _skill = require("./skill");
const _stat = require("./stat");
const _user = require("./user");




function initModels(sequelize) {
  const campaign = _campaign(sequelize, DataTypes);
  const campaign_user = _campaign_user(sequelize, DataTypes);
  const character_item = _character_item(sequelize, DataTypes);
  const character_skill = _character_skill(sequelize, DataTypes);
  const character_stat = _character_stat(sequelize, DataTypes);
  const equipment = _equipment(sequelize, DataTypes);
  const item = _item(sequelize, DataTypes);
  const monster = _monster(sequelize, DataTypes);
  const monster_loot = _monster_loot(sequelize, DataTypes);
  const monster_skill = _monster_skill(sequelize, DataTypes);
  const playercharacter = _playercharacter(sequelize, DataTypes);
  const skill = _skill(sequelize, DataTypes);
  const stat = _stat(sequelize, DataTypes);
  const user = _user(sequelize, DataTypes);

  campaign_user.belongsTo(campaign, { as: "campaign", foreignKey: "campaign_id"});
  campaign.hasMany(campaign_user, { as: "campaign_users", foreignKey: "campaign_id"});
  playercharacter.belongsTo(campaign, { as: "campaign", foreignKey: "campaign_id"});
  campaign.hasMany(playercharacter, { as: "playercharacters", foreignKey: "campaign_id"});
  character_item.belongsTo(item, { as: "item", foreignKey: "item_id"});
  item.hasMany(character_item, { as: "character_items", foreignKey: "item_id"});
  equipment.belongsTo(item, { as: "item", foreignKey: "item_id"});
  item.hasMany(equipment, { as: "equipments", foreignKey: "item_id"});
  monster_loot.belongsTo(item, { as: "item", foreignKey: "item_id"});
  item.hasMany(monster_loot, { as: "monster_loots", foreignKey: "item_id"});
  monster_loot.belongsTo(monster, { as: "monster", foreignKey: "monster_id"});
  monster.hasMany(monster_loot, { as: "monster_loots", foreignKey: "monster_id"});
  monster_skill.belongsTo(monster, { as: "monster", foreignKey: "monster_id"});
  monster.hasMany(monster_skill, { as: "monster_skills", foreignKey: "monster_id"});
  character_item.belongsTo(playercharacter, { as: "character", foreignKey: "character_id"});
  playercharacter.hasMany(character_item, { as: "character_items", foreignKey: "character_id"});
  character_skill.belongsTo(playercharacter, { as: "character", foreignKey: "character_id"});
  playercharacter.hasMany(character_skill, { as: "character_skills", foreignKey: "character_id"});
  character_stat.belongsTo(playercharacter, { as: "character", foreignKey: "character_id"});
  playercharacter.hasMany(character_stat, { as: "character_stats", foreignKey: "character_id"});
  equipment.belongsTo(playercharacter, { as: "character", foreignKey: "character_id"});
  playercharacter.hasMany(equipment, { as: "equipments", foreignKey: "character_id"});
  character_skill.belongsTo(skill, { as: "skill", foreignKey: "skill_id"});
  skill.hasMany(character_skill, { as: "character_skills", foreignKey: "skill_id"});
  monster_skill.belongsTo(skill, { as: "skill", foreignKey: "skill_id"});
  skill.hasMany(monster_skill, { as: "monster_skills", foreignKey: "skill_id"});
  character_stat.belongsTo(stat, { as: "stat", foreignKey: "stat_id"});
  stat.hasMany(character_stat, { as: "character_stats", foreignKey: "stat_id"});
  campaign.belongsTo(user, { as: "game_master", foreignKey: "game_master_id"});
  user.hasMany(campaign, { as: "campaigns", foreignKey: "game_master_id"});
  campaign_user.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(campaign_user, { as: "campaign_users", foreignKey: "user_id"});
  playercharacter.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(playercharacter, { as: "playercharacters", foreignKey: "user_id"});

  return {
    campaign,
    campaign_user,
    character_item,
    character_skill,
    character_stat,
    equipment,
    item,
    monster,
    monster_loot,
    monster_skill,
    playercharacter,
    skill,
    stat,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

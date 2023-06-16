-- Create the User table
CREATE TABLE User (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN NOT NULL
) ENGINE=InnoDB;

-- Create the Campaign table
CREATE TABLE Campaign (
    campaign_id INT PRIMARY KEY AUTO_INCREMENT,
    campaign_name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    date_created DATE NOT NULL,
    date_started DATE,
    game_master_id INT,
    FOREIGN KEY (game_master_id) REFERENCES User(user_id)
) ENGINE=InnoDB;

-- Create the Campaign_User table
CREATE TABLE Campaign_User (
    campaign_id INT,
    user_id INT,
    FOREIGN KEY (campaign_id) REFERENCES Campaign(campaign_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
) ENGINE=InnoDB;

-- Create the PlayerCharacter table
CREATE TABLE PlayerCharacter (
    character_id INT PRIMARY KEY AUTO_INCREMENT,
    campaign_id INT,
    user_id INT,
    character_first_name VARCHAR(255),
    character_last_name VARCHAR(255),
    character_age INT,
    character_affinity VARCHAR(255),
    character_level INT,
    character_money INT,
    FOREIGN KEY (campaign_id) REFERENCES Campaign(campaign_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
) ENGINE=InnoDB;

-- Create the Stat table
CREATE TABLE Stat (
    stat_id INT PRIMARY KEY AUTO_INCREMENT,
    stat_name VARCHAR(255) NOT NULL,
    stat_abrv VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

-- Create the Character_Stat table
CREATE TABLE Character_Stat (
    character_stat_id INT PRIMARY KEY AUTO_INCREMENT,
    character_id INT,
    stat_id INT,
    value INT,
    FOREIGN KEY (character_id) REFERENCES PlayerCharacter(character_id),
    FOREIGN KEY (stat_id) REFERENCES Stat(stat_id)
) ENGINE=InnoDB;

-- Create the Item table
CREATE TABLE Item (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    item_name VARCHAR(255),
    item_description VARCHAR(255),
    item_price INT,
    item_type VARCHAR(255),
    item_effect VARCHAR(255),
    item_rarity VARCHAR(255)
) ENGINE=InnoDB;

-- Create the Character_Item table
CREATE TABLE Character_Item (
    character_item_id INT PRIMARY KEY AUTO_INCREMENT,
    character_id INT,
    item_id INT,
    quantity INT,
    FOREIGN KEY (character_id) REFERENCES PlayerCharacter(character_id),
    FOREIGN KEY (item_id) REFERENCES Item(item_id)
) ENGINE=InnoDB;

-- Create the Equipment table
CREATE TABLE Equipment (
    equipment_id INT PRIMARY KEY AUTO_INCREMENT,
    character_id INT,
    item_id INT,
    FOREIGN KEY (character_id) REFERENCES PlayerCharacter(character_id),
    FOREIGN KEY (item_id) REFERENCES Item(item_id)
) ENGINE=InnoDB;

-- Create the Skill table
CREATE TABLE Skill (
    skill_id INT PRIMARY KEY AUTO_INCREMENT,
    skill_name VARCHAR(255),
    skill_description VARCHAR(255),
    skill_type VARCHAR(255),
    skill_Level INT,
    skill_Effect VARCHAR(255)
) ENGINE=InnoDB;

-- Create the Character_Skill table
CREATE TABLE Character_Skill (
    character_skill_id INT PRIMARY KEY AUTO_INCREMENT,
    character_id INT,
    skill_id INT,
    FOREIGN KEY (character_id) REFERENCES PlayerCharacter(character_id),
    FOREIGN KEY (skill_id) REFERENCES Skill(skill_id)
) ENGINE=InnoDB;

-- Create the Monster table
CREATE TABLE Monster (
    monster_id INT PRIMARY KEY AUTO_INCREMENT,
    monster_name VARCHAR(255) NOT NULL,
    monster_hp INT ,
    monster_attack INT
) ENGINE=InnoDB;

CREATE TABLE Monster_Loot (
    monster_loot_id INT PRIMARY KEY AUTO_INCREMENT,
    monster_id INT,
    item_id INT,
    drop_rate DECIMAL(5,2),
    FOREIGN KEY (monster_id) REFERENCES Monster(monster_id),
    FOREIGN KEY (item_id) REFERENCES Item(item_id)
) ENGINE=InnoDB;

-- Create the Monster_Skill table
CREATE TABLE Monster_Skill (
    monster_skill_id INT PRIMARY KEY AUTO_INCREMENT,
    monster_id INT,
    skill_id INT,
    FOREIGN KEY (monster_id) REFERENCES Monster(monster_id),
    FOREIGN KEY (skill_id) REFERENCES Skill(skill_id)
) ENGINE=InnoDB;


-- Add foreign key constraints

-- Campaign_User table foreign keys
ALTER TABLE Campaign_User
ADD CONSTRAINT fk_campaign_user_campaign
    FOREIGN KEY (campaign_id) REFERENCES Campaign(campaign_id),
ADD CONSTRAINT fk_campaign_user_user
    FOREIGN KEY (user_id) REFERENCES User(user_id);

-- PlayerCharacter table foreign keys
ALTER TABLE PlayerCharacter
ADD CONSTRAINT fk_player_character_campaign
    FOREIGN KEY (campaign_id) REFERENCES Campaign(campaign_id),
ADD CONSTRAINT fk_player_character_user
    FOREIGN KEY (user_id) REFERENCES User(user_id);

-- Character_Stat table foreign keys
ALTER TABLE Character_Stat
ADD CONSTRAINT fk_character_stat_character
    FOREIGN KEY (character_id) REFERENCES PlayerCharacter(character_id),
ADD CONSTRAINT fk_character_stat_stat
    FOREIGN KEY (stat_id) REFERENCES Stat(stat_id);

-- Character_Item table foreign keys
ALTER TABLE Character_Item
ADD CONSTRAINT fk_character_item_character
    FOREIGN KEY (character_id) REFERENCES PlayerCharacter(character_id),
ADD CONSTRAINT fk_character_item_item
    FOREIGN KEY (item_id) REFERENCES Item(item_id);

-- Equipment table foreign keys
ALTER TABLE Equipment
ADD CONSTRAINT fk_equipment_character
    FOREIGN KEY (character_id) REFERENCES PlayerCharacter(character_id),
ADD CONSTRAINT fk_equipment_item
    FOREIGN KEY (item_id) REFERENCES Item(item_id);

-- Character_Skill table foreign keys
ALTER TABLE Character_Skill
ADD CONSTRAINT fk_character_skill_character
    FOREIGN KEY (character_id) REFERENCES PlayerCharacter(character_id),
ADD CONSTRAINT fk_character_skill_skill
    FOREIGN KEY (skill_id) REFERENCES Skill(skill_id);

-- Monster_Loot table foreign keys
ALTER TABLE Monster_Loot
ADD CONSTRAINT fk_monster_loot_monster
    FOREIGN KEY (monster_id) REFERENCES Monster(monster_id),
ADD CONSTRAINT fk_monster_loot_item
    FOREIGN KEY (item_id) REFERENCES Item(item_id);

ALTER TABLE Monster_Skill
ADD CONSTRAINT fk_monster_skill_monster
    FOREIGN KEY (monster_id) REFERENCES Monster(monster_id),
ADD CONSTRAINT fk_monster_skill_skill
    FOREIGN KEY (skill_id) REFERENCES Skill(skill_id)
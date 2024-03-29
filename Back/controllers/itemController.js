import {models} from "../data/sequelize.js";

const Item = models.item;
const CharacterItem = models.character_item;
const Equipement = models.equipment;
const maxEquip = 5;

class itemsController {

    async createItem(req, res) {
        try {
            const { item_name, item_description, item_price, item_type, item_effect, item_rarity } = req.body;
            const newItem = await Item.create({
                item_name: item_name,
                item_description: item_description,
                item_price: item_price,
                item_type: item_type,
                item_effect: item_effect,
                item_rarity: item_rarity,
            })
            res.status(201).json(newItem);
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    async getAllItem(req, res) {
        try {
            const item = await Item.findAll();
            res.status(200).json(item);
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    async getItemById(req, res) {
        try {
            const item_id = req.params.id;
            const item = await Item.findByPk(item_id);
            res.status(200).json(item)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }


    async updateItem(req, res) {
        try {
            const itemId = req.params.id;
            const { item_name, item_description, item_price, item_type, item_effect, item_rarity } = req.body;
            const item = await Item.findByPk(itemId);
            item.item_name = item_name
                item.item_description = item_description
                item.item_price = item_price
                item.item_type = item_type
                item.item_effect = item_effect
                item.item_rarity = item_rarity
                await item.save();
            res.status(200).json(item);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteItem(req, res) {
        try {
            const item_id = req.params.id;
            const item = await Item.findByPk(item_id);
            await item.destroy();
            res.status(200).json({ message: "Item deleted" })
        } catch (error) {
            res.status(400).json({ message: error.message });

        }
    }


    async addItemInventory(req, res) {
        try {
            const characterId = req.params.id;
            const { itemId, quantity } = req.body
            const newCharItem = await CharacterItem.create({
                character_id: characterId,
                item_id: itemId,
                quantity: quantity,
            })
            res.status(200).json(newCharItem);
        } catch (error) {
            res.status(400).json({ message: error.message });

        }
    }


    async updateInventory(req, res) {
        try {
            const characterItemId = req.params.id;
            const itemQuantity = req.body;
            const characterItem = await CharacterItem.findByPk(characterItemId);
            characterItem.quantity = itemQuantity
            await characterItem.save();
            res.status(200)
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllInventoryFromChar(req, res) {
        try {
            const characterId = req.params.id;
            const characterItem = await CharacterItem.findAll({
                where: {
                    character_id: characterId
                }
            });
            res.status(200).json(characterItem);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getOneItemFromInventory(req, res) {
        try {
            const characterId = req.params.id;
            const itemId = req.body;
            const characterItem = await CharacterItem.findAll({
                where: {
                    character_id: characterId,
                    item_id: itemId
                }
            })
            res.status(200).json(characterItem)
            //add if() in front to check if item exist
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteFromInventory(req, res) {
        try {
            const characterItemId = req.params.id;
            const characterItem = await CharacterItem.findByPk(characterItemId);
            await characterItem.destroy();
            res.status(200).json({ message: "Character item deleted" })
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // async hasEquipementSpace(req, res) {
    //     try {
    //         const characterId = req.params.id;
    //         const equipment = this.checkEquipement(characterId)
    //         if (equipment.length>= maxEquip) {
    //             res.status(200).json({ message: "Hep hep hep on ne triche pas !" })
    //         }
    //         res.status(200).json({ message: "Tu peux equiper des trucs" })
    //
    //     } catch (error) {
    //         res.status(400).json({ message: error.message });
    //     }
    //
    // }
    
    async checkEquipement(id){
        return await Equipement.findAll({
                where: {
                    character_id: id,
                }
            }
        );
    }
    
    async addEquipementToChar(req, res) {
        try {
            const characterId = req.params.id;
            const characterItemId = req.body;
            const characterItem = await CharacterItem.findByPk(characterItemId);
            if(characterItem.character_id === characterId && this.checkEquipement(characterId).length<5){
                await Equipement.create({
                    character_id: characterId,
                    item_id: characterItem.item_id
                })
            }
            if (characterItem.quantity>1){
                characterItem.quantity--
                characterItem.save()
            }else{
                characterItem.destroy()
            }
            res.status(200).json({message:"Kachink Equipé !"})

        }catch (e) {
            res.status(400).json({ message: e.message });
        }
    }

    async removeEquipementFromChar(req, res){
        try {
            const characterId = req.params.id;
            const equipementId = req.body;
            const characterEquipement = await Equipement.findByPk(equipementId);
            const itemExistInInventory = await CharacterItem.find({
                where: {
                    item_id: characterEquipement.item_id,
                    character_id: characterId
                }
            })
            if (itemExistInInventory) {
                itemExistInInventory.quantity++;
                itemExistInInventory.save()
            } else {
                CharacterItem.create({
                    item_id: characterEquipement.item_id,
                    character_id: characterId,
                    quantity: 1
                })
            }
            characterEquipement.destroy();
            res.status(200).json({message: "Déséquipé !"})
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    }

    async getAllEquipementFromChar(req, res){
        try {
            const characterId = req.params.id;
            const stuff = this.checkEquipement(characterId);
            res.status(200).json(stuff)
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    }
}



export default new itemsController();

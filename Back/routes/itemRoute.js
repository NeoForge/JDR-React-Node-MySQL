import ItemsController from "../controllers/itemController.js";
import { Auth, AuthAdmin } from "../config/auth.config.js";


export const itemRoutes = (app) => {
    app.get("/item/all", Auth, ItemsController.getAllItem);
    app.get("/item/:id", Auth, ItemsController.getItemById);
    app.get("/inventory/all/:id", Auth, ItemsController.getAllInventoryFromChar);
    app.post("/item/create", AuthAdmin, ItemsController.createItem);
    app.post("/inventory/create", Auth, ItemsController.addItemInventory);
    app.put("/item/update/:id", AuthAdmin, ItemsController.updateItem);
    app.put("/inventory/update/:id", Auth, ItemsController.updateInventory);
    app.delete("/item/delete/:id", AuthAdmin, ItemsController.deleteItem);
    app.delete("/inventory/delete/:id", Auth, ItemsController.deleteFromInventory);
}
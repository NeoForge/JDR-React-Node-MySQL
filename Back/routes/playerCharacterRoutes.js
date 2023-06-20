import PlayerCharacterController from "../controllers/playerCharacterController.js";
import { Auth, AuthAdmin } from "../config/auth.config.js";

export const playerCharacterRoutes = (app) => {
    app.get("/characters/all", AuthAdmin, PlayerCharacterController.getAllCharacter);
    app.get("/character/:id", Auth, PlayerCharacterController.getCharacterById);
    app.get("/character/campaign/:id/all", Auth, PlayerCharacterController.getAllCharacterFromCampaign);
    app.get("/character/user/:id", Auth, PlayerCharacterController.getAllCharacterFromUser);
    app.get("/character/allShit/:id", Auth, PlayerCharacterController.getAllTheShitFromChar);
    app.get("/character/user/fromCampaign/:id", Auth, PlayerCharacterController.getCharFromUserAndCampaign);
    app.post("/character/create", Auth, PlayerCharacterController.createCharacter);
    app.put("/character/update/:id", Auth, PlayerCharacterController.updateCharacter);
    app.put("/character/playerUpdate/:id", Auth, PlayerCharacterController.updateCharForPlayer);
    app.delete("/character/delete/:id", Auth, PlayerCharacterController.deleteCharacter);
}
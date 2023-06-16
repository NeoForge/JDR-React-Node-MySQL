import { Auth, AuthAdmin } from "../config/auth.config.js";
import StatsController from "../controllers/statController.js";


export const statRoutes = (app) => {
    app.get("/stat/all", Auth, StatsController.getAllStat);
    app.get("/stat/:id", Auth, StatsController.getStatById);
    app.get("/character/stat/all/:id", Auth, StatsController.getAllCharStat);
    app.post("/stat/create", AuthAdmin, StatsController.createStat);
    app.post("/character/addStat/:id", Auth, StatsController.addStatToPlayer);
    app.put("/stat/update/:id", AuthAdmin, StatsController.updateStat);
    app.put("/character/updateStat/:id", Auth, StatsController.updateCharUpdate);
    app.delete("/stat/delete/:id", AuthAdmin, StatsController.deleteStat);
    app.delete("/character/deleteStat/:id", Auth, StatsController.deleteCharStat);
}
import { Auth, AuthAdmin } from "../config/auth.config.js";
import SkillsController from "../controllers/skillController.js";


export const skillRoutes = (app) => {
    app.get("/skill/all", Auth, SkillsController.getAllSkill);
    app.get("/skill/:id", Auth, SkillsController.getSkillById);
    app.get("/character/skill/all/:id", Auth, SkillsController.getAllCharSkill);
    app.post("/skill/create", AuthAdmin, SkillsController.createSkill);
    app.post("/character/skill/create/:id", Auth, SkillsController.addCharSkill);
    app.put("/skill/update/:id", AuthAdmin, SkillsController.updateSkill);
    app.delete("/skill/delete/:id", AuthAdmin, SkillsController.deleteSkill);
    app.delete("/character/skill/delete/:id", Auth, SkillsController.deleteCharSkill);
}
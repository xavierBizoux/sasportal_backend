import { Router } from "express"
import preferencesController from "../controllers/preferences.controller.js"

const preferencesRoutes = Router()
preferencesRoutes.post("/", preferencesController.create)
preferencesRoutes.get("/:user", preferencesController.findOne)
preferencesRoutes.put("/:user", preferencesController.update)
preferencesRoutes.delete("/:user", preferencesController.remove)

export default preferencesRoutes
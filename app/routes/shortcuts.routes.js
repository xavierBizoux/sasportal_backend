import { Router } from "express"
import shortcutsController from "../controllers/shortcuts.controller.js"

const shortcutsRoutes = Router()
shortcutsRoutes.post("/", shortcutsController.create)
shortcutsRoutes.get("/:user", shortcutsController.findOne)
shortcutsRoutes.put("/:user", shortcutsController.update)
shortcutsRoutes.delete("/:user", shortcutsController.remove)

export default shortcutsRoutes
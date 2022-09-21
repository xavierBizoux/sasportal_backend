import mongoose from "mongoose"
import dbConfig from "../config/db.config.js"
import preferencesModel from "./preferences.model.js"
import shortcutsModel from "./shortcuts.model.js"

mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url
db.preferences = preferencesModel
db.shortcuts = shortcutsModel

export default db

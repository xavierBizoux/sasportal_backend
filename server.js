import cors from "cors"
import express from "express"
import db from "./app/models/index.js"
import preferencesRoutes from "./app/routes/preferences.routes.js"
import shortcutsRoutes from "./app/routes/shortcuts.routes.js"

const app = express()

const corsOptions = {
    origin: "https://localhost:3000"
};

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to the database!"))
    .catch(err => {
        console.log("Cannot connect to the database!", err)
        process.exit()
    })

app.use("/api/preferences", preferencesRoutes)
app.use("/api/shortcuts", shortcutsRoutes)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}.`)
})


import db from "../models/index.js"
const Preferences = db.preferences
const preferencesController = {}
preferencesController.create = (req, res) => {
    if (!req.body.user) {
        res.status(400).send({ message: "Content can not be empty" })
        return
    }
    const preferences = new Preferences({
        user: req.body.user,
        elements: req.body.elements
    })
    preferences.save(preferences)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message || "Some error occurred while creating the preferences" }))
}
preferencesController.findOne = (req, res) => {
    const user = req.params.user
    Preferences.findOne({ user: user })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Preferences not found for user: ${user}` })
            } else {
                res.send(data)
            }
        })
        .catch(err => res.status(500).send({ message: `Error retrieving Preferences for user ${user}` }))
}
preferencesController.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Missing data!" })
    }
    const user = req.params.user
    Preferences.findOneAndUpdate({ user: user }, { $set: { elements: req.body.elements } }, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot update Preferences for user ${user}!` })
            } else {
                res.status(201).send({ message: "Preferences were updated successfully!" })
            }
        })
        .catch(err => {
            res.status(500).send({ message: `Error updating Preferences for user ${user}.` })
        })
}
preferencesController.remove = (req, res) => {
    const user = req.params.user
    Preferences.findOneAndRemove({ user: user })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot delete Preferences for user ${user}` })
            } else {
                res.send({ message: `Preferences were deleted successfully` })
            }
        })
        .catch(err => {
            res.status(204).send({ message: `Could not delete Preferences for user ${user}.` })
        })
}
export default preferencesController

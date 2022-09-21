import db from "../models/index.js"
const Shortcuts = db.shortcuts
const shortcutsController = {}
shortcutsController.create = (req, res) => {
    if (!req.body.user) {
        res.status(400).send({ message: "Content can not be empty" })
        return
    }
    const shortcuts = new Shortcuts({
        user: req.body.user,
        elements: req.body.elements
    })
    shortcuts.save(shortcuts)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message || "Some error occurred while creating the shortcuts" }))
}
shortcutsController.findOne = (req, res) => {
    const user = req.params.user
    Shortcuts.findOne({ user: user })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Shortcuts not found for user: ${user}` })
            } else {
                res.send(data)
            }
        })
        .catch(err => res.status(500).send({ message: `Error retrieving Shortcuts for user ${user}` }))
}
shortcutsController.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Missing data!" })
    }
    const user = req.params.user
    Shortcuts.findOneAndUpdate({ user: user }, { $set: { elements: req.body.elements } }, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot update Shortcuts for user ${user}!` })
            } else {
                res.status(201).send({ message: "Shortcuts were updated successfully!" })
            }
        })
        .catch(err => {
            res.status(500).send({ message: `Error updating Shortcuts for user ${user}.` })
        })
}
shortcutsController.remove = (req, res) => {
    const user = req.params.user
    Shortcuts.findOneAndRemove({ user: user })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot delete Shortcuts for user ${user}` })
            } else {
                res.send({ message: `Shortcuts were deleted successfully` })
            }
        })
        .catch(err => {
            res.status(204).send({ message: `Could not delete Shortcuts for user ${user}.` })
        })
}
export default shortcutsController
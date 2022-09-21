import mongoose from "mongoose"

let info = mongoose.Schema(
    {
        packageUri: String,
        objectName: String
    }
)
let element = mongoose.Schema(
    {
        type: String,
        info: { type: info },
        position: String
    }
)
let schema = mongoose.Schema(
    {
        user: {
            type: String,
            required: true,
            unique: true
        },
        elements: [{ type: element }]
    },
    { timestamps: true }
)
schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

const preferencesModel = mongoose.model("preferences", schema)

export default preferencesModel
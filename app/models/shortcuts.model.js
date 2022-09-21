import mongoose from "mongoose"

let element = mongoose.Schema(
    {
        label: { type: String, required: true, unique: true },
        href: { type: String },
        position: Number
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

const shortcutsModel = mongoose.model("shortcuts", schema)

export default shortcutsModel
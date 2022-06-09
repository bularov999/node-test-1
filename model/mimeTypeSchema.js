const {model, Schema} = require('mongoose')

const mimeTypeSchema = new Schema({
    name : String,
    type: String,
    size: Number
})

module.exports = model("MimeType", mimeTypeSchema)
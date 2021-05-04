const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let commandSchema = new Schema({
    _id: {type: String},
    manutencao: {
        enable: {type: Boolean, default: false},
        reason: {type: String, default: "bug"}
    },
    usos: {type: Number, default: 0}
})

const Command = mongoose.model("Command", commandSchema)
module.exports = Command
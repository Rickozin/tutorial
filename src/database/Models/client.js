const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let clientSchema = new Schema({
    _id: {type: String},
    manutencao: {
        enable: {type: Boolean, default: false},
        reason: {type: String, default: "bug"}
    },
})

const Client = mongoose.model("Client", clientSchema)
module.exports = Client
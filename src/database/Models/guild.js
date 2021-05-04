const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let guildSchema = new Schema({
    _id: {type: String},
    name: {type: String},
    prefix: {type: String, default: "!"}
})

const Guild = mongoose.model("Guild", guildSchema)
module.exports = Guild
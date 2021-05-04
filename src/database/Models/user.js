const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    _id: {type: String},
    name: {type: String},
})

const User = mongoose.model("User", userSchema)
module.exports = User
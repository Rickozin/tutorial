const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let guildSchema = new Schema({
    _id: {type: String},
    name: {type: String},
    prefix: {type: String, default: "!"},
    banSystem: {
        mensagem: {type: String, default: "O usuário **{user}** foi banido desse servidor. \n> Razão: **{reason}** \n> Autor: **{author}**"},
        canal: {type: String, default: 'null'},
        mensagemPrivada: {
            status: {type: Boolean, default: false},
            mensagem: {type: String, default: 'Você foi banido do servidor **{server}** pelo motivo de **{reason}**.'}
        }
    }
})

const Guild = mongoose.model("Guild", guildSchema)
module.exports = Guild
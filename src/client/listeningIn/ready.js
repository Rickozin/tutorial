const Client = require("../../database/Models/client")
const User = require('../../database/Models/user')
const Guild = require('../../database/Models/guild')
const Command = require('../../database/Models/command')

module.exports = class {
    constructor(client) {
        this.client = client
    }

async run() {
    this.client.database.user = User
    this.client.database.guild = Guild
    this.client.database.client = Client
    this.client.database.command = Command

    console.log(`${this.client.user.username} on-line`)

    const status = [
        {
            name: `Sou um bot de tutorial`,
        },
        {
            name: "Fui desenvolvido por Rickozin#4352"
        }
    ]
    setInterval(() => {
        var randomStatus = status[Math.floor(Math.random() * status.length)]
        this.client.user.setActivity(randomStatus.name);
    }, 10 * 1000)
    this.client.user.setStatus("dnd")
}
}
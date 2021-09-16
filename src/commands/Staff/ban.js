const Command = require('../../structures/Command')

module.exports = class prefix extends Command {
    constructor(client) {
        super(client)
        this.client = client

        this.name = 'ban'
        this.category = 'Staff'
        this.usage = 'ban <user>'
        this.description = 'Bane um usuário ou configura o sistema de ban.'
        this.aliases = ["banir"]

        this.enabled = true
        this.reference = 'ban'
    }
    async run(message, args, prefix, author, channel) {
        if(!args[0]) return message.reply(`Você precisa inserir um usuário para banir ou um sub-comando para configurar o sistema. \n Caso deseje ver os sub-comandos utilize **${prefix}ban help**`)
        let subcmd = this.client.commands.subcommands.get(this.reference).find((x) => x.name.toLowerCase() == args[0].toLowerCase() || x.aliases.includes(args[0].toLowerCase()))
        if(!subcmd) {
            const user = message.guild.users.get(args[0]) || message.mentions.members.first()
            if(!user) return message.reply(`Você precisa inserir um usuário para banir ou um sub-comando para configurar o sistema. \n Caso deseje ver os sub-comandos utilize **${prefix}ban help**`)

        } else {
            subcmd.run(message, args, prefix, author, channel)
        }
    }
}
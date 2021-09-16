const Command = require('../../structures/Command')

module.exports = class prefix extends Command {
    constructor(client) {
        super(client)
        this.client = client

        this.name = 'prefix'
        this.category = 'Config'
        this.usage = 'prefix <novo-prefixo>'
        this.description = 'Altera o prefixo do bot.'
        this.aliases = ["prefixo"]

        this.enabled = true
    }
    async run(message, args, prefix, author, channel) {
        const doc = await this.client.database.guild.findOne({_id: message.guild.id})
        const prefixo = args.join(" ")

        if(prefixo.length > 5 || !prefixo || prefixo.length < 1) return message.reply(`O prefixo do bot precisa ter de 1 a 5 caracteres.`)
        if(prefixo == prefix) return message.reply(`Por favor insira um prefixo diferente do usado atualmente.`)        

        await doc.updateOne({$set:{prefix: prefixo}})
        message.reply(`O prefixo desse servidor foi alterado para **${prefixo}** com`)
    }
}
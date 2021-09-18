const Command = require('../../../structures/Command')

module.exports = class banMessage extends Command {
    constructor(client) {
        super(client)
        this.client = client

        this.name = 'channel'
        this.description = 'Altera o canal do sistema de ban.'
        this.aliases = ['canal', 'ch']
        this.reference = 'ban'
        
        this.enabled = true
        this.subCommand = true
    }
    async run(message, args, prefix, author, channel) {
        const doc = await this.client.database.guild.findOne({_id: message.guild.id})        
        const canal = message.guild.channels.cache.get(args[1]) || channel || message.mentions.channels.first()
        if(!canal) return message.reply(`Você precisa inserir ou mencionar um canal para alterar.`)
        if(canal.id == doc.banSystem.canal) return message.reply(`Você precisa inserir um canal diferente do atual para alterar.`)
        doc.banSystem.canal = canal.id
        await doc.save()
        message.reply(`O canal de exibição do sistema de bans foi alterado para o canal **<#${canal.id}>**`)
    }
}
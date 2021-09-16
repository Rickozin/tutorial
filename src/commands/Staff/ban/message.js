const Command = require('../../../structures/Command')

module.exports = class banMessage extends Command {
    constructor(client) {
        super(client)
        this.client = client

        this.name = 'message'
        this.description = 'Altera a mensagem do sistema de ban.'
        this.aliases = ['msg', 'mensagem']
        this.reference = 'ban'
        
        this.enabled = true
        this.subCommand = true
    }
    async run(message, args, prefix, author, channel) {
        const doc = await this.client.database.guild.findOne({_id: message.guild.id})
        const msg = await message.reply(`Ok, agora insira a mensagem que você deseja setar no sistema de ban abaixo, você possui 1 minuto para isso. \n> Utilize **{user}** para o nome do usuário banido. \n> **{reason}** para exibir o motivo do banimento. \n> **{author}** para exibir o autor do banimento.`)
        const filter = (c) => c.author.id == author.id && c.channel.id == channel.id
        const Collector = channel.createMessageCollector({filter: filter, time: 60000})
        var collect;
        Collector.on('collect', async (c) => {
            collect = c.content            
            if(c.content == doc.banSystem.message)  {
            Collector.stop()
            return msg.reply(`Você precisa definir uma mensagem diferente da atual, comece novamente.`)
        }
            msg.delete()
            await doc.updateOne({$set:{'banSystem.mensagem': c.content}})
            if(message.guild.me.permissions.has("MANAGE_MESSAGES")) c.delete()
            message.reply(`A mensagem de ban foi alterada para "${c.content}" com sucesso.`)
            Collector.stop()
        })
        Collector.on('end', async () => {
            if(collect) return;
            msg.delete()
            channel.send(`O tempo acabou.`)
        })
    }
}
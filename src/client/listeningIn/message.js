const GetMention = (id) => new RegExp(`^<@!?${id}>( |)$`);

module.exports = class {
    constructor(client) {
        this.client = client
    }
    async run(message) {
        try {
            if(message.channel.type == "dm") return;

            const user = await this.client.database.user.findOne({_id: message.author.id})
            const guild = await this.client.database.guild.findOne({_id: message.guild.id})
            const Client = await this.client.database.client.findOne({_id: this.client.user.id})

            if(!user) await this.client.database.user.create({_id: message.author.id, name: message.author.tag})
            if(!guild) await this.client.database.guild.create({_id: message.guild.id, name: message.guild.name})
            if(!Client) await this.client.database.client.create({_id: this.client.user.id})

            if(user.name !== message.author.tag) await this.client.database.user.findOneAndUpdate({_id: message.author.id}, {$set:{name: message.author.tag}})
            if(guild.name !== message.guild.name) await this.client.database.guild.findOneAndUpdate({_id: message.guild.id}, {$set:{name: message.guild.name}})

            var prefix = prefix
            prefix = guild.prefix
            if(message.content.match(GetMention(this.client.user.id))) {
                message.channel.send(`Olá ${message.author}, eu sou o ${this.client.user.username} e meu prefixo aqui é **${prefix}**`)
            }

            if(message.content.indexOf(prefix) !== 0) return;
            const author = message.author;
            const channel = message.channel;
            const args = message.content
            .slice(prefix.length)
            .trim()
            .split(/ +/g);
        const command = args.shift().toLowerCase();
        const cmd =
        this.client.commands.all.get(command) ||
        this.client.commands.all.get(
            this.client.aliases.get(command)
        )
        if(!cmd) return
        const cname = cmd.name
        const comando = await this.client.database.command.findOne({_id: cname})
        if(!comando) await this.client.database.command.create({_id: cname})
        if(author.id !== "342757511218200588") {
            if(Client.manutencao.enable) return channel.send(`${author}, infelizmente estou em manutenção pelo motivo de **${Client.manutencao.reason}**`)
            if(comando.manutencao.enable) return channel.send(`${author}, infelizmente esse comando está em manutenção pelo motivo de **${comando.manutencao.reason}**`)
    }
    var num = comando.usos;
    num = num + 1
    await this.client.database.command.findOneAndUpdate({_id: cname}, {$set:{usos: num}})
        cmd.run(message, args, prefix, author, channel)
        } catch (e) {
            console.log('Erro no evento message:', e)
        }
    }
}
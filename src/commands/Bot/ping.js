const Command = require('../../structures/Command')

module.exports = class ping extends Command {
    constructor(client) {
        super(client);
        this.client = client;

        this.name = "ping"
        this.category = "Bot"
        this.description = "Vê o ping do bot"
        this.usage = "ping"
        this.aliases = []

        this.enabled = true;
    }
    async run(message, args, prefix, author, channel) {
        channel.send(`Minha latência é: **${this.client.ws.ping}ms**`)
    }
}
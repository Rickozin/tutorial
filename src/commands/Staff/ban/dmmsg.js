const Command = require("../../../structures/Command");

module.exports = class banMessage extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "dmmsg";
    this.description =
      "Altera as configurações da mensagem direta do sistema de bans.";
    this.aliases = ["dmsg", "dm", "direct"];
    this.reference = "ban";

    this.enabled = true;
    this.subCommand = true;
  }
  async run(message, args, prefix, author, channel) {
    const doc = await this.client.database.guild.findOne({
      _id: message.guild.id,
    });
    if (!args[1])
      return message.reply(`Você precisa inserir um parâmetro para alterar.`);
    if (["status", "toggle"].includes(args[1].toLowerCase())) {
      switch (doc.banSystem.mensagemPrivada.status) {
        case true:
          doc.banSystem.mensagemPrivada.status = false;
          await doc.save();
          message.reply(
            `A mensagem privada estava ativada, portanto, a mesma foi desabilitada.`
          );
          break;
        case false:
          doc.banSystem.mensagemPrivada.status = true;
          await doc.save();
          message.reply(
            `A mensagem privada estava desativada, portanto, a mesma foi habilitada.`
          );
          break;
      }
    } else if (["msg", "message", "mensagem"].includes(args[1].toLowerCase())) {
      if (!args[2])
        return message.reply(`Você precisa inserir uma mensagem para alterar.`);
      const msg = args.slice(2).join(" ");
      if (msg == doc.banSystem.mensagemPrivada.mensagem)
        return message.reply(
          `Você precisa inserir uma mensagem diferente da atual para alterar.`
        );
      doc.banSystem.mensagemPrivada.mensagem = msg;
      await doc.save();
      message.reply(
        `A mensagem direta do sistema de ban foi alterado para \`\`\`js\n${msg}\`\`\``
      );
    }
  }
};

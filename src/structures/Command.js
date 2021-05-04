module.exports = class Command {
    constructor(client) {
        this.client = client

        this.name = "Nome"
        this.category = "Categoria"
        this.description = "Descrição"
        this.usage = "Sem informação"
        this.aliases = []
        this.subCommand = false
        this.reference = this.name

        this.enabled = true
    }
}
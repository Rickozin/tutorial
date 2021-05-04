const { Client, Collection } = require('discord.js')
const klaw = require('klaw')
const path = require('path')
const {promisify} = require('util')
const readdir = promisify(require('fs').readdir)
const c = require('colors')
const FileUtils = require('./utils/FileUtils')

class Tutorial extends Client {
    constructor(options) {
        super(options)
        this.commands = {
            all: new Collection(),
            subcommands: new Collection()
        }
        this.aliases = new Collection()
        this.database = new Collection()
    }

    login(token) {
        token = process.env.token;
        return super.login(token).then(async () => [await this.initLoaders()]);
    }
    load(commandPath, commandName) {
        const props = new (require(`${commandPath}/${commandName}`))(this);
        if(props.subCommand) {
            if(!this.commands.subcommands.get(props.reference)) {
                this.commands.subcommands.set(props.reference, new Collection());
            }
            this.commands.subcommands.get(props.reference).set(props.name, props)
        }
        if(props.subCommand) return;
        props.location = commandPath
        if(props.init) {
            props.init(this);
        }
        this.commands.all.set(props.name, props)
        props.aliases.forEach((aliases) => {
            this.aliases.set(aliases, props.name)
        })
        return false
    }
    async initLoaders() {
        return FileUtils.requireDirectory("./src/loaders", (Loader) => {
            Loader.load(this).then(
                console.log(c.red(`[Loaders] - The Loaders was successfully imported!`))
            )
        })
    }
}
const dbIndex = require('./database/index.js')
dbIndex.start();

const client = new Tutorial();

const onLoad = async () => {
    klaw('src/commands').on('data', (item) => {
        const cmdFile = path.parse(item.path)
        if(!cmdFile.ext || cmdFile.ext !== ".js") return;
        const response = client.load(cmdFile.dir, `${cmdFile.name}${cmdFile.ext}`)
        if(response) return;
    });
    const eventFiles = await readdir(`./src/client/listeningIn/`);
    eventFiles.forEach((file) => {
        const eventName = file.split(".")[0]
        const event = new (require(`./client/listeningIn/${file}`))(client);
        client.on(eventName, (...args) => event.run(...args));
        delete require.cache[require.resolve(`./client/listeningIn/${file}`)];
    });
    client.login().then(() => {
        console.log(c.red(`[Commands] - All commands were loaded successfully.`));
        console.log(c.red(`[Events] - All events have been loaded successfully.`));
    });
};

onLoad()

module.exports = {
    Util: require('./utils/index.js')
};
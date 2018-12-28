const Discord = require("discord.js");
const client = new Discord.Client();
const PersistentCollection = require("djs-collection-persistent");

if(process.version.slice(1).split(".")[0] < 8) throw new Error("Se requiere node 8.0.0 o superior. Actualiza Node en su sistema.");

const config = require('./config.json');
const fs = require("fs");

client.config = config;

require("./modules/functions.js")(client);

client.tags = new PersistentCollection({name: "tags"});
client.quotes = new PersistentCollection({name: "quotes"});
client.pages = new PersistentCollection({name: "guidepages"});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`Comandos cargados: ${files.length}.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
function numazar(min,max){
  return Math.round(Math.random() * (max - min) + min);
}
fs.readdir('./events/', (err, files) => {
    if (err) console.error(err);
    console.log(`cargado un total de ${files.length} eventos.`);
    files.forEach(file => {
        if (file.split(".").slice(-1)[0] !== "js") return
        const eventName = file.split(".")[0];
        const event = require(`./events/${file}`);
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

client.login(config.botToken);

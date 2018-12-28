const Discord = require("discord.js");
const watched = new Discord.Collection();

exports.run = (client, msg, args) => {
  const channel = (client.channels.get(args[0]) || msg.channel);
  if(watched.has(channel.id)) {
    watched.get(channel.id).stop();
    msg.edit("Deteniendo registros #"+channel.name);
    return watched.delete(channel.id);
  }
  
  msg.edit("Iniciando registro :eyes: #"+channel.name);
  const collector = channel.createMessageCollector(()=>true);
  collector.on("collect", (collected, collector) => console.log(`[VISTO][${collected.author.username}][#${collected.channel.name}]${collected.content}`));
  watched.set(channel.id, collector);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'ver',
  description: 'Iniciar/Detener logs.',
  usage: 'ver'
};
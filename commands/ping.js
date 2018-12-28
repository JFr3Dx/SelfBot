exports.run = (client, msg, args) => {
  msg.delete();
  msg.channel.send("Ping?").then(m => m.edit(`Pong! Latencisa ess ${m.createdTimestamp - msg.createdTimestamp}ms. Latencia de API ${Math.round(client.ping)}ms`) );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Pong!.',
  usage: 'ping'
};
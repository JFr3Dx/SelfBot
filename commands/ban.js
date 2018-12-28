exports.run = (bot, msg, args) => {
  let ban_id = args[0];
  let days = args[1];
  msg.guild.ban(ban_id, days)
    .then( () => console.log(`Baneado ${ban_id} y eliminado ${days} dias de mensaje`))
    .catch(console.error);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: []
};

exports.help = {
  name: 'ban',
  description: 'Ban.',
  usage: 'ban <@usuario>'
};
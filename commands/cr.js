exports.run = (client, msg, args) => {
  if(!parseInt(args[0], 10)) {
    return msg.edit(`Por favor, proporcione una serie de mensajes para limpiar las reacciones de!`).then(setTimeout(msg.delete.bind(msg), 1000));
  }
  if(!msg.guild.members.me.hasPermission("MANAGE_MESSAGES")) {
    return msg.edit(`Hey idiota, ¿qué tal hacer esto sólo si tienes permisos para hacerlo, eh?`).then(setTimeout(msg.delete.bind(msg), 1000));
  }
  msg.channel.fetchMessages({limit: parseInt(args[0], 10)}).then(msglog => {
    msg.edit(`Borrando recciones de este canal para ${args[0]} mensajes...`).then(setTimeout(msg.delete.bind(msg), 2000));
    msglog.forEach(message => {
      message.clearReactions();
    });
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'cr',
  description: 'Borra reacciones.',
  usage: 'cr [mensaje cant]'
};
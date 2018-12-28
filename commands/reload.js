exports.run = async (client, msg, args) => {
  if(!args || args.size < 1) return msg.edit(`No pusiste ningun comanndo :smirk:.`).then(setTimeout(msg.delete.bind(msg), 1000));

  let command;
  if (client.commands.has(args[0])) {
    command = client.commands.get(args[0]);
  } else if (client.aliases.has(args[0])) {
    command = client.commands.get(client.aliases.get(args[0]));
  }
  if(!command) return msg.edit(`El comando \`${args[0]}\` no existe, intenta de nuevo!`).then(setTimeout(msg.delete.bind(msg), 1000));
  command = command.help.name;

  delete require.cache[require.resolve(`./${command}.js`)];
  let cmd = require(`./${command}`);
  client.commands.delete(command);
  client.aliases.forEach((cmd, alias) => {
    if (cmd === command) client.aliases.delete(alias);
  });
  client.commands.set(command, cmd);
  cmd.conf.aliases.forEach(alias => {
    client.aliases.set(alias, cmd.help.name);
  });

  msg.edit(`El comando \`${command}\` se volvio a cargar`).then(setTimeout(msg.delete.bind(msg), 1000));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'reload',
  description: 'Recargar comando',
  usage: 'reload <comando>'
};
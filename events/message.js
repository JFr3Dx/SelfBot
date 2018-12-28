module.exports = (client, message) => {
  if(message.isMentioned(client.user.id) || message.mentions.everyone || (message.guild && message.mentions.roles.filter(r=>message.guild.member(client.user.id).roles.has(r.id)).size > 0)) {
  client.log("mention", `${message.guild.name} #${message.channel.name}`, message.author, message.content);
  }
  
  if(message.author.id !== client.user.id) return;
  if (!message.content.startsWith(client.config.prefix)) return;

  const args = message.content.split(" ");
  const command = args.shift().slice(client.config.prefix.length);

  let slash = client.tags.get(command);
  if(slash) return message.edit(`${args.join(" ")} ${slash}`);

  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    cmd.run(client, message, args);
  }
};
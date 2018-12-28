exports.run = async (bot, msg, args) => {
  const user = (msg.mentions.users.first() || bot.users.get(args[0]) || null);
  const amount = !!user ? parseInt(msg.content.split(" ")[2], 10) : parseInt(msg.content.split(" ")[1], 10);
  if (!amount) return msg.edit("Especifica cantidad a eliminar!").then(msg.delete(2000));
  if (!amount && !user) return msg.edit("Debe especificar un usuario y cantidad, o simplemente cantidad, de mensajes para purgar!").then(msg.delete(2000));
  await msg.delete();
  let messages = await msg.channel.fetchMessages({limit: 100});
  if(user) {
    messages = messages.array().filter(m=>m.author.id === user.id);
    bot.log("log", "Cantidad a purgar", msg.author, "Cantidad: " + amount);
    messages.length = amount;
  } else {
    messages = messages.array();
    messages.length = amount + 1;
  }
  messages.map(async m => await m.delete().catch(console.error));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'purge',
  description: 'Elimina msjs',
  usage: 'purge [num de msjs]'
};
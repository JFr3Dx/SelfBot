exports.run = (client, message) => {
    if (message.mentions.users.size === 0) return message.reply(` Por favor menciona a un usuario.\nEjemplo: /rol @usuario Miembros`);
    let member = message.guild.member(message.mentions.users.first());
    if (!member) return message.reply(` **Error:** El usuario no es valido.`);
    let name = message.content.split(" ").splice(2).join(" ");
    let role = message.guild.roles.find("name", name);
    if (!role) return message.reply(` **Error:** ${name} Este rol no existe en este server!`);
    let botRolePosition = message.guild.member(client.user).highestRole.position;
    let rolePosition = role.position;
    if (botRolePosition <= rolePosition) return message.channel.send(` **Error:** Error al agregar rol, porque mi rol es menor que el rol mencionado.`);
    member.addRole(role).catch(e => {
        return message.channel.send(` **Error:**\n${e}`);
    });
    message.channel.send(` **${message.author.username}**, Rol **${name}** agregado a **${message.mentions.users.first().username}**.`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'rol',
  description: 'Agregar rol.',
  usage: 'rol <@usuario> Rol'
};
const Discord = require('discord.js');

exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let member = message.mentions.members.first();
  let modlog = message.guild.channels.find('name', 'report_ban_users');
  let muteRole = message.guild.roles.find('name', 'MUTE');
  if (!modlog) return message.reply('No encontre el canal').catch(console.error);
  if (!muteRole) return message.reply('No encontre el rol ').catch(console.error);
  if (reason.length < 1) return message.reply('Proporciona una razon para el Mute ;3 .').catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('Menciona a alguien para el Mute.').catch(console.error);
  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Accion:** Un/mute\n**Objetivo:** ${member.user.tag}\n**Moderador:** ${message.author.tag}\n**Razon:** ${reason}`);

  if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('No tengo los permisos ;c.').catch(console.error);

  if (member.roles.has(muteRole.id)) {
    member.removeRole(muteRole).then(() => {
      client.channels.get(modlog.id).send({embed}).catch(console.error);
    })
    .catch(e=>console.error("No se puede quitar el rol Mute: " + e));
  } else {
    member.addRole(muteRole).then(() => {
      client.channels.get(modlog.id).send({embed}).catch(console.error);
    })
    .catch(e=>console.error("No se puede agregar el rol Mute: " + e));
  }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['unmute']
};

exports.help = {
  name: 'mute',
  description: 'Mute/Unmute',
  usage: 'un/mute [@usuario] [razon]'
};
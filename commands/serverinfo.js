const Discord = require('discord.js');
function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
}
exports.run = (client, message) => {
  const embed = new Discord.RichEmbed();
  let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
      let region = {
          "brazil": "Brazil",
          "eu-central": "Central Europe",
          "singapore": "Singapore",
          "us-central": "U.S. Central",
          "sydney": "Sydney",
          "us-east": "U.S. East",
          "us-south": "U.S. South",
          "us-west": "U.S. West",
          "eu-west": "Western Europe",
          "vip-us-east": "VIP U.S. East",
          "london": "London",
          "amsterdam": "Amsterdam",
          "hongkong": "Hong Kong"
      };

      var emojis;
      if (message.guild.emojis.size === 0) {
          emojis = 'None';
      } else {
          emojis = message.channel.guild.emojis.map(e => e).join(" ");
      }

      const online = message.guild.presences.filter(p => p.status === 'online').size
      const idle = message.guild.presences.filter(p => p.status === 'idle').size
      const dnd = message.guild.presences.filter(p => p.status === 'dnd').size
      const offline = message.guild.presences.filter(p => p.status === 'offline').size
  embed.setAuthor(message.guild.name, message.guild.iconURL ? message.guild.iconURL : client.user.displayAvatarURL)
/*  .addField("Creado", `${message.guild.createdAt.toString().substr(0, 15)},\n${checkDays(message.guild.createdAt)}`, true)*/  
  .addField("Creado", `${message.guild.createdAt.toString().substr(0, 15)}`, true)
  .addField("ID", message.guild.id, true)
  .addField("Owner", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
  .addField("Region", region[message.guild.region], true)
  .addField("Miembros", message.guild.memberCount, true)
  .addField("Roles", message.guild.roles.size, true)
  .addField("Canales", message.guild.channels.size, true)
  .addField("Verificacion lvl", verifLevels[message.guild.verificationLevel], true)
  .addField("Canal predeterminado", message.guild.defaultChannel, true)
  .addField("\t\tUsuarios", `${online} online | ${idle} idle | ${dnd} dnd | ${offline} offline`, true)
  .setColor(3447003)
  message.edit({embed});
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['si'],
  permLevel: 0
};

exports.help = {
  name: 'serverinfo',
  description: 'Info server.',
  usage: 'serverinfo'
};
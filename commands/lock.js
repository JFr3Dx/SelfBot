const ms = require('ms');
exports.run = (client, msg, args) => {
  if (!client.lockit) client.lockit = [];
  let time = args.join(' ');
  let validUnlocks = ['release', 'unlock'];
  if (!time) return msg.reply('Debe fijar una tiempo para el bloqueo en horas, minutos o segundos');

  if (validUnlocks.includes(time)) {
    msg.channel.overwritePermissions(msg.guild.id, {
      SEND_MESSAGES: null
    }).then(() => {
      msg.edit('Bloqueo terminado.');
      clearTimeout(client.lockit[msg.channel.id]);
      delete client.lockit[msg.channel.id];
    }).catch(error => {
      console.log(error);
    });
  } else {
    msg.channel.overwritePermissions(msg.guild.id, {
      SEND_MESSAGES: false
    }).then(() => {
      msg.edit(`:rotating_light: Canal bloqueado por ${ms(ms(time), { long:true })} :timer:`).then(() => {

        client.lockit[msg.channel.id] = setTimeout(() => {
          msg.channel.overwritePermissions(msg.guild.id, {
            SEND_MESSAGES: null
          }).then(msg.edit('Bloqueo terminado.')).catch(console.error);
          delete client.lockit[msg.channel.id];
        }, ms(time));

      }).catch(error => {
        console.log(error);
      });
    });
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ld'],
  permLevel: 3
};

exports.help = {
  name: 'lock',
  description: 'Bloquea el canal',
  usage: 'lock <duracion>'
};
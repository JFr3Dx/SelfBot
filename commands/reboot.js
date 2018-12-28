const fs = require("fs");
exports.run = (client, msg, args) => {
  msg.edit("Reiniciando...").then(m=>{
    fs.writeFile('./reboot.json', `{"id": "${msg.id}", "channel": "${msg.channel.id}"}`, (err) => {
      if (err) console.error(err);
      client.tags.close();
      client.quotes.close();
      process.exit(1);
    });
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["restart"],
  permLevel: 0
};

exports.help = {
  name: 'reboot',
  description: 'Restart.',
  usage: 'reboot'
};
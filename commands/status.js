exports.run = (client, msg, args) => {
    let statuses = {
      "online": "online",
      "on": "online",
      "invisible": "invisible",
      "offline": "invisible",
      "off": "invisible",
      "invis": "invisible",
      "i": "invisible",
      "dnd": "dnd",
      "idle": "idle"
    };
    if(!args[0]) return msg.edit(`Eres pndj no?.`).then(setTimeout(msg.delete.bind(msg), 2000));
    let status = statuses[args[0].toLowerCase()];
    if(!status) {
      return msg.edit(`Neee!  ${status} no es valido`).then(setTimeout(msg.delete.bind(msg), 2000));
    }
    if(status === "on") status = "online";
    if(status === "off") status = "offline";
    if(status === "i") status = "idle";
    if(status === "offline") status = "invisible";
    client.user.setStatus(status)
    .then(u=> {
      msg.edit(`Estado cambiado a ${status}`).then(setTimeout(msg.delete.bind(msg), 2000));
    }).catch(e=> {
      msg.edit(`Error al cambiar estado a: ${status}\n\`\`\`${e}\`\`\``).then(setTimeout(msg.delete.bind(msg), 2000));
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["s"],
  permLevel: 0
};

exports.help = {
  name: 'estado',
  description: 'Estado.',
  usage: 'estado [online/invisible/dnd/idle]'
};
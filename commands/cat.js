const snekfetch = require('snekfetch')
exports.run = (client, msg) => {
        snekfetch.get("http://random.cat/meow")
            .then(respond => {
              const Link = respond.body.file;
              	msg.edit(":cat: :3");
                msg.channel.send(" ", {"files": [Link]})
            })
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['gato', 'miau']
};

exports.help = {
    name: 'cat',
    description: 'Miau!',
    usage: 'cat'
}
exports.run = (client, msg, args) => {
  const [replyTo, ...replyText] = args;
  msg.channel.fetchMessages({limit: 1, around: replyTo})
  .then(messages=> {
    const replyToMsg = messages.first();
    msg.channel.send(replyText.join(" "), {embed: {
      color: 3447003,
      author: {
        name: `${replyToMsg.author.username} (${replyToMsg.author.id})`,
        icon_url: replyToMsg.author.avatarURL
      },
      description: replyToMsg.content
    }})
    .then(() => msg.delete());
  }).catch(console.error);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'reply',
  description: 'Msjs por ID',
  usage: 'reply <id mensaje>'
};
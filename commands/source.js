exports.run = (client, msg, args) => {
  const replyTo = args[0];
  msg.channel.fetchMessages({limit: 1, around: replyTo})
  .then(messages=> {
    const replyToMsg = messages.first();
    msg.channel.send(`Fuente para msg con ID: ${replyTo}: \`\`\`md\n${clean(replyToMsg.content)}\n\`\`\``)
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
  name: 'fuente',
  description: 'ascii msj.',
  usage: 'fuente <ID de msj>'
};

function clean(text) {
  if (typeof(text) === "string") {
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  }
  else {
      return text;
  }
}
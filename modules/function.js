module.exports = (client) => {
  global.wait = require('util').promisify(setTimeout);

  global.range = (count, start = 0) => {
    const myArr = [];
    for(var i = 0; i<count; i++) {
      myArr[i] = i+start;
    }
    return myArr;
  };
  
  client.log = (type, title, author, msg) => {
    const logChannel = (type === "mention") ? client.channels.get(client.config.channels.mentions) : client.channels.get(client.config.channels.logs);
    if(!logChannel) return console.log(`[${type}] [${title}]\n[${author.username} (${author.id})]${msg}`);
    logChannel.send({embed: {
      color: 3447003,
      author: {
        name: `${author.username} (${author.id})`,
        icon_url: author.avatarURL()
      },
      title: title,
      url: '',
      description: msg
    }});
  };
  
  client.awaitReply = async (msg, question, limit = 60000) => {
    const filter = m=>m.author.id = msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ['time'] });
      return collected.first().content;
    } catch(e) {
      return false;
    }
  };
  
  
  client.answer = (msg, contents, options = {}) => {
    options.delay =  (options.delay || 1000);
    options.deleteAfter = (options.deleteAfter || false);
    msg.edit(contents);
    if(options.deleteAfter) msg.delete({timeout: options.delay});
  };
  

  process.on('uncaughtException', (err) => {
    let errorMsg = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './');
    console.error("Excepcion no capturada: ", errorMsg);
  });
  
  process.on("unhandledRejection", err => {
    console.error("Uncaught Promise Error: ", err);
  });
};

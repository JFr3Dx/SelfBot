const got = require('got');
/*const Discord = require('discord.js');
const bot = new Discord.Client();*/
const API_KEY = 'dc6zaTOxFJmzC';

exports.run = async (bot, msg, args) => {
    if (args.length < 1) {
        throw 'Ingresa algo para buscar!';
    }

    const res = await got(`http://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${encodeURIComponent(args.join(' '))}`, { json: true });

    if (!res || !res.body || !res.body.data) {
        throw 'No se pudo encontrar un GIF con esa palabra.!';
    }

    msg.edit(".");
    msg.channel.send(res.body.data.image_url);
};

// async function findRandom(query) {}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['gf']
};
exports.help = {
    name: 'gif',
    usage: 'gif <buscar>',
    description: 'Buscar Gifs'
};
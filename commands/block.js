const Discord = require('discord.js');
const config = require('../config.json');
exports.run = (client,msg) =>{
	var str = msg.content.replace(config.prefix+"block ", "").replace(/ /g, "   ");
	var matched_numbers = str.match(/([0-9])/g);
	str = str.replace(/([a-zA-Z])/g, ":regional_indicator_$1:").toLowerCase()
	if (matched_numbers){
		str = str.replace(/([0-9])/g, match => {
			return {"1": ":one:", "2": ":two:", "3": ":three:", "4": ":four:", "5": ":five:", "6": ":six:", "7": ":seven:", "8": ":eight:", "9": ":nine:", "0": ":zero:"}[match];
		}).replace(/\:one\:\:zero\:\:zero\:/, ":100:").replace(/\:one\:\:zero\:/g, ":keycap_ten:");
	}
	msg.edit(str);
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bl'],
  permLevel: 0
};

exports.help = {
  name: 'block',
  description: 'Coadenas en bloque.',
  usage: 'block <palabra>'
};
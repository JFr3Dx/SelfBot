const Discord = require('discord.js');
const config = require('../config.json');
var request = require('request');
const green = '#10A854';
const red = '#BA2A29';
const yellow = '#FFFF66';

exports.run = function(client, msg, args) {
  if (!args[0]){
    return msg.channel.send('Dime algo para buscar! (Ejem. star wars)');
  }
  args = args.join(' ');
  var embed = new Discord.RichEmbed();
  var colour;
  getSearchData(args, msg, function(searchData) {
    if (searchData.total_results == 0) {
      msg.channel.send('Error 404 | La pelicula no se ha encontrado en nuestra DB.');
    } else {
      getFilmData(searchData.results[0].id, msg, function(filmData) {
        if (parseFloat(filmData.vote_average)*10 >= 80){
          colour = green;
        } else if (parseFloat(filmData.vote_average)*10 >= 60 && parseFloat(filmData.vote_average)*10 < 80) {
          colour = yellow;
        }else if (parseFloat(filmData.vote_average)*10 < 60){
          colour = red;
        }

        embed.setDescription(`__**[${filmData.title}](https://www.themoviedb.org/movie/${filmData.id})**__`);
        embed.setColor(colour);
        embed.setThumbnail(`https://image.tmdb.org/t/p/w500${filmData.poster_path}`);
        embed.addField('Fecha de lanzamiento', `${filmData.release_date}`);
        embed.addField('Duracion', `${filmData.runtime} minutos`);
        embed.addField('Clasificación', `${filmData.vote_average}  - Puntuación del usuario`);
        embed.addField('Sinopsis', filmData.overview);
        embed.setFooter('===============================================');

        msg.edit({embed});
      });
    }
  });
};

function getFilmData(filmID, msg, callback) {
  var filmOptions = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${filmID}`,
    qs: {
      language: 'es-ES',
      api_key: config.tmdbKey
    },
    body: '{}'
  };

  request(filmOptions, function (error, response, filmData) {
    if (error || response.statusCode != 200) {
      console.log(error);
      msg.channel.send('Se ha producido un error en la búsqueda. Vuelve a intentarlo más tarde..');
      return;
    }
    try{
      filmData = JSON.parse(filmData);
    } catch(e) {
      console.log(e);
      msg.channel.send('Se ha producido un error en la búsqueda. Vuelve a intentarlo más tarde.');
      return;
    }
    return callback(filmData);
  });
}

function getSearchData(args, msg, callback) {
  var searchOptions = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/search/movie',
    qs: {
      include_adult: 'false',
      page: '1',
      query: args,
      language: 'es-ES',
      api_key: config.tmdbKey
    },
    body: '{}'
  };

  request(searchOptions, function (error, response, searchData) {
    if (error || response.statusCode != 200) {
      console.log(error);
      msg.channel.send('Se ha producido un error en la búsqueda. Vuelve a intentarlo más tarde.');
      return ;
    }
    try{
      searchData = JSON.parse(searchData);
    } catch(error) {
      console.log(error);
      msg.channel.send('Se ha producido un error en la búsqueda. Vuelve a intentarlo más tarde..');
      return;
    }
    return callback(searchData);
  });
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'peli',
  description: 'Buscar info de una peli.',
  usage: 'peli <pelicula>'
};
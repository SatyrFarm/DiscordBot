const Discord = require('discord.js');
const request = require("request");

request("http://opensimworld.com/farmstats/top.json", function(error, response, body) {
  // console.log(body);
  jsontop = body;
});
const leaderboardEmbed = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setTitle('Satyr Far Top20')
    .setURL('https://satyrfarm.github.io')
    .setAuthor('Satyr Farm Statistics', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
    .setDescription('As of now')
    .setThumbnail('https://i.imgur.com/wSTFkRM.png')
    .addField('#1 : Display Name , Username', 'Points')
    .addBlankField()
    .addField('Inline field title', 'Some value here', true)
    .addField('Inline field title', 'Some value here', true)
    .addField('Inline field title', 'Some value here', true)
    .setImage('https://i.imgur.com/wSTFkRM.png')
    .setTimestamp()
    .setFooter('Statistics are up to date as of the above timestamp', 'https://i.imgur.com/wSTFkRM.png');


module.exports = {
	name: 'top20',
	description: 'Allows you to view the top20 Satyr Farm Players',
	cooldown: 5,
	execute(message) {
		message.channel.send(jsontop);
		message.channel.send(leaderboardEmbed);

	},
};


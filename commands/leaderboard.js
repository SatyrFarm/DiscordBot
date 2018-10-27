const Discord = require('discord.js');

exports.run = async (client, message, _args, _level) => { // eslint-disable-line no-unused-vars

  const filtered = client.points.filterArray(p => p.guild === message.guild.id);

  const sorted = filtered.sort((a, b) => a.points - b.points).reverse();


  const top10 = sorted.splice(0, 10);

  const embed = new Discord.RichEmbed().setTitle("Leaderboard").setAuthor(client.user.username, client.user.avatarURL).setDescription("Our top 10 points leaders!").setColor(0x00Ae86);


  for (var i = 0; i < top10.length; i++) {
    var user = client.users.get(top10[i].user)


    embed.addField(user.tag || "User Left", `${top10[i].points} points (level ${top10[i].level})`);

  }


  return message.channel.send({
    embed
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "leaderboard",
  category: "Level",
  description: "Get the top 10",
  usage: "leaderboard"
};
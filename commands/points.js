exports.run = async (client, message) => {
  const key = `${message.guild.id}-${message.author.id}`;
  message
    .channel
    .send(`You currently have ${client.points.getProp(key, 'points')}, and are level ${client.points.getProp(key, 'level')}!`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User',
};

exports.help = {
  name: 'points',
  category: 'Level',
  description: 'Get your current amount of points',
  usage: 'points',
};

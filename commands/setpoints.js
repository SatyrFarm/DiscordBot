exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  if (!message.author.id === message.guild.owner) {
    return message.reply('You need permission to control me!');
  }

  const user = message
    .mentions
    .users
    .first() || client
    .users
    .get(args[0]) || message.author;
  if (!user) {
    return message.reply('You have to specify a user!');
  }

  const pointsToAdd = parseInt(args[1], 10);
  if (!pointsToAdd) {
    return message.reply('Please specify how many points to set...');
  }

  const key = `${message.guild.id}-${user.id}`;

  client
    .points
    .setProp(key, 'points', pointsToAdd);

  const userPoints = parseInt(client.points.getProp(key, 'points'), 10);
  const userLevel = parseInt(client.points.getProp(key, 'level'), 10);

  const curLevel = Math.floor(0.25 * Math.sqrt(userPoints));

  if (userLevel !== curLevel) {
    client
      .points
      .setProp(key, 'level', curLevel);
    client.emit('levelUpdate', message.member, message.guild, undefined);
  }

  message
    .channel
    .send(`${user.tag} has been set to ${pointsToAdd} points. Updated level to ${curLevel}`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [
    'setp', 'sp',
  ],
  permLevel: 'Moderator',
};

exports.help = {
  name: 'setpoints',
  category: 'Level',
  description: 'Sets users points',
  usage: 'set [user] [points]',
};

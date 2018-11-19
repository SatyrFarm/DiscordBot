exports.run = async (client, message, args, _level) => {
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
    return message.reply('You have to specify me a user to give points to!');
  }

  const pointsToAdd = parseInt(args[1], 10);
  if (!pointsToAdd) {
    return message.reply('Please specify how many points to give...');
  }

  const key = `${message.guild.id}-${user.id}`;

  const userPoints = parseInt(client.points.getProp(key, 'points'), 10);
  let u1 = userPoints + pointsToAdd;

  client
    .points
    .setProp(key, 'points', u1);

  const userLevel = parseInt(client.points.getProp(key, 'level'), 10);
  const curLevel = Math.floor(0.25 * Math.sqrt(userPoints));

  if (userLevel !== curLevel) {
    client.emit('levelUpdate', message.member, message.guild, undefined);

    client
      .points
      .setProp(key, 'level', curLevel);
  }

  message
    .channel
    .send(`${user.tag} has received ${pointsToAdd} points and now has a total of ${u1} points with a level of ${curLevel}.`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Moderator',
};

exports.help = {
  name: 'give',
  category: 'Level',
  description: 'Give users a certain amount of points',
  usage: 'give [user] [points]',
};

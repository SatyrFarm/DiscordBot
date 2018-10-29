exports.run = async (client, message, _args, _level) => {
  const key = `${message.guild.id}-${message.author.id}`;
  const level = client
    .points
    .getProp(key, 'level');
  const nextLevel = level + 1;
  const points = client
    .points
    .getProp(key, 'points');
  const nextPoints = Math.pow(nextLevel / 0.25, 2) - points;
  message.reply(`You currently have ${points} points and are level ${level}. You are ${nextPoints} points away from level ${nextLevel}.${nextPoints <= 20
    ? ' Almost there!'
    : ''}`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User',
};

exports.help = {
  name: 'nextlevel',
  category: 'Level',
  description: 'Gets next point value.',
  usage: 'nextlevel',
};

/*
  This command allows other users to give 'rep' to the ones who helped them. this is meant to
  replace the current ranking system which is based solely off the amount messages sent.
*/

exports.run = (client, message, args, _level) => {
  const user = message.mentions.users.first() || client.users.get(args[0]);


  if (!user) return message.reply('You have to specify a user!');
  if (user == message.author) return message.reply('You cannot give rep to yourself');


  args.splice(0, 1);
  let thanksMessage = args.join(' ');

  if (!thanksMessage.length > 0) thanksMessage = 'Thank You!';
  user.send(
    `${
      message.author.tag
    } says **${thanksMessage}**! Thank you for helping them out! Keep up the good work!`
  );

  const key = `${message.guild.id}-${user.id}`;

  if (!client.points.has(key)) {
    client.points.set(key, {
      user: user.id,
      guild: message.guild.id,
      points: 0,
      level: 0,
    });
  }

  let currentPoints = client.points.getProp(key, 'points') + 20;
  client.points.setProp(key, 'points', currentPoints);

  const curLevel = Math.floor(0.25 * Math.sqrt(currentPoints));

  const userLevel = parseInt(client.points.getProp(key, 'level'), 10);

  client.emit('levelUpdate', message.member, message.guild, message);

  if (userLevel !== curLevel) {
    client.points.setProp(key, 'level', curLevel);
    message.reply(
      `You have leveled up to level **${curLevel}**! Congratulations!`
    );
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['rep', 'reputation', 'thank'],
  permLevel: 'User',
};

exports.help = {
  name: 'rep',
  category: 'Level',
  description: 'Gives Rep to User',
  usage: 'rep <@user> [description]',
};
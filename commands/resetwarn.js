exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  // For guild owners only to prohibit abuse
  // TODO: Change this to moderators or admins
  if (!message.author.id === message.guild.owner) {
    return message.reply('You need permission to control me!');
  }

  // Get the user
  const user = message
    .mentions
    .users
    .first() || client
    .users
    .get(args[0]) || message.author;
  if (!user) {
    return message.reply('You have to specify a user!');
  }

  // Get the key value for enmap
  const key = `${message.guild.id}-${user.id}`;

  // Get the amount of warns to add
  const warnsToAdd = parseInt(args[1], 10);

  // If the user does not define what number to reset the user warns to, reset the
  // warns to 0
  if (!warnsToAdd) {
    client
      .warns
      .delete(key);
    message
      .channel
      .send(`${user.tag} has been reset to 0 warns.`);
  } else {
    client
      .warns
      .setProp(key, 'warns', warnsToAdd);
    const userwarns = parseInt(client.warns.getProp(key, 'warns'), 10);
    message
      .channel
      .send(`${user.tag} has been set to ${userwarns} warns.`);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [
    'setw', 'sw',
  ],
  permLevel: 'Moderator',
};

exports.help = {
  name: 'setwarns',
  category: 'Messages',
  description: 'Set the amount of warns',
  usage: 'setwarns [user] [warns]',
};

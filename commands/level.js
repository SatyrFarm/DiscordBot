exports.run = async (client, message) => {
  // BUG: Currently not working
  const scoreLevel = client.points.get(message.author.id).level;
  !scoreLevel ? message.channel.send("You have no levels yet.") : message.channel.send(`You are currently level ${scoreLevel}!`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "level",
  category: "Level",
  description: "Get your current level",
  usage: "level"
};

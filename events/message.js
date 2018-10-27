// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.

module.exports = async (client, message) => {

  const settings = message.settings = client.getGuildSettings(message.guild)



  if(message.member.roles.find("name", "muted")) {
    message.delete();
    return;
  }

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if (message.content.indexOf(settings.prefix) !== 0) {
    const key = `${message.guild.id}-${message.author.id}`;


    if (message.author.bot) return;
    if (!client.points.has(key)) {
      client.points.set(key, {
        user: message.author.id,
        guild: message.guild.id,
        points: 0,
        level: 0
      });
    }

    let currentPoints = client.points.getProp(key, "points");
    client.points.setProp(key, "points", ++currentPoints);

    const userPoints = parseInt(client.points.getProp(key, "points"), 10);
    const curLevel = Math.floor(0.25 * Math.sqrt(currentPoints));

    const userLevel = parseInt(client.points.getProp(key, "level"), 10);




    client.emit("levelUpdate", message.member, message.guild, message);



    if (userLevel !== curLevel) {

      client.points.setProp(key, "level", curLevel);
      message.reply(`You have leveled up to level **${curLevel}**! Congratulations!`);
    }

    return;
  };

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Get the user or member's permission level from the elevation
  const level = client.permlevel(message);

  // Check whether the command, or alias, exist in the collections defined
  // in app.js.
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  // using this const varName = thing OR otherthign; is a pretty efficient
  // and clean way to grab one of 2 values!
  if (!cmd) return;

  // Some commands may not be useable in DMs. This check prevents those commands from running
  // and return a friendly error message.
  if (cmd && !message.guild && cmd.conf.guildOnly)
    return message.channel.send("This command is unavailable via private message. Please run this command in a guild.");

  if (level < client.levelCache[cmd.conf.permLevel]) {
    if (settings.systemNotice === "true") {
      return message.channel.send(`You do not have permission to use this command.
  Your permission level is ${level} (${client.config.permLevels.find(l => l.level === level).name})
  This command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
    } else {
      return;
    }
  }


  // To simplify message arguments, the author's level is now put on level (not member so it is supported in DMs)
  // The "level" command module argument will be deprecated in the future.
  message.author.permLevel = level;

  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  }
  // If the command exists, **AND** the user has permission, run it.
  client.logger.cmd(`[CMD] ${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`);
  cmd.run(client, message, args, level);

};
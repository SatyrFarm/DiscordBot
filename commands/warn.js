exports.run = async (client, message, args) => {


    if (message.mentions.users.size < 1) return message.reply(`You must mention someone when you try to warn them!`);

    //Get user to warn
    const user = message.mentions.users.first() || client.users.get(args[0]);
    const member = message.mentions.members.first() || client.members.get(args[0]);

    //Get the reason from the message if it exists
    // let reason = args.slice(1).join(' ') || 'No reason specified';


    //User key value
    const key = `${message.guild.id}-${user.id}`

    // Check if key exists in database
    if (!client.warns.has(key)) {
        client.warns.set(key, {
            user: message.author.id,
            guild: message.guild.id,
            warn: 0
        });
    }


    //Get current warns of user
    const currWarns = client.warns.getProp(key, "warn");


    // If user has warns add one, else set warns to 1
    if (currWarns) {
        var newWarns = currWarns + 1;
        client.warns.setProp(key, "warn", newWarns);
        message.channel.send(`Warned ${user} - Total warns ${newWarns}`);
        client.emit("warnEvent", member, newWarns, message.guild);

    } else {
        client.warns.setProp(key, "warn", 1);
        message.channel.send(`Warned ${user} - Total warns 1`);
        client.emit("warnEvent", member, newWarns, message.guild);

    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['w'],
    permLevel: "Moderator"
};

exports.help = {
    name: "warn",
    category: "Messages",
    description: "Warn a user",
    usage: "warn [user] [reason]"
};
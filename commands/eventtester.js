/*
The HELP command is used to display every command's name and description
to the user, so that he may see what commands are available. The help
command is also filtered by level, so if a user does not have access to
a command, it is not shown to them. If a command name is given with the
help command, its extended help is shown.
*/

exports.run = (client, message, args, _level) => {
    const event = args[0];
    if (!event) return message.reply('You have to specify an event to test!');

    client.emit(event, message.member, message.guild);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['et', 'eventt', 'etest'],
    permLevel: 'Bot Admin',
};

exports.help = {
    name: 'eventtester',
    category: 'System',
    description: 'Tests event\'s',
    usage: 'eventtester [event name]',
};

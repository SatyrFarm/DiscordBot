const {
    version,
} = require('discord.js');

const moment = require('moment');

require('moment-duration-format');

const bVersion = require('project-version');

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const user = message
        .mentions
        .users
        .first() || client
        .users
        .get(args[0]);

    if (!user) {
        return message.reply('You have to specify a user!');
    }

    const userFor = moment
        .duration((Date.now() - user.createdTimestamp))
        .format('y [years], D [days], H [hrs], m [mins], s [secs]');


    const key = `${message.guild.id}-${user.id}`;
    if (!user.bot) {
        const userPoints = parseInt(client.points.getProp(key, 'points'), 10) || 0;
        const userLevel = parseInt(client.points.getProp(key, 'level'), 10) || 0;

        message
            .channel
            .send(`= User STATISTICS =
• Last Messsage  :: ${user.lastMessage.content || 'none'}
• Username       :: ${user.username + user.discriminator}
• Points         :: ${userPoints}
• Level          :: ${userLevel}
• Joined Discord :: ${userFor}
• Bot            :: ${user.bot}
• Warns          :: **COMING SOON**`, {
                code: 'asciidoc',
            });
    } else {
        message
            .channel
            .send(`= User STATISTICS =
• Last Messsage  :: ${user.lastMessage.content || 'none'}
• Username       :: ${user.username + user.discriminator}
• Joined Discord :: ${userFor}
• Bot            :: ${user.bot}`, {
                code: 'asciidoc',
            });
    }
    console.log(user);
};


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 'User',
};

exports.help = {
    name: 'user',
    category: 'Miscelaneous',
    description: 'Gives some useful user statistics',
    usage: 'stats [user]',
};

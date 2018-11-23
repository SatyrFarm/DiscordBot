const {
  version,
} = require('discord.js');

const moment = require('moment');

require('moment-duration-format');

const bVersion = require('project-version');

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const duration = moment
    .duration(client.uptime)
    .format(' D [days], H [hrs], m [mins], s [secs]');

  let channelsLen = client.channels;
  channelsLen = channelsLen.filter((channels) => channels.type !== 'dm' && channels.type !== 'category')
    .size
    .toLocaleString();

  const usersLen = message.guild.members.size.toLocaleString();

  message
    .channel
    .send(`= STATISTICS =
• Mem Usage   :: ${ (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime      :: ${duration}
• Users       :: ${usersLen}
• Servers     :: ${client.guilds.size.toLocaleString()}
• Channels    :: ${channelsLen}
• Bot Version :: v${bVersion}
• Discord.js  :: v${version}
• Node        :: ${process.version}`, {
      code: 'asciidoc',
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User',
};

exports.help = {
  name: 'stats',
  category: 'Miscelaneous',
  description: 'Gives some useful bot statistics',
  usage: 'stats',
};

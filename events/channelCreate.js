// This event executes when a message is deleted
const Discord = require('discord.js');

// String.prototype.toProperCase = function() {   return this.replace(/\w\S*/g,
// function(txt) {     return txt       .charAt(0)       .toUpperCase() + txt
// .substr(1)       .toLowerCase();   }); };

/*
function parseChange(message) {
  return message
    .replace(/_/g, ' ')
    .toProperCase();
}
*/

module.exports = async (client, channel) => {
  const logs = channel
    .guild
    .channels
    .find('name', 'logging');

  const entry = await channel
    .guild
    .fetchAuditLogs({type: 'CHANNEL_CREATE'})
    .then((audit) => audit.entries.first());

  // NOTE: Can add changes if it comes to it. Seems like a waste of space.

  /*
   var thingsChanged = [];

    entry.changes.forEach(change => {
        change.key = parseChange(change.key);
        thingsChanged.push(change);
    });

    */

  const embed = new Discord
    .RichEmbed()
    .setTitle('Channel Created')
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor(0x1afffd);
  embed.addField('User', entry.executor.username + '#' + entry.executor.discriminator);
  embed.addField('Channel Type', entry.target.type);
  embed.addField('Channel Name', entry.target.name);

  let currentdate = new Date();
  let datetime = currentdate.getDate() + '/' + (currentdate.getMonth() + 1) + '/' + currentdate.getFullYear() + ' @ ' + currentdate.getHours() + ':' + currentdate.getMinutes() + ':' + currentdate.getSeconds();

  embed.addField('Time', datetime);

  logs.send(embed);
};

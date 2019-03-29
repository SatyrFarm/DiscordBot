// This event executes when a message is deleted
const Discord = require('discord.js');

// BUG: Doesn't display user or repeats the same user most likely has something
// to do with the fetchAuditLogs()
module.exports = async (client, member) => {
  const logs = member
    .guild
    .channels
    .find((c) => c.name == 'logging');


  // NOTE: If they leave by themselves this is triggered and gets the most recent kick message
  // const entry = await member
  //   .guild
  //   .fetchAuditLogs({type: 'MEMBER_KICK'})
  //   .then((audit) => audit.entries.first());

  const embed = new Discord
    .RichEmbed()
    .setTitle('User Left')
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor(0xff268f);
  embed.addField('User', member.user.tag);

  let currentdate = new Date();
  let datetime = currentdate.getDate() + '/' + (currentdate.getMonth() + 1) + '/' + currentdate.getFullYear() + ' @ ' + currentdate.getHours() + ':' + currentdate.getMinutes() + ':' + currentdate.getSeconds();

  embed.addField('Time', datetime);

  logs.send(embed);
};
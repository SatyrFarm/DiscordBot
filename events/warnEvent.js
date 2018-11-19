// const Discord = require('discord.js');

module.exports = async (client, member, numWarns, guild) => {
  switch (numWarns) {
    case 1:
      // Nothing significant - Just ignore for now
      break;
    case 2:
      // Set user muted for 1 hour
      member.addRole(guild.roles.find((role) => role.name === 'muted'));
      setTimeout(function() {
        member.removeRole(guild.roles.find((role) => role.name === 'muted'));
      }, 1 * 60 * 60 * 1000);
      // HOUR * MIN * SEC * MILSEC

      break;
    case 3:
      // Set user muted for 12 hours
      member.addRole(guild.roles.find((role) => role.name === 'muted'));
      setTimeout(function() {
        member.removeRole(guild.roles.find((role) => role.name === 'muted'));
      }, 12 * 60 * 60 * 1000);
      // HOUR * MIN * SEC * MILSEC

      break;
    case 4:
      // Set user muted for 24 hours
      member.addRole(guild.roles.find((role) => role.name === 'muted'));
      setTimeout(function() {
        member.removeRole(guild.roles.find((role) => role.name === 'muted'));
      }, 24 * 60 * 60 * 1000);
      // HOUR * MIN * SEC * MILSEC
      break;
  }
};

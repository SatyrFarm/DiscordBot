require('dotenv').config();
const config = {
  // Global bot owner, level 10 is default
  'ownerID': '478280993422442497',

  // Global bot admins, level 9, array of the user ID strings
  'admins': [],
  

  // Bot Support, level 8
  'support': [],
  

  // Bot token
  'token': '',

// Sentry.io DSN
  'sentrydsn': '',

  // Default Server settings

  'defaultSettings': {
    'prefix': '+',
    'modLogChannel': 'mod-log',
    'modRole': 'Moderator',
    'adminRole': 'Administrator',
    'systemNotice': 'true',
    'welcomeChannel': 'welcome',
    'welcomeMessage': 'Say hello to {{user}}, everyone!',
    'welcomeEnabled': 'false',
    'openTicketsId': 'undefined',
    'closedTicketsId': 'undefined',
  },

  // Permission Level Definitions
  'permLevels': [
    // 0 to 10, 0 being the lowest
    {
      level: 0,
      name: 'User',
      check: () => true
    },

    // From this permission level or higher should be for staff only
    {
      level: 2,
      name: 'Moderator',
      check: (message) => {
        try {
          const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
          if (modRole && message.member.roles.has(modRole.id)) return true;
        } catch (e) {
          return false;
        }
      }

    },
    {
      level: 3,
      name: 'Administrator',
      check: (message) => {
        try {
          const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
          return (adminRole && message.member.roles.has(adminRole.id));
        } catch (e) {
          return false;
        }
      }
    },
    {
      level: 4,
      name: 'Server Owner',
      check: (message) => message.channel.type === 'text' ? (message.guild.owner.user.id === message.author.id ? true : false) : false
    },
    // Bot Support is a special inbetween level that has the equivalent of server owner access
    // to any server they joins, in order to help troubleshoot the bot on behalf of owners.
    {
      level: 8,
      name: 'Bot Support',
      // The check is by reading if an ID is part of this array. Yes, this means you need to
      // change this and reboot the bot to add a support user. Make it better yourself!
      check: (message) => config.support.includes(message.author.id)
    },

    // Bot Admin has some limited access like rebooting the bot or reloading commands.
    {
      level: 9,
      name: 'Bot Admin',
      check: (message) => config.admins.includes(message.author.id)
    },

    // This is the bot owner, this should be the highest permission level available.
    // The reason this should be the highest level is because of dangerous commands such as eval
    // or exec (if the owner has that).
    {
      level: 10,
      name: 'Bot Owner',
      // Another simple check, compares the message author id to the one stored in the config file.
      check: (message) => message.client.config.ownerID === message.author.id
    }
  ]
}

module.exports = config;

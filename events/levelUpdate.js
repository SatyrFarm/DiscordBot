// This event executes when a new member joins a server. Let's welcome them!

module.exports = async (client, member, guild, message) => {
  const key = `${guild.id}-${member.id}`;
  let level = parseInt(client.points.getProp(key, 'level'));

  // NOTE: Debug messages console.log('Key: ', key); console.log('Level: ',
  // level); console.log('Member ID: ', member.id)

  const findMemberRole = name => member.roles.find(role => role.name === name);
  const findGuildRole = name => guild.roles.find(role => role.name === name);

  const roles = {
    restricted: {
      Geeks: findMemberRole('Geeks'),
      Mod: findMemberRole('Mod'),
      Admin: findMemberRole('Admin'),
    },
    unrestricted: {
      'Intern': {
        guildRole: findGuildRole('Intern'),
        memberHas: findMemberRole('Intern'),
        lowerLevel: 0,
        upperLevel: 3,
      },
      'Junior Dev': {
        guildRole: findGuildRole('Junior Dev'),
        memberHas: findMemberRole('Junior Dev'),
        lowerLevel: 3,
        upperLevel: 5,
      },
      'Dev': {
        guildRole: findGuildRole('Dev'),
        memberHas: findMemberRole('Dev'),
        lowerLevel: 5,
        upperLevel: 7,
      },
      'Senior Dev': {
        guildRole: findGuildRole('Senior Dev'),
        memberHas: findMemberRole('Senior Dev'),
        lowerLevel: 7,
        upperLevel: 9999,
      },
    },
  };

  // if member has one of the 'restricted' roles, return and don't bother with levels
  for (let role in roles.restricted) {
    if (roles.restricted[role]) {
      return;
    }
  }

  for (let role in roles.unrestricted) {
    // get everything from the role
    const {guildRole, memberHas, lowerLevel, upperLevel} = roles.unrestricted[
      role
    ];

    // if they are between the upper and lower settings
    // has to specify the 0 because 0 is not greater than 0, and you dont want to have >=
    // on a lower bound

    if (
      (level > lowerLevel || (level === 0 && lowerLevel === 0)) &&
      level <= upperLevel
    ) {
      // making an array of roles to be deleted
      let rolesToDelete = [];

      for (let roleObj in roles.unrestricted) {
        roleObj = roles.unrestricted[roleObj];
        if (roleObj.guildRole.name === role) {
          continue;
        } else {
          if (roleObj.memberHas) {
            rolesToDelete.push(roleObj);
          }
        }
      }

      // removing roles
      rolesToDelete.map(role => {
        member.removeRole(role.guildRole);
        console.log('removed role');
      });

      // if they dont have the role, give it to them
      if (!memberHas) {
        member.addRole(guildRole);

        // if the role is not intern, congragulate them.
        if (role !== 'Intern') {
          message.reply(
            `You have leveled up to the next rank, **${role}**! Congratulations!`
          );
        }
      }
    }
  }
};
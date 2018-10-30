// This event executes when a new member joins a server. Let's welcome them!
module.exports = async (client, member, guild, message) => {
    const key = `${guild.id}-${member.id}`;
    let level = parseInt(client.points.getProp(key, 'level'));

    // NOTE: Debug messages
    // console.log("Key: ", key);
    // console.log("Level: ", level);
    // console.log("Member ID: ", member.id)
    // TODO: In the future use better removal of previous roles
    // TODO: Add automatic role creation
    // FUTURE: Add a prestige funciton for staff, but only based off of points that users approve, ie. +approve <User> and it boosts their points. Has to be low points
    
    // BUG: This is not working
    // Exempt ranks
    if (member.roles.find('name', 'sf-developer') || member.roles.find('name', 'Moderator') || member.roles.find('name', 'Administrator')) return;


    if (level <= 3) {
        // Farmhand < 225

    if (member.roles.find('name', 'Senior Farmhand')) {
      member.removeRole(guild.roles.find((role) => role.name == 'Senior Farmhand'));
    }
    if (member.roles.find('name', 'Farmer')) {
      member.removeRole(guild.roles.find((role) => role.name == 'Farmer'));
    }
    if (member.roles.find('name', 'Old Wise One')) {
      member.removeRole(guild.roles.find((role) => role.name == 'Old Wise One'));
    }

        // Ensure they already have the role
        if (member.roles.find('name', 'Farmhand')) return;

        // Add Farmhand role
        member.addRole(guild.roles.find(role => role.name === 'Farmhand'));

    } else if (level > 3 && level <= 5) {
        // Senior Farmhand, 225 - 624

        // Check if user already has the role
        if (member.roles.find('name', 'Senior Farmhand')) return;

        // Remove previous role
        if (member.roles.find('name', 'Farmhand')) member.removeRole(guild.roles.find(role => role.name === 'Farmhand'));

        // Add Senior Farmhand role
        member.addRole(guild.roles.find(role => role.name === 'Senior Farmhand'));

        if (message) return message.reply(`You have leveled up to the next rank, **Senior Farmhand**! Congratulations!`);

    } else if (level > 5 && level <= 7) {
        // Farmer, 625-1224

        // Check if user already has the role
        if (member.roles.find('name', 'Farmer')) return;

        // Remove previous roles
        if (member.roles.find('name', 'Farmhand')) member.removeRole(guild.roles.find(role => role.name === 'Farmhand'));
        if (member.roles.find('name', 'Senior Farmhand')) member.removeRole(guild.roles.find(role => role.name == 'Senior Farmhand'));

        // Add Farmer role
        member.addRole(guild.roles.find(role => role.name === 'Farmer'));

        if (message) return message.reply(`You have leveled up to the next rank, **Farmer**! Congratulations!`);



    } else if (level > 7 && level <= 9) {
        // Old Wise One , 1224 - 2025

        // Check if user already has the role
        if (member.roles.find('name', 'Old Wise One')) return;

        // Remove previous roles
        if (member.roles.find('name', 'Farmhand')) member.removeRole(guild.roles.find(role => role.name === 'Farmhand'));
        if (member.roles.find('name', 'Senior Farmhand')) member.removeRole(guild.roles.find(role => role.name == 'Senior Farmhand'));
        if (member.roles.find('name', 'Farmer')) member.removeRole(guild.roles.find(role => role.name === 'Farmer'));

        // Add Old Wise One role
        member.addRole(guild.roles.find(role => role.name === 'Old Wise One'));

        if (message) return message.reply(`You have leveled up to the next rank, **Old Wise One**! Congratulations! You may now go too the front porch and get some iced tea and your shotgun on the rocking chair`);



    } else {
        // What ever, 2+ points
        // NOTE: Decide last rank at this time they have 10k+ messages so either a bug, rewarded these points or other
    }


};

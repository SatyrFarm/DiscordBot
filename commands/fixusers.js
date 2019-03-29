exports.run = async (client, message, args, level) => {
    // Define the guild from message
    let guild = message.guild;
    let guildSize = message.guild.members.size;
    const msg = await message
        .channel
        .send('Starting to itterate through all ' + guildSize);

    // Itterate through the collection of GuildMembers from the guild
    let i = 0;
    guild.members.forEach(member => {
        const key = `${member.guild.id}-${member.id}`;
        if (!client.points.has(key)) {
            client.points.set(key, {
                user: member.id,
                guild: member.guild.id,
                points: 0,
                level: 0,
            });
            console.log(`Fixed user id ${member.id} on ${member.guild.id}`);
        }
        i++;
        msg.edit(`Itterated ${(i / guildSize) * 100}% through the total of ${guildSize} users.`);
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 'Bot Admin',
};

exports.help = {
    name: 'fixusers',
    category: 'System',
    description: 'Itterates over the users and fixes stuff',
    usage: 'fixusers',
};
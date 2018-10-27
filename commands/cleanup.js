exports.run = async (client, message, _args, _level) => { 
    //Filter all people in points that are in this guild
    const filtered = client.points.filter(p => p.guild === message.guild.id);


    //Get the current date and filter again to see if we have them
    const rightNow = new Date();
    const toRemove = filtered.filter(data => {
        return !message.guild.members.has(data.user) || rightNow - 2592000000 > data.lastSeen;
    });

    toRemove.forEach(data => {
        client.points.delete(`${message.guild.id}-${data.user}`);
    });


    const msg = await message.channel.send("I've cleaned up " + toRemove.size + " old farts.");
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Moderator"
};

exports.help = {
    name: "cleanup",
    category: "Miscelaneous",
    description: "Cleans up weird people.",
    usage: "cleanup"
};
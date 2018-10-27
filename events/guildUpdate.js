// This event executes when a message is deleted
const Discord = require('discord.js');


String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

function parseGuildChange(message) {
    return message.replace(/_/g, " ").toProperCase();
}


module.exports = async (client, guild) => {

    const logs = guild.channels.find('name', 'logging');

    const entry = await guild.fetchAuditLogs({
        type: 'GUILD_UPDATE'
    }).then(audit => audit.entries.first());

    /*
        Name of event is entry.changes[n].key
        Where n is the number of changes

    */

    var thingsChanged = [];

    entry.changes.forEach(change => {
        change.key = parseGuildChange(change.key);
        thingsChanged.push(change);
    });


    const embed = new Discord.RichEmbed().setTitle("Guild Updated").setAuthor(client.user.username, client.user.avatarURL).setColor(0x1afffd);
    embed.addField("User", entry.executor.username + "#" + entry.executor.discriminator);

    var n = 0;
    thingsChanged.forEach(change => {
        n++;
        embed.addField("Change #" + n, `${change.key} \n Old: ${change.old} \n New: ${change.new}` || "Error");
    });

    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/" +
        (currentdate.getMonth() + 1) + "/" +
        currentdate.getFullYear() + " @ " +
        currentdate.getHours() + ":" +
        currentdate.getMinutes() + ":" +
        currentdate.getSeconds();

    embed.addField("Time", datetime);


    logs.send(embed);

};
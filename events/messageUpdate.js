// This event executes when a message is deleted
const Discord = require('discord.js');

// BUG: On link post it updates the post to add the embed and triggers this event
// BUG: Repeats the same message on the Unofficla Node.js Discord Server
module.exports = async (client, oldMessage, newMessage) => {
    var old = oldMessage;
    var new_ = newMessage;


    const logs = oldMessage.guild.channels.find('name', 'logging');

    const embed = new Discord.RichEmbed().setTitle("Message Update").setAuthor(client.user.username, client.user.avatarURL).setColor(0xff268f);
    embed.addField("User", old.author.username + "#" + old.author.discriminator);
    embed.addField("Old", old.content);
    embed.addField("New", new_.content);

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
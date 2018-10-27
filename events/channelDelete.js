// This event executes when a message is deleted
const Discord = require('discord.js');


module.exports = async (client, channel) => {

    const logs = channel.guild.channels.find('name', 'logging');

    const entry = await channel.guild.fetchAuditLogs({
        type: 'CHANNEL_DELETE'
    }).then(audit => audit.entries.first());


    /*
    GuildAuditLogsEntry {
        targetType: 'CHANNEL',
        actionType: 'DELETE',
        action: 'CHANNEL_DELETE',
        reason: null,
        executor: User {
            id: '206857563206189058',
            username: 'ℚ.',
            discriminator: '7750',
            avatar: '65518c51d124a81a157b22afa2723f78',
            bot: false,
            lastMessageID: '475503880109686796',
            lastMessage: Message {
                channel: [Object],
                id: '475503880109686796',
                type: 'DEFAULT',
                content: '+et channelDelete',
                author: [Object],
                member: [Object],
                pinned: false,
                tts: false,
                nonce: '475503879019036672',
                system: false,
                embeds: [],
                attachments: Collection {},
                createdTimestamp: 1533439359453,
                editedTimestamp: null,
                reactions: Collection {},
                mentions: [Object],
                webhookID: null,
                hit: null,
                _edits: [],
                settings: [Object],
                flags: []
            },
            permLevel: 10
        },
        changes: [{
                key: 'name',
                old: 'test',
                new: undefined
            },
            {
                key: 'type',
                old: 0,
                new: undefined
            },
            {
                key: 'nsfw',
                old: false,
                new: undefined
            },
            {
                key: 'permission_overwrites',
                old: [Array],
                new: undefined
            }
        ],
        id: '474442036293140490',
        extra: null,
        target: undefined
    }

    */

    console.log(entry);


    const embed = new Discord.RichEmbed().setTitle("Channel Deleted").setAuthor(client.user.username, client.user.avatarURL).setColor(0xff6b21);

    embed.addField("Executor: ", entry.executor.username + "#" + entry.executor.discriminator);
    embed.addField("Reason", entry.reason)

    embed.addField("Audit ID", entry.id)

    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/" +
        (currentdate.getMonth() + 1) + "/" +
        currentdate.getFullYear() + " @ " +
        currentdate.getHours() + ":" +
        currentdate.getMinutes() + ":" +
        currentdate.getSeconds();

    embed.addField("Time", datetime);

    // TODO: Add channel name

    logs.send(embed);

};
// This event executes when a message is deleted
const Discord = require('discord.js');

// BUG: Doesn't display user or repeats the same user most likely has something
// to do with the fetchAuditLogs()
module.exports = async (client, member) => {
  const logs = member
    .guild
    .channels
    .find('name', 'logging');

  /*

        GuildMember {
            guild: Guild {},
            user: User {
                id: '206857563206189058',
                username: 'ℚ.',
                discriminator: '7750',
                avatar: '65518c51d124a81a157b22afa2723f78',
                bot: false,
                lastMessageID: '475504914353750053',
                lastMessage: Message {
                    channel: [Object],
                    id: '475504914353750053',
                    type: 'DEFAULT',
                    content: '+et guildMemberRemove',
                    author: [Object],
                    member: [Object],
                    pinned: false,
                    tts: false,
                    nonce: '475504914106155008',
                    system: false,
                    embeds: [],
                    attachments: Collection {},
                    createdTimestamp: 1533439606036,
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
            _roles: ['329063909510217729',
                '471829992746254376',
                '471841548011700224'
            ],
            serverDeaf: false,
            serverMute: false,
            selfMute: undefined,
            selfDeaf: undefined,
            voiceSessionID: undefined,
            voiceChannelID: undefined,
            speaking: false,
            nickname: null,
            joinedTimestamp: 1498524793885,
            lastMessageID: '475504914353750053',
            lastMessage: Message {
                channel: TextChannel {
                    type: 'text',
                    id: '466785495922245652',
                    name: 'logging',
                    position: 1,
                    parentID: null,
                    permissionOverwrites: [Object],
                    topic: null,
                    nsfw: false,
                    lastMessageID: '475504914353750053',
                    guild: [Object],
                    messages: [Object],
                    _typing: Map {},
                    lastMessage: [Object]
                },
                id: '475504914353750053',
                type: 'DEFAULT',
                content: '+et guildMemberRemove',
                author: User {
                    id: '206857563206189058',
                    username: 'ℚ.',
                    discriminator: '7750',
                    avatar: '65518c51d124a81a157b22afa2723f78',
                    bot: false,
                    lastMessageID: '475504914353750053',
                    lastMessage: [Object],
                    permLevel: 10
                },
                member: [Circular],
                pinned: false,
                tts: false,
                nonce: '475504914106155008',
                system: false,
                embeds: [],
                attachments: Collection {},
                createdTimestamp: 1533439606036,
                editedTimestamp: null,
                reactions: Collection {},
                mentions: MessageMentions {
                    everyone: false,
                    users: Collection {},
                    roles: Collection {},
                    _content: '+et guildMemberRemove',
                    _client: [Object],
                    _guild: [Object],
                    _members: null,
                    _channels: null
                },
                webhookID: null,
                hit: null,
                _edits: [],
                settings: {},
                flags: []
            }
        }
    */

  const entry = await member
    .guild
    .fetchAuditLogs({type: 'MEMBER_KICK'})
    .then((audit) => audit.entries.first());

  const embed = new Discord
    .RichEmbed()
    .setTitle('User Left')
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor(0xff268f);
  // embed.addField('Kicker', entry.executor.username + '#' +
  // entry.executor.discriminator);
  embed.addField('User', member.user.tag);
  embed.addField('Reason', entry.reason || 'Left on their own volition');

  let currentdate = new Date();
  let datetime = currentdate.getDate() + '/' + (currentdate.getMonth() + 1) + '/' + currentdate.getFullYear() + ' @ ' + currentdate.getHours() + ':' + currentdate.getMinutes() + ':' + currentdate.getSeconds();

  embed.addField('Time', datetime);

  logs.send(embed);
};

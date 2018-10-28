// This event executes when a new member joins a server. Let's welcome them!

module.exports = (client, member) => {
  // Load the guild's settings
  const settings = client.getGuildSettings(member.guild);

  // console.log(member.user.username);
  checkUserName(member.user, member.guild, client);

  // PM The user the rules
  pmUserRules(member, client);

  // Give the person the intern role on join
  // NOTE: Only for the Unofficial Node.js Discord Server
  member.addRole(member.guild.roles.find((role) => role.name === 'Intern'));

  // If welcome is off, don't proceed (don't welcome the user)
  if (settings.welcomeEnabled !== 'true') {
    return;
  } else {
    // Replace the placeholders in the welcome message with actual data
    const welcomeMessage = settings
      .welcomeMessage
      .replace('{{user}}', member);

    // Send the welcome message to the welcome channel There's a place for more
    // configs here.
    member
      .guild
      .channels
      .find('name', settings.welcomeChannel)
      .send(welcomeMessage)
      .catch(console.error);
    // TODO: Ensure the channel is created
  }
};

function pmUserRules(user, client) {
  client
    .logger
    .log(`[JOIN] A user just joined and has been messaged the rules.`);

  user.send(`Welcome to our Discord Server, The Unofficial Node.js Server! 
  ----- 
  Before you start jumping into different rooms and such, go to the bottom left of the webpage/desktop app and click that gear on the bottom left! In there, change your display picture, and whatever settings you may think should be changed. We highly recommend you enable Push To Talk, it'll just help those in the same voice channels if you have a lot of background noise.
  -----
  Now, for the serious part.
  -----
  Rules(They're pretty simple):
  1. Don't be dumb. Use common sense.
  2. Be respectful, this one won't get you in trouble for breaking it but if you're disrespecting people on a personal level and everyone is aware, you're probably going to get yelled at.
  3. No NSFW images/videos/texts.
  4. Please keep all general JavaScript help to <#356188127058198528> & all Discord.js help to <#356188090039009280>. All general talk about JavaScript should be in #main.
  -----
  If you need a mod to help you with an issue that is NOT regarding programming or Node.js please at me @ℚ.#7750 or sending me a private message if I am not online. To send me a private message, click the three people at the top left,  press the Find and Start a Conversation button, and type my name (@ℚ.#7750) in the area.
  
  *If you have any feedback, want to request a change, or add/remove something please send it in #feedback in a way that is well formatted and documented(We are almost all programmers we hopefully know how to document things well)*`, {code: 'asciidoc'});
}

function checkUserName(user, guild, client) {
  // (https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-
  // z]
  let reDiscord = new RegExp('(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]');
  // let re_link = new
  // RegExp('(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.
  // ] {1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$');
  let userName = user.username;

  let reason = 'Invite link Username - Autoban';

  if (reDiscord.test(userName)) {
    // if (re_discord.test(userName) || re_link.test(userName)) {
    let member = guild
      .members
      .get(user.id);
    if (!member.bannable) {
      client
        .logger
        .log(`I cannot ban ${member.user.tag}! Do they have a higher role? Do I have ban permissions?`);
    } else {
      member
        .ban(reason)
        .catch((error) => client.logger.error(`Sorry, I couldn't ban because of : ${error}`));

      client
        .logger
        .log(`${member.user.tag} has been banned by the bot because: ${reason}`);
    }
  }
}

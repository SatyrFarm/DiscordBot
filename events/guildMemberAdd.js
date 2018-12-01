// This event executes when a new member joins a server. Let's welcome them!

module.exports = (client, member) => {
  // Load the guild's settings
  const settings = client.getGuildSettings(member.guild);
  // PM The user the rules
  if (member.bot === false) {
    pmUserRules(member, client);
}
  // Give the person the intern role on join
  // NOTE: Only for the Unofficial Node.js Discord Server
  member.addRole(member.guild.roles.find((role) => role.name === 'Farmhand'));
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
/**
 * Sends a welcome message to the user who joined
 * @param {object} user
 * @param {object} client
 */
function pmUserRules(user, client) {
  user.send(`Welcome to our Discord Server, The SatyrFarm/OpenSimWorld Discord Server!
-----
Before you start jumping into different rooms and such, go to the bottom left of the webpage/desktop app and
click that gear on the bottom left! In there, change your display picture, and whatever settings you may think should be changed. 
We highly recommend you enable Push To Talk, it'll just help those in the same voice channels if you have a lot of background noise.
----
Now, for the serious part.
-----
Rules(They're pretty simple):
1. Don't be dumb. Use common sense.
2. Be respectful, this one won't get you in trouble for breaking it but if you're disrespecting people on a personal level and everyone is aware, you're probably going to get yelled at.
3. No NSFW images/videos/texts.
4. Please keep all topics to the appropiate channel
-----
*If you have any feedback, want to request a change, or add/remove something please send it in #feedback in a way that is well formatted and documented`);
}

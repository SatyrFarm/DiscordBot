/*
Copyright 2018 Satyr Farm and Cody Cooper

Permission is hereby granted, free of charge,
to any person obtaining a copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const {RichEmbed} = require('discord.js'); // Getting RichEmbed from discord.js. Same as Discord.RichEmbed()
const request = require('request-promise'); // A new async request module

const embed = new RichEmbed()
  .setColor('#0099ff')
  .setTitle('Satyr Far Top20')
  .setURL('https://satyrfarm.github.io')
  .setAuthor(
    'Satyr Farm Statistics',
    'https://opensimworld.com/css/sflogo.png',
    'https://discord.js.org'
  )
  .setDescription('As of now')
  .setThumbnail('https://opensimworld.com/css/sflogo.png')
  .addBlankField()
  .setImage('https://opensimworld.com/css/sflogo.png')
  .setTimestamp()
  .setFooter(
    'Statistics are up to date as of the this timestamp',
    'https://opensimworld.com/css/sflogo.png'
  );

const createEmbed = async () => {
  try {
    const body = await request('https://opensimworld.com/farmstats/top.json'); // body is the body of the request
    const users = JSON.parse(body); // users will be the parsed body
    users.forEach((user, i) => { // loops through all the users
      if (i > 19) return; // since the index is 0-filed, it will start at 0 and go to 19 for 20 users
      const {username, displayName, farmPoints} = user; // destructures the user object into username, display_name, and points
      const name = displayName ? displayName : username; // if there is a display_name show that, if not show username
      embed.addField(
        name,
        farmPoints.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') // adds commas for numbers
      );
    });
  } catch (e) {
    console.log(
      `Failure loading "http://opensimworld.com/farmstats/top.json". Error: ${e}` // if the request returns anything but code: 200
    );
  }
};
exports.run = async (client, message, _args, _level) => { // eslint-disable-line no-unused-vars
  await createEmbed(); // waits for the embed to be created
    message.channel.send({embed }); // sends the embed. exactly the same as message.channel.send({embed: embed});
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User',
};
exports.help = {
  name: 'top20',
  category: 'Satyr Farm',
  description: 'Shows the top20 Satyr Farm Players',
  usage: 'top20',
};

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

const {RichEmbed } = require('discord.js'); // Getting RichEmbed from discord.js. Same as Discord.RichEmbed()
const request = require('request-promise'); // A new async request module
const embed = new RichEmbed()
  .setColor('#0099ff')
  .setTitle('Popular Regions from OpenSimWorld')
  .setURL('https://opensimworld.com')
  .setAuthor('Satyr Farm Statistics')
  .setDescription('These are the most popular regions in OpenSimWorld')
  .addBlankField()
  .setTimestamp()
  .setFooter(
    'Statistics are up to date as of the this timestamp'
  );
const createEmbed = async () => {
  try {
    const body = await request('http://opensimworld.com/gateway/get.json?cmd=popular'); // body is the body of the request
    const regions = JSON.parse(body); // Regions are Parsed
    regions.forEach((region, i) => { // loop regions
      if (i > 19) return; // since the index is 0-filed, it will start at 0 and go to 19 for 20 regions
      var{ title, totalAvis } = region; // destructures the region object into title and avatars
      
      embed.addField(
        title,
        totalAvis,
        true
      );
    });
  } catch (e) {
    console.log(
      `Failure loading 'http://opensimworld.com/farmstats/top.json'. Error: ${e}` // if the request returns anything but code: 200
    );
  }
};
exports.run = async (client, message, _args, _level) => { // eslint-disable-line no-unused-vars
  await createEmbed(); // waits for the embed to be created
    message.channel.send({ embed }); // sends the embed. exactly the same as message.channel.send({embed: embed});

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User'
};
exports.help = {
  name: 'topregions',
  category: 'OpenSimWorld',
  description: 'Shows the most popular regions according to OpenSimWorld',
  usage: 'topregions'
};

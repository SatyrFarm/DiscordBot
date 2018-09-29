const { RichEmbed } = require("discord.js"); // Getting RichEmbed from discord.js. Same as Discord.RichEmbed()
const request = require("request-promise"); // A new async request module

const embed = new RichEmbed()
  .setColor("#0099ff")
  .setTitle("Satyr Far Top20")
  .setURL("https://satyrfarm.github.io")
  .setAuthor(
    "Satyr Farm Statistics",
    "https://i.imgur.com/wSTFkRM.png",
    "https://discord.js.org"
  )
  .setDescription("As of now")
  .setThumbnail("https://i.imgur.com/wSTFkRM.png")
  .addField("#1 : Display Name , Username", "Points")
  .addBlankField()
  .setImage("https://i.imgur.com/wSTFkRM.png")
  .setTimestamp()
  .setFooter(
    "Statistics are up to date as of the above timestamp",
    "https://i.imgur.com/wSTFkRM.png"
  );

const createEmbed = async () => {
  try {
    const body = await request("http://opensimworld.com/farmstats/top.json"); // body is the body of the request
    const users = JSON.parse(body); // users will be the parsed body
    users.forEach((user, i) => { // loops through all the users
      if (i > 19) return; // since the index is 0-filed, it will start at 0 and go to 19 for 20 users
      const { username, display_name, farmPoints } = user; // destructures the user object into username, display_name, and points
      const name = display_name ? display_name : username; // if there is a display_name show that, if not show username
      embed.addField(
        name,
        farmPoints.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") // adds commas for numbers
      );
    });
  } catch (e) {
    console.log(
      `Failure loading "http://opensimworld.com/farmstats/top.json". Error: ${e}` // if the request returns anything but code: 200
    );
  }
};

module.exports = {
  name: "top20",
  description: "Allows you to view the top20 Satyr Farm Players",
  cooldown: 5,
  async execute(message) {
    await createEmbed(); // waits for the embed to be created
    message.channel.send({ embed }); // sends the embed. exactly the same as message.channel.send({embed: embed});
  }
};

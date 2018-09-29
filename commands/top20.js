const { RichEmbed } = require("discord.js");
const request = require("request-promise");

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
    const users = await request("http://opensimworld.com/farmstats/top.json");
    users.forEach((user, i) => {
      if (i > 19) return;
      const { username, display_name, farmPoints } = user;
      const name = display_name ? display_name : username;
      embed.addField(
        name,
        farmPoints.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      );
    });
  } catch (e) {
    console.log(
      `Failure loading "http://opensimworld.com/farmstats/top.json". Error: ${e}`
    );
  }
};

module.exports = {
  name: "top20",
  description: "Allows you to view the top20 Satyr Farm Players",
  cooldown: 5,
  async execute(message) {
    await createEmbed();
    message.channel.send({ embed });
  }
};

exports.run = async (client, message, _args, _level) => {
  const {
    id,
    tag
  } = message.author;
  const {
    guild
  } = message;

  // open tickets category id
  const categoryId = message.settings.openTicketsId;

  // user key
  const key = `${guild}-${id}`;
  z
  // check if user is in database
  if (!client.tickets.has(key)) {
    client
      .tickets
      .set(key, {
        user: id,
        guild,
        openTickets: [],
        closedTickets: []
      });
  }

  // get amount of open tickets
  const openTickets = client
    .tickets
    .getProp(key, "openTickets");
  const closedTickets = client
    .tickets
    .getProp(key, "closedTickets");

  if (!categoryId) {
    return message.reply("Please set the id of the open tickets category. To set use `+set edit openTicket" +
      "sId <categoryId>`");
  }
  // only make a new ticket if there are none open
  if (openTickets.length === 0) {
    let m = message
      .content
      .split(" ");
    m.splice(0, 1); // remove command [+ticket]
    m = m.join(" "); // join, and split by comma

    let tags;

    if (m) {
      tags = m;
    } // if m is defined, set tags as m

    // title ex: reid#6340_1, reid#6340_2, etc.
    const title = `${tag}_${closedTickets.length + 1}`;
    const type = "text";
    guild.createChannel(title, type) // create a text channel with the set title
      .then((c) => {
        c.sendMessage("[TICKET] " + tags + "\n" + tag);
        c
          .setParent(categoryId)
          .then((u) => {
            // set the parent to the tickets category
            u
              .setTopic(tags)
              .then((n) => {
                // set the topic to the tags
                client
                  .tickets
                  .setProp(key, "openTickets", [
                    ...openTickets,
                    n.id
                  ]); // add the channel id to the openTickets
              });
          });
      });
  } else {
    return message.reply("You already have a ticket open. Please resolve that ticket first, then come back" +
      ".");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "ticket",
  category: "Development Help",
  description: "Creates a new help ticket (channel)",
  usage: "ticket <optional: tags (CSV)>"
};
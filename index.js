const Discord = require('discord.js');
const client = new Discord.Client();

const {promisify} = require('util');
const readdir = promisify(require('fs').readdir);

const Enmap = require('enmap');
const Provider = require('enmap-sqlite');
const EnmapLevel = require('enmap-level');

client.config = require('./config.js');
client.logger = require('./util/Logger');
require('./modules/functions.js')(client);
const Sentry = require('@sentry/node');
Sentry.init({dsn: client.config.sentrydsn});

client.commands = new Enmap();
client.aliases = new Enmap();

client.settings = new Enmap({
  provider: new EnmapLevel({
    name: 'settings',
  }),
});

client.points = new Enmap({
  provider: new Provider({
    name: 'points',
  }),
});

client.warns = new Enmap({
  provider: new Provider({
    name: 'warns',
  }),
});

client.tickets = new Enmap({
  provider: new Provider({
    name: 'tickets',
  }),
});

const init = async () => {
  // Each of our command files
  const cmdFiles = await readdir('./commands/');
  cmdFiles.forEach(f => {
    if (!f.endsWith('.js')) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });

  // Each of our event files
  const evtFiles = await readdir('./events/');
  evtFiles.forEach(file => {
    if (!file.endsWith('.js')) return;

    const eventName = file.split('.')[0];
    const event = require(`./events/${file}`);

    const response = client.loadEvent(eventName, event);
    if (response) client.logger.error(`Error loading event. ${response}`);

    delete require.cache[require.resolve(`./events/${file}`)];
  });

  // Create a cache of our clients permissions
  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  client.login(client.config.token);
};

init();

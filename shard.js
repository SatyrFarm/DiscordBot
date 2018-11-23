const args = require('yargs').argv;
const Discord = require('discord.js');

console.log('Starting up with ' + args.shard + 'shards');  
var possibleGuilds = args.shard * 2500;
console.log('You can have up to ' + possibleGuilds + ' possible servers your bot is in'); 
const Manager = new Discord.ShardingManager('index.js');
Manager.spawn(2); // This example will spawn 2 shards (5,000 guilds);

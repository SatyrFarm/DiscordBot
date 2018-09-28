module.exports = {
	name: 'sfsite',
	description: 'Sends a link to the Satyr Farm Website',
	cooldown: 0,
	execute(message) {
		message.channel.send('https://satyrfarm.github.io');
	},
};


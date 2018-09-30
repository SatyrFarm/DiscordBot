var JokesArray = ['What do you call a cow with no legs?
Ground beef.', 'What do you call a sleeping bull?
A Bulldozer.', 'What did the mama cow say to the baby cow?
It’s pasture bedtime.'];   
var randomJoke = JokesArray[Math.floor(Math.random() * JokesArray.length)];

module.exports = {
	name: 'joke',
	description: 'Tell a random joke',
	cooldown: 10,
	execute(message) {

		message.channel.send(randomJoke);
	},
};

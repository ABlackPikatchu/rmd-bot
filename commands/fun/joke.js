const { MessageEmbed } = require('discord.js');
const jokes = require('@JSON/jokes.json')

module.exports = {
	name: 'joke',
	cooldown: 15,
	description: 'Tells you a joke',
	execute(msg, args, bot) {
		const jokeNumber = Math.floor(Math.random() * jokes.sfw.length);
		const joke = jokes.sfw[jokeNumber]
		return msg.reply({ embeds: [new MessageEmbed().setTitle(`Joke #${jokeNumber + 1}`).setColor('RANDOM').setDescription(joke)] })
	}
}
const { MessageEmbed, WebhookClient } = require('discord.js');
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}! The prefix is *${client.prefix}*`);
		client.user.setActivity("Run +help for a list of commands!", { type: 'PLAYING' });
		console.log('Status set!');
		console.log(`------------------------`);
	},
};
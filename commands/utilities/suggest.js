const { MessageEmbed, Permissions } = require('discord.js');
const channelsJSON = require('@JSON/channels.json');

module.exports = {
	name: 'suggest',
	aliases: ['suggestion'],
	description: 'Sends a suggestion',
	help: {
		usage: 'suggest ***type suggestion***',
		arguments: [
			"**type** - the type of the suggestion. Can be **mod** or **server** (mandatory)",
			"**suggestion** - the suggestion (e.g. Add the machine: blah) (mandatory)"
		]
	},
	cooldown: 25,
    execute(message, args, bot) {
		const type = args.shift().toLowerCase();
		if (type === 'mod') {
			const modChannel = message.guild.channels.cache.get(channelsJSON.mod_suggestions);

			if (!args[0]) return message.channel.send('You need to enter a Suggestion');

			const thanksEmbed1 = new MessageEmbed()
				.setTitle(`Thank you for your mod suggestion!`)
				.setDescription(`Thank you <@${message.author.id}> for the suggestion! Check it out in <#${channelsJSON.mod_suggestions}>!`)
				.addField(`Content:`, `${args.join(' ')}`, false)
				.setColor(`GREEN`);

			message.reply({ embeds: [thanksEmbed1] })

			const modEmbed = new MessageEmbed()
				.setTitle(`New Suggestion`)
				.setColor('RANDOM')
				.setTimestamp()
				.addFields(
					{ name: `User Information`, value: `Username: <@${message.author.id}> \n` + `ID: ${message.author.id}`, inline: true },
					{ name: `Suggestion:`, value: `${args.join(' ')}`, inline: false }
				);

			modChannel.send({ embeds: [modEmbed] })
				.then(function(message) {
					message.react('👍');
					message.react('👎');
				}).catch(function() {
					console.log("❌could not react to the message!");
				});
		} else if (type === 'server') {
			const serverChannel = message.guild.channels.cache.get(channelsJSON.server_suggestions);

			if (!args[0]) return message.channel.send('You need to enter a Suggestion');

			const thanksEmbed2 = new MessageEmbed()
				.setTitle(`Thank you for your server suggestion!`)
				.setDescription(`Thank you <@${message.author.id}> for the suggestion! Check it out in <#${channelsJSON.server_suggestions}>!`)
				.addField(`Content:`, `${args.join(' ')}`, false)
				.setColor(`GREEN`);

			message.reply({ embeds: [thanksEmbed2] })

			const serverEmbed = new MessageEmbed()
				.setTitle(`New Suggestion`)
				.setColor('RANDOM')
				.setTimestamp()
				.addFields(
					{ name: `User Information`, value: `Username: <@${message.author.id}> \n` + `ID: ${message.author.id}`, inline: true },
					{ name: `Suggestion:`, value: `${args.join(' ')}`, inline: false }
				);

			serverChannel.send({ embeds: [serverEmbed] })
				.then(function(message) {
					message.react('👍');
					message.react('👎');
				}).catch(function() {
					console.log("❌could not react to the message!");
				});
		} else {
			const errorEmbed = new MessageEmbed()
				.setTitle("Invalid Suggestion Type")
				.setColor('RED')
				.setTimestamp()
				.setDescription(
					`Invalid Type: *${type}*!\n\n` +
					"Valid types: **mod, server**"
				)
			message.reply({ embeds: [errorEmbed] });
		}
	}
};
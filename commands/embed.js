const { MessageEmbed } = require('discord.js');
const toDoEmbed = new MessageEmbed()
	.setTitle('Embed')
	.setTimestamp();
var RegExp = /^#[0-9A-F]{6}$/i;
 
module.exports = {
	name: 'embed',
	aliases: ['to-do'],
	help: {
		colour: 'RANDOM',
		usage: 'embed ***title colour description***',
		permissions: 'Staff member, Embed Creators or Mod Makers in <#883794369512108052>',
		arguments: [
			"**title** - the title of the embed, has to be one word (e.g This-Is-An-Embed) (mandatory)",
			"**colour** - the colour of the embed, has to be an hex value (e.g. #11f0f0) (mandatory)",
			"**description** - the description of the embed (mandatory)"
		]
	},
	globalCooldown: 60,
	description: 'Sends an embed!',
	execute(msg, args, bot) {
		if (msg.member.roles.cache.some(role => role.name === '⚔️ Staff') || msg.member.roles.cache.some(role => role.name === 'Embed Creator') || msg.channel == msg.member.guild.channels.cache.find(i => i.name === '🎉︱self-promotion')) {
			const title = args.shift();
			if (!title || RegExp.test(title)) {
				const titleError = new MessageEmbed()
					.setDescription('You need to provide a title!')
					.setColor('RED');

				return msg.reply({ embeds: [titleError] });
			}
			const colour = args.shift();
			if (!colour || !RegExp.test(colour)) {
				const colourError = new MessageEmbed()
					.setDescription('You need to provide a valid hex colour!')
					.setColor('RED');

				return msg.reply({ embeds: [colourError] });
			}
			toDoEmbed.setColor(colour);
			toDoEmbed.setTitle(title);
			const description = msg.toString().substring(colour.length + title.length + 9);
			toDoEmbed.setDescription(description);
			msg.channel.send({ embeds: [toDoEmbed] });
		} else msg.reply('You do not have the required permissions!')
	}
};
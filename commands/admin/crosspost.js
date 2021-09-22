const { MessageEmbed, Permissions } = require('discord.js')
const emojis = require('@JSON/emoji.json')

module.exports = {
	name: 'crosspost',
	aliases: ['publish'],
	permissions: [Permissions.FLAGS.ADMINISTRATOR],
	description: 'Crosspost the mentioned message in the mentioned channel',
	hideFromHelp: true,
	help: {
		permissions: 'Administrators',
		usage: 'crosspost **messageID channel**',
		arguments: [
			`**messageID** - the ID of the message to crosspost (mandatory)`,
			`**channel** - the channel to crosspost in (mandatory)`
		]
	},
	async execute(msg, args, bot) {
		const channel = msg.mentions.channels.first();
		
		const msgID = args.shift();
		const message = await msg.channel.messages.fetch(msgID);

		const member = msg.guild.members.cache.get(message.author.id);

		if (!message) {
			return msg.reply({
				embeds: [
					new MessageEmbed().setDescription(`Please specify a valid message id!`).setColor('RED')
				]
			})
		}

		if (!channel) {
			return msg.reply({
				embeds: [
					new MessageEmbed().setDescription(`Please specify a channel to crosspost in!`).setColor('RED')
				]
			})
		}

		try {
			channel.createWebhook(member.user.username, {
				avatar: member.user.displayAvatarURL({ dynamic: true, size: 512 })
			}).then(async webhook => {
				try {
					await webhook.send({
						username: member.username,
						avatarURL: member.user.displayAvatarURL({ dynamic: true, size: 512 }),
						content: message.content,
					});

					webhook.delete();

					msg.reply({ embeds: [new MessageEmbed().setDescription(`Succesfully crossposted the message with the ID **${message.id}** in <#${channel.id}>!`).setColor('DARK_GOLD')] })
				} catch (e) {
					console.log(e)
				}
			}
			).catch(console.error);
		} catch (e) {
			msg.reply({ embeds: [new MessageEmbed().setDescription(`${emojis.sadness} Unknown message ID **${message.id}**!`).setColor('RED')] })
		}


	}
}
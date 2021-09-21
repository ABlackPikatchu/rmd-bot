const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const data = new SlashCommandBuilder()
	.setName('slowmode')
	.setDescription('Enables or disables slowmode in the channel it was ran in!')
	.setDefaultPermission(false)
	.addSubcommand(enable => {
		return enable.setName('enable')
			.setDescription('Enable slowmode')
			.addIntegerOption(time => {
				return time.setName('time')
					.setDescription('The slowmode time')
					.setRequired(true)
			})
			.addStringOption(reason => {
				return reason.setName('reason')
					.setDescription('The reason for enabling slowmode')
			})
	})
	.addSubcommand(disable => {
		return disable.setName('disable')
			.setDescription('Disabled slowmode')
	})
const roles = require('../../JSON/roles.json');

module.exports = {
	data: data,
	permissions: [
		{
			id: roles.moderators,
			type: 'ROLE',
			permission: true
		},
		{
			id: roles.administrators,
			type: 'ROLE',
			permission: true
		}
	],
	async execute(interaction, bot) {
		const subCommand = interaction.options.getSubcommand();
		const currentSlowmode = interaction.channel.rateLimitPerUser;
		const message = interaction;
		let reason = interaction.options.getString('reason');
		if (!reason) reason = "Not Specified";

		if (subCommand === 'disable') {
			if (currentSlowmode === 0) {
				const slowmodeOfferror = new MessageEmbed()
					.setDescription(`Slowmode is already disbaled!`)
					.setColor('RED');
				return interaction.reply({ embeds: [slowmodeOfferror], ephemeral: true });
			}
			interaction.channel.setRateLimitPerUser(0, reason);
			const slowmodeOff = new MessageEmbed()
				.setDescription(`Slowmode Disabled`)
				.setColor('#544B94');

			return interaction.reply({ embeds: [slowmodeOff] });
		}

		if (subCommand === 'enable') {
			const time = interaction.options.getInteger('time');
			const slowmodeError3 = new MessageEmbed()
				.setDescription(`This is not a valid time. Please write the time in seconds. \n\n (Example - +slowmode 5)`)
				.setColor('RED');
			if (isNaN(time)) {
				return message.reply({ embeds: [slowmodeError3], ephemeral: true });
			}

			if (time > 21600000) {
				const slowmodeError4 = new MessageEmbed()
					.setDescription(`Time is too high. Make sure its below 6 hours.`)
					.setColor('RED');

				return message.reply({ embeds: [slowmodeError4], ephemeral: true });
			}

			if (currentSlowmode === time) {
				const slowmodeError5 = new MessageEmbed()
					.setDescription(`Slowmode is already set to ${args[0]}`)
					.setColor('RED');
				return message.reply({ embeds: [slowmodeError5], ephemeral: true });
			}

			message.channel.setRateLimitPerUser(time);
			const afterSlowmode = message.channel.rateLimitPerUser;
				const embed = new MessageEmbed()
					.setTitle(`Slowmode Enabled`)
					.addField(`Slowmode Duration`, time + " seconds")
					.setColor('#544B94');
				embed.addField(`Reason`, reason)
				return message.reply({ embeds: [embed] });
		}
	}
};
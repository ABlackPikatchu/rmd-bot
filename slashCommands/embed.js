const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const data = new SlashCommandBuilder()
	.setName('embed')
	.setDescription('Creates an embed')
	.addStringOption(title =>
		title.setName('title')
			.setDescription('The title of the embed')
			.setRequired(true))
	.addStringOption(colour =>
		colour.setName('colour')
			.setDescription('The colour of the embed')
			.setRequired(true))
	.addStringOption(description =>
		description.setName('description')
			.setDescription('The description of the embed')
			.setRequired(true))
const channels = require('../JSON/channels.json');
const roles = require('../JSON/roles.json');
var RegExp = /^#[0-9A-F]{6}$/i;

module.exports = {
	data: data,
	async execute(interaction, bot) {
		const msg = interaction;
		if (msg.member.roles.cache.has(roles.staff) || msg.member.roles.cache.has(roles.embed_creators) || msg.channel == msg.guild.channels.cache.get(channels.self_promotion)) {

			const title = interaction.options.getString('title');
			const colour = interaction.options.getString('colour');
			const description = interaction.options.getString('description');

			if (!colour || !RegExp.test(colour)) {
				const colourError = new MessageEmbed()
					.setDescription('You need to provide a valid hex colour!')
					.setColor('RED');

				return msg.reply({ embeds: [colourError], ephemeral: true });
			}

			const embed = new MessageEmbed().setTimestamp();

			embed.setColor(colour);
			embed.setTitle(title);
			embed.setDescription(description);
			msg.reply({ embeds: [embed] });

		} else {
			interaction.reply({ content: `You do not have the required roles to use this command`, ephemeral: true })
		}
	}
};
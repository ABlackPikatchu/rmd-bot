const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const maths = require('mathjs');
const data = new SlashCommandBuilder()
	.setName('calculate')
	.setDescription('Does some A+ level maths')
	.addStringOption(expression =>
		expression.setName('expression')
			.setDescription('The expression to calculate')
			.setRequired(true))

module.exports = {
	data: data,
	async execute(interaction, bot) {
		const expression = interaction.options.getString('expression');

		try {
			interaction.reply({ embeds: [new MessageEmbed().addField(`Expression`, expression).addField(`Solution`, `${maths.evaluate(expression)}`).setColor('GREEN')] });
		} catch (e) {
			interaction.reply({ embeds: [new MessageEmbed().setTitle(`Invalid Expression`).setDescription(expression).setColor('RED')] });
		}
	},
};
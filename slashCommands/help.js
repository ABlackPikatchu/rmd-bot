const { SlashCommandBuilder } = require('@discordjs/builders');
const data = new SlashCommandBuilder()
	.setName('help')
	.setDescription('Shows a list of all commands or help about one command')
	.addStringOption(command =>
		command.setName('command')
			.setDescription('The command to show help about')
			.setRequired(false))

module.exports = {
	data: data,
	async execute(interaction, bot) {
		const helpFile = require('../help.js')
		helpFile.execute(interaction, [interaction.options.getString('command')], bot);
	},
};
const { SlashCommandBuilder } = require('@discordjs/builders');
const data = new SlashCommandBuilder()
	.setName('rule')
	.setDescription('Shows a rule!')
	.addNumberOption(rule =>
		rule.setName('rule_number')
			.setDescription('The number of the rule to show')
			.setRequired(true))

module.exports = {
	data: data,
	async execute(interaction, bot) {
		const ruleFile = require('../commands/rule.js')
		ruleFile.execute(interaction, [interaction.options.getNumber('rule_number')], bot);
	},
};
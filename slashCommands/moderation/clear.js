const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const data = new SlashCommandBuilder()
	.setName('clear')
	.setDescription('Clears the last x messages from the channel it was ran in!')
	.setDefaultPermission(false)
	.addIntegerOption(amount => {
		return amount.setName('amount')
			.setDescription(`The amount of messages to clear (between 1 and 100)`)
			.setRequired(true)
	})

const roles = require('@JSON/roles.json');
const slashPerms = require('@JSON/slash_permissions.json');

module.exports = {
	data: data,
	permissions: [
		slashPerms.administrator,
		slashPerms.moderator
	],
	async execute(interaction, bot) {
		let amount = interaction.options.getInteger('amount');

		if (amount > 100) amount = 100;

		await interaction.channel.bulkDelete(amount, true);

		const embed = new MessageEmbed()
			.setDescription(`Successfully deleted ${amount} messages!`)
			.setColor('#544B94');

		await interaction.reply({ embeds: [embed] });
		const message = await interaction.fetchReply();
		setTimeout(async () => {
			await message.delete();
		}, 5000);
	}
};
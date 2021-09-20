const { SlashCommandBuilder } = require('@discordjs/builders');
const data = new SlashCommandBuilder()
	.setName('level')
	.setDescription('Shows the level of a member!')
	.addUserOption(user =>
		user.setName('user')
			.setDescription('The user to show level info about')
			.setRequired(false))
			
const quickdb = require('quick.db');
const Discord = require('discord.js');
const levelTable = new quickdb.table('levels');
const Level = require('../levelling/Level');
const canvacord = require('canvacord');
const fs = require('fs');

const backgrounds = fs.readdirSync('resources/assets/level').length;

module.exports = {
	data: data,
	async execute(interaction, bot) {
		
		const msg = interaction;
		
		let member = interaction.options.getMember('user');
		if (!member) member = interaction.member;

		await interaction.reply(`Please wait! Fetching data!`);

		const memberID = member.id;
		const userLevel = new Level(levelTable.fetch(`${memberID}`));

		let statusColour;
		let status = member.presence.status;
		if (status === "dnd") { statusColour = "#ff0048"; }
		else if (status === "online") { statusColour = "#00fa81"; }
		else if (status === "idle") { statusColour = "#ffbe00"; }
		else { status = "streaming"; statusColour = "#a85fc5"; }

		const reqXP = userLevel.xpForNextLevel() >> 0;
		const currentXP = userLevel.xp >> 0;
		
		const back = Math.round(Math.random() * (backgrounds - 1));

		const levelCard = new canvacord.Rank()
			.setAvatar(member.user.displayAvatarURL({ dynamic: false, format: 'png' }))
			.setCurrentXP(currentXP)
			.setRequiredXP(reqXP)
			.setStatus(status, false, 7)
			.renderEmojis(true)
			.setProgressBar(statusColour, "COLOR")
			.setRankColor(statusColour, "COLOR")
			.setLevelColor(statusColour, "COLOR")
			.setUsername(member.user.username, statusColour)
			.setRank(userLevel.getRank(), "Rank", true)
			.setLevel(userLevel.toLevel(), "Level", true)
			.setDiscriminator(member.user.discriminator, statusColour)
			.setBackground('IMAGE', `resources/assets/level/level-${back}.jpg`)
			.setOverlay(`#808080`, 0, false);

		levelCard.build()
			.then(async data => {
				const attachment = new Discord.MessageAttachment(data, "LevelCard.png");
				try {
					interaction.editReply(`Here is the level data for **${member}**`);
					interaction.editReply({ files: [attachment] });
				} catch (e) {
					console.log(e)
				}
			})
	},
};
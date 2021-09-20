const quickdb = require('quick.db');
const Discord = require('discord.js');
const levelTable = new quickdb.table('levels');
const Level = require('../../levelling/Level');
const canvacord = require('canvacord');
const fs = require('fs');

const backgrounds = fs.readdirSync('resources/assets/level').length;

module.exports = {
	name: "level",
	"description": "Shows the level of a user",
	async execute(msg, args, bot) {
		let member = msg.guild.members.cache.get(args[0]);
		if (!member) member = msg.mentions.members.first();
		if (!member) member = msg.member;

		const message = await msg.reply(`Please wait! Fetching data!`);

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
					message.edit(`Here is the level data for **${member}**`);
					message.edit({ files: [attachment] });
				} catch (e) {
					console.log(e)
				}
			})

	}
}
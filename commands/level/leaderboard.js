const quickdb = require('quick.db');
const { MessageEmbed, Collection } = require('discord.js');
const levelTable = new quickdb.table('levels');
const Level = require('../../levelling/Level');
const config = require('../../JSON/config.json');

module.exports = {
	name: "leaderboard",
	aliases: ['lb'],
	description: `Shows the top ${config.levelling.leaderboard.shown_users} users in the server!`,
	async execute(msg, args, bot) {
		try {
			const message = await msg.reply(`Please wait! Fetching data!`);

			const ranks = [];
			const userdata = new Collection();
			levelTable.all().forEach(rank => {
				ranks.push(rank.data);
				userdata.set(rank.data, rank.ID);
			})
			ranks.sort((a, b) => b - a);

			const embed = new MessageEmbed()
				.setTitle(`The Leaderboard for ${msg.guild.name}!`)
				.setColor(`RANDOM`);

			let description = ``;

			var length = config.levelling.leaderboard.shown_users;
			if (ranks.length < length) length = ranks.length;
			for (i = 0; i <= length - 1; i++) {
				const rank = parseInt(ranks[i]);
				const level = new Level(rank);
				if (userdata.has(ranks[i])) {
					const user = msg.guild.members.cache.get(userdata.get(ranks[i]));
					description += `${i + 1}. Level **${level.toLevel()}: ${user}\n**`
				}
			}
			
			embed.setDescription(description);
			
			message.edit(`Here you go!`);
			message.edit({embeds: [embed]})
		} catch (e) {
			console.log(e);
		}
	}
}
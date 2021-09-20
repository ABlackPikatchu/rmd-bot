const quickdb = require('quick.db');
const levelTable = new quickdb.table('levels');
const Level = require('../levelling/Level');
const config = require('../JSON/config.json');
const rolesData = require('../JSON/roles.json');
const emoji = require('../JSON/emoji.json');

module.exports = {
	execute(msg, args, bot) {
		try {
			if (!msg.member.roles.cache.has(rolesData.bot)) {
				const memberID = msg.member.id;
				const userLevel = new Level(levelTable.fetch(`${memberID}`));
				const oldLevel = userLevel.toLevel();
				userLevel.addXp();
				const newLevel = userLevel.toLevel();
				if (newLevel > oldLevel) msg.channel.send(`${emoji.partying_face} GG, ${msg.member}! You reached level ${newLevel}!`);
				levelTable.set(`${memberID}`, userLevel.xp);
				config.levelling.roles.forEach(role => {
					if (userLevel.toLevel() >= role.level) {
						const guildRole = msg.guild.roles.cache.get(role.id);
						if (!msg.member.roles.cache.has(guildRole)) msg.member.roles.add(guildRole);
					}
				});
			}
		} catch (e) {
			
		}
	}
}
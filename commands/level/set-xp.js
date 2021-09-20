const quickdb = require('quick.db');
const { MessageEmbed, Collection, Permissions } = require('discord.js');
const levelTable = new quickdb.table('levels');
const Level = require('../../levelling/Level');
const config = require('../../JSON/config.json');

module.exports = {
	name: "set-xp",
	aliases: ['setxp'],
	description: `Sets the xp for a user`,
	permissions: [Permissions.FLAGS.ADMINISTRATOR],
	hideFromHelp: true,
	async execute(msg, args, bot) {
		try {
			let member = msg.guild.members.cache.get(args[0]);
			if (!member) member = msg.mentions.members.first();
			if (!member) member = msg.member;

			const memberID = member.id;
			levelTable.set(`${memberID}`, parseInt(args[1]));

			msg.reply(`Successfully set the xp for ${member} to **${args[1]}**!`)

		} catch (e) {
			console.log(e);
		}
	}
}
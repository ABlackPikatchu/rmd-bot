const { SlashCommandBuilder } = require('@discordjs/builders');
const data = new SlashCommandBuilder()
	.setName('user-info')
	.setDescription('Shows info about a user!')
	.addUserOption(user =>
		user.setName('user')
			.setDescription('The user to show info about!')
			.setRequired(true))
			
const { MessageEmbed, Permissions } = require('discord.js');
const moment = require('moment');
const quickdb = require('quick.db');
const db = new quickdb.table('warns')
			
const flags = {
    DISCORD_EMPLOYEE: 'Discord Employee',
    PARTNERED_SERVER_OWNER: 'Discord Partner',
    BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
    BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
    HYPESQUAD_EVENTS: 'HypeSquad Events',
    HOUSE_BRAVERY: 'House of Bravery',
    HOUSE_BRILLIANCE: 'House of Brilliance',
    HOUSE_BALANCE: 'House of Balance',
    EARLY_SUPPORTER: 'Early Supporter',
    TEAM_USER: 'Team User',
    SYSTEM: 'System',
    VERIFIED_BOT: 'Verified Bot',
    EARLY_VERIFIED_BOT_DEVELOPER: 'Verified Bot Developer',
    DISCORD_CERTIFIED_MODERATOR: 'Certified Moderator'
};

module.exports = {
	data: data,
	async execute(interaction, bot) {
		const message = interaction;
		
		let member;
		member = interaction.options.getMember('user');
		if (!member) member = interaction.member;
		
		const roles = member.roles.cache
			.map(role => role.toString())
			.slice(0, -1);

		let userFlags
		if (!member.user.flags) userFlags = [];
		else userFlags = member.user.flags.toArray();

		const embed = new MessageEmbed()
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setColor(member.displayHexColor || '#544B94')
			.addField('User Info',
				`**- Username:** ${member.user.username}\n` +
				`**- Discriminator:** ${member.user.discriminator}\n` +
				`**- ID:** ${member.id}\n` +
				`**- Discord Join Date:** ${moment(member.user.createdAt).format('LL LTS')}\n` +
				`**- Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}\n` +
				`\u200b`
			)
			.addField('Member',
				`**- Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}\n` +
				`**- Server Join Date:** ${moment(member.joinedTimestamp).format('LL LTS')}\n` +
				`**- Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}\n` +
				`**- Roles [${roles.length}]:** ${roles.length < 100 ? roles.join(', ') : roles.length > 100 ? this.client.utils.trimArray(roles) : 'Too many to be displayed!'}\n` +
				`\u200b`
			)
			.setTimestamp();

		if (message.member.permissions.has([Permissions.FLAGS.KICK_MEMBERS, Permissions.FLAGS.BAN_MEMBERS])) {
			let warnDoc = await db.fetch(`${member.id}`);

			if (!warnDoc) {
				embed.addField(`Warnings`, `The user does not have any warnings!`)
				warnDoc = [];
			} else {
				let fieldToAdd = "";
				warnDoc.forEach(warn => {
					fieldToAdd += `Warn ${warn.number}\nReason: **${warn.reason}**\nModerator: <@${warn.moderator}>\n`;
				})
				if (fieldToAdd === '') fieldToAdd = 'The user does not have any warnings!';
				embed.addField(`Warnings`, fieldToAdd);
			}
		}

		return interaction.reply({ embeds: [embed] });
	},
};
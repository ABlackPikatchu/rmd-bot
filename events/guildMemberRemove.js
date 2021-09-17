const { MessageEmbed } = require('discord.js');
const quickdb = require('quick.db');
const db = new quickdb.table('roles');

const moment = require('moment');
const channels = require('../JSON/channels.json');

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
        name: 'guildMemberRemove',
        once: false,
        async execute(member) {
                let rolesList = [];

                try {
                member.roles.cache.forEach(role => {
                        if (role.rawPosition === 0) return; 
                        rolesList.push(role.id);
                })
        } catch (e) {
                console.error(`Error while saving roles of ${member}!`, e)
        }

                db.set(`${member.id}`, rolesList);
                const goodbyeEmbed = new MessageEmbed();

                goodbyeEmbed.setColor('#f00000')
                goodbyeEmbed.setTitle('**' + member.user.username + '** left us! There are now **' + member.guild.memberCount + '** left Among Us!')

                member.guild.channels.cache.find(i => i.name === '👋︱welcome').send({ embeds: [goodbyeEmbed] });

                const roles = member.roles.cache
                        .map(role => role.toString())
                        .slice(0, -1);

                let userFlags;
                if (!member.user.flags) userFlags = [];
                else userFlags = member.user.flags.toArray();
                const modLogs = member.guild.channels.cache.get(channels.mod_logs);
                const modLogsEmbed = new MessageEmbed()
                        .setTitle(`Member Left`)
                        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
                        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL({ dynamic: true, size: 512 }))
                        .addField('User Info',
                                `**- Username:** ${member.user.username} (${member})\n` +
                                `**- Discriminator:** ${member.user.discriminator}\n` +
                                `**- ID:** ${member.id}\n` +
                                `**- Discord Join Date:** ${moment(member.user.createdAt).format('LL LTS')}\n` +
                                `**- Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}\n` +
                                `\u200b`
                        )
                        .addField('Member',
                                `**- Highest Role:** ${member.roles.highest.id === member.guild.id ? 'None' : member.roles.highest.name}\n` +
                                `**- Server Join Date:** ${moment(member.joinedTimestamp).format('LL LTS')}\n` +
                                `**- Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}\n` +
                                `**- Roles [${roles.length}]:** ${roles.length < 100 ? roles.join(', ') : roles.length > 100 ? this.client.utils.trimArray(roles) : 'Too many to be displayed!'}\n` +
                                `\u200b`
                        )
                        .setColor('RED')
                        .setFooter(`ID: ${member.id}`)
                        .setTimestamp();
                modLogs.send({embeds: [modLogsEmbed]});
        },
};
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
        name: 'guildMemberAdd',
        once: false,
        async execute(member) {
                if (await db.fetch(`${member.id}`) == null) {
                        db.set(`${member.id}`, []);
                }
                let oldRoles = await db.fetch(`${member.id}`);
                try {
                        if (oldRoles != null) oldRoles.forEach(roleID => {
                                role = member.guild.roles.cache.get(roleID);
                                if (role) member.roles.add(role);
                                else console.log(`Encountered error while re-adding on-join roles to ${member}: Unknown role name *${roleName}*`);
                        })
                } catch (e) {
                        console.log(`Encountered error while add on-join roles to ${member}`, e)
                }
                db.delete(`${member.id}`);
                if (member.guild.memberCount <= 100 && !member.roles.cache.has('871030809627349100')) member.roles.add(member.guild.roles.cache.find(i => i.name === 'Early Supporter'))
                const welcomeEmbed = new MessageEmbed();

                welcomeEmbed.setColor('#5cf000')
                welcomeEmbed.setTitle('**' + member.user.username + '** is now Among Us other **' + (member.guild.memberCount - 1) + '** people')
                welcomeEmbed.setDescription('Hi, ' + '<@' + member.user.id + '>! We are happy to see you here!')
                welcomeEmbed.setImage('https://www.bing.com/th?id=OIP.-eKx0rCRrBVkABUHSyo2RwHaEK&w=170&h=96&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2')

                member.guild.channels.cache.find(i => i.name === '👋︱welcome').send({ embeds: [welcomeEmbed] });


                const roles = member.roles.cache
                        .map(role => role.toString())
                        .slice(0, -1);

                let userFlags;
                if (!member.user.flags) userFlags = [];
                else userFlags = member.user.flags.toArray();
                const modLogs = member.guild.channels.cache.get(channels.mod_logs);
                const modLogsEmbed = new MessageEmbed()
                        .setTitle(`Member Joined`)
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
                        .setColor('GREEN')
                        .setFooter(`ID: ${member.id}`)
                        .setTimestamp();
                modLogs.send({embeds: [modLogsEmbed]});
        },
};
const { MessageEmbed } = require('discord.js');
const channelsJSON = require('../JSON/channels.json');
const rolesJSON = require('../JSON/roles.json');
const config = require('../JSON/config.json');
const db = require('quick.db');
const index = require('./index.js');
var violationsTable = new db.table(`violations`);

module.exports = {
    async execute(word, msg, bot, reason) {
        const modLogsChannel = msg.guild.channels.cache.get(channelsJSON.mod_logs);
        let violations = await violationsTable.fetch(`${msg.member.id}`)
        violations++;
        if (config.auto_mod.violations.DMOnViolation) {
            const DMViolationMessage = new MessageEmbed()
                .setTitle(`Auto Mod Violation`)
            if (reason === 'banned_word') {
                DMViolationMessage.setDescription(`I have deleted one of your messages form the server **${msg.guild.name}** as it contained a banned word!`)
                    .addField(`Banned Word: `, `**${word}**`, true)
                    .addField(`Message Content: `, `${msg}`, false)
                    .addField(`Current Number of Violations: `, `**${violations}**;\n ${config.auto_mod.violations.max} = a warn; ${config.warns.max} = a ban/mute`)
                    .setColor('RED');
                msg.member.createDM().then((DMChannel) => {
                    DMChannel
                        .send({ embeds: [DMViolationMessage] })
                        .then(() => {
                        }).catch((e) => {
                            console.log('Failed to send violation msg!', e);
                        });
                });
            }
        }
        if (violations >= config.auto_mod.violations.max) {
            const violationsNumberReachedEmbed = new MessageEmbed()
                .setTitle(`Violations Number Reached`)
                .setDescription(`The user ${msg.member} has reached the maximum amount of violations! (${violations})`)
                .setAuthor(`${msg.member.user.tag}`, msg.member.user.displayAvatarURL({ dynamic: true, size: 512 }))
                .setColor('RED');
            violations = 0;
            modLogsChannel.send({ embeds: [violationsNumberReachedEmbed] }).then((message) => {
                message.pin();
            }).catch((e) => { console.log(`error while pinning violations number reached message for user ${msg.member}`, e) });
            modLogsChannel.send(`<@&${rolesJSON.moderators}> <@&${rolesJSON.administrators}>`);
        }
        violationsTable.set(`${msg.member.id}`, violations);
    }
}
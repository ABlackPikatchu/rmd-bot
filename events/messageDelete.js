const { MessageEmbed, WebhookClient } = require('discord.js');
const channels = require('../JSON/channels.json');
const roles = require('@JSON/roles.json')
module.exports = {
        name: 'messageDelete',
        execute(msg) {
                try {
                        const spamLogs = msg.guild.channels.cache.get(channels.spam_logs);
                        const msgDeletedEmbed = new MessageEmbed()
                                .setTitle(`Message Deleted`)
                                .setDescription(`A message sent by ${msg.author} has been deleted in ${msg.channel}`)
                                .setAuthor(`${msg.author.tag}`, msg.author.displayAvatarURL({ dynamic: true, size: 512 }))
                                .setColor('RED');
                        if (msg) msgDeletedEmbed.addField(`Message Content:`, `${msg} `, false)
                        spamLogs.send({ embeds: [msgDeletedEmbed] });
                } catch (e) {
                       
                }
        },
};
const { MessageEmbed, WebhookClient } = require('discord.js');
const channels = require('../JSON/channels.json');
module.exports = {
    name: 'threadCreate',
    once: false,
    async execute(thread) {
        try {
            const spamLogs = thread.guild.channels.cache.get(channels.spam_logs);
            const ThreadCreatedEmbed = new MessageEmbed()
                .setTitle(`Thread Created`)
                .setDescription(`Thread **${thread}** has been created in <#${thread.parentId}>!`)
                .setColor('GREEN')
                .setFooter(`ID: ${thread.name}`)
                .setTimestamp();
            await spamLogs.send({embeds: [ThreadCreatedEmbed]}).catch();
        } catch (e) {
            console.log(`Failed to create thread created spam log`, e)
        }
    },
};
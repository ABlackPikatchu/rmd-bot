const { MessageEmbed, WebhookClient } = require('discord.js');
const channels = require('../JSON/channels.json');
module.exports = {
    name: 'threadDelete',
    once: false,
    async execute(thread) {
        try {
            const spamLogs = thread.guild.channels.cache.get(channels.spam_logs);
            const ThreadDeletedEmbed = new MessageEmbed()
                .setTitle(`Thread Deleted`)
                .setDescription(`Thread **${thread.name}** has been deleted in <#${thread.parentId}>!`)
                .setColor('RED')
                .setFooter(`ID: ${thread.id}`)
                .setTimestamp();
            await spamLogs.send({embeds: [ThreadDeletedEmbed]}).catch();
        } catch (e) {
            console.log(`Failed to Deleted thread deleted spam log`, e)
        }
    },
};
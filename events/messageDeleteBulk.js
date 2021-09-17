const { MessageEmbed, WebhookClient } = require('discord.js');
const channels = require('../JSON/channels.json');
module.exports = {
    name: 'messageDeleteBulk',
    once: false,
    async execute(messages) {
        try {
            let number = 0;
            messages.forEach(msg => {
                number++;
            })
            const modLogs = messages.first().guild.channels.cache.get(channels.mod_logs);
            const msgDeletedBulkEmbed = new MessageEmbed()
                .setTitle(`Message Bulk Deletion`)
                .setDescription(`Bulk delete in ${messages.first().channel}, ${number} messages deleted!`)
                .setColor('#1e90ff')
                .setTimestamp();
            modLogs.send({embeds: [msgDeletedBulkEmbed]}).catch();
        } catch (e) {
            console.log(`Failed to create msg deleted bulk mod log`, e)
        }
    },
};
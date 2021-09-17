const { MessageEmbed, WebhookClient } = require('discord.js');
const channels = require('../JSON/channels.json');
module.exports = {
    name: 'channelDelete',
    once: false,
    async execute(channel) {
        try {
            const modLogs = channel.guild.channels.cache.get(channels.mod_logs);
            const channelDeletedEmbed = new MessageEmbed()
                .setTitle(`Channel Deleted`)
                .setDescription(`Channel **${channel.name}** has been deleted!`)
                .setColor('RED')
                .setFooter(`ID: ${channel.id}`)
                .setTimestamp();
            await modLogs.send({embeds: [channelDeletedEmbed]}).catch();
        } catch (e) {
            console.log(`Failed to create channel deleted mod log`, e)
        }
    },
};
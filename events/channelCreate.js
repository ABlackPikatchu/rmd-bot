const { MessageEmbed, WebhookClient } = require('discord.js');
const channels = require('../JSON/channels.json');
module.exports = {
    name: 'channelCreate',
    once: false,
    async execute(channel) {
        try {
            const modLogs = channel.guild.channels.cache.get(channels.mod_logs);
            const channelCreatedEmbed = new MessageEmbed()
                .setTitle(`Channel Created`)
                .setDescription(`Channel **${channel}** has been created!`)
                .setColor('GREEN')
                .setFooter(`ID: ${channel.id}`)
                .setTimestamp();
            await modLogs.send({embeds: [channelCreatedEmbed]}).catch();
        } catch (e) {
            console.log(`Failed to create channel created mod log`, e)
        }
    },
};
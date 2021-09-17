const { MessageEmbed, WebhookClient } = require('discord.js');
const channels = require('../JSON/channels.json');
module.exports = {
    name: 'roleCreate',
    once: false,
    async execute(role) {
        try {
            const modLogs = role.guild.channels.cache.get(channels.mod_logs);
            const roleCreatedEmbed = new MessageEmbed()
                .setTitle(`Role Created`)
                .setDescription(`Role **${role}** has been created!`)
                .setColor('GREEN')
                .setFooter(`ID: ${role.id}`)
                .setTimestamp();
            await modLogs.send({embeds: [roleCreatedEmbed]}).catch();
        } catch (e) {
            console.log(`Failed to create role created mod log`, e)
        }
    },
};
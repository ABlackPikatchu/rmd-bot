const { MessageEmbed, WebhookClient } = require('discord.js');
const channels = require('../JSON/channels.json');
module.exports = {
    name: 'roleDelete',
    once: false,
    async execute(role) {
        try {
            const modLogs = role.guild.channels.cache.get(channels.mod_logs);
            const roleDeletedEmbed = new MessageEmbed()
                .setTitle(`Role Deleted`)
                .setDescription(`Role **${role.name}** has been deleted!`)
                .setColor('RED')
                .setFooter(`ID: ${role.id}`)
                .setTimestamp();
            await modLogs.send({embeds: [roleDeletedEmbed]}).catch();
        } catch (e) {
            console.log(`Failed to create role deleted mod log`, e)
        }
    },
};
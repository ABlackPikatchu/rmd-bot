const { MessageEmbed, WebhookClient } = require('discord.js');
const channels = require('../JSON/channels.json');
module.exports = {
	name: 'messageUpdate',
	execute(oldMsg, newMsg) {
        const msg = newMsg;
        try {
        const spamLogs = msg.guild.channels.cache.get(channels.spam_logs);
        const msgEditedEmbed = new MessageEmbed()
                .setTitle(`Message Edited`)
                .setDescription(`A message sent by ${msg.author} has been edited in ${msg.channel} [Jump To Message](https://discord.com/channels/${msg.guild.id}/${msg.channel.id}/${msg.id})`)
                .setAuthor(`${msg.author.tag}`, msg.author.displayAvatarURL({ dynamic: true, size: 512 }))
                .setColor('#ffc0cb')
                .setTimestamp()
                .setFooter(`User ID: ${msg.member.id}`);
        if (oldMsg) msgEditedEmbed.addField(`Before:`, `${oldMsg.content}`, false)
        if (msg) msgEditedEmbed.addField(`After:`, `${msg}`, false)
        spamLogs.send({embeds: [msgEditedEmbed]});
        } catch (e) {
            console.log(`Failed to create msg edited spam log`, e)
        }
	},
};
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const channelsJSON = require('../JSON/channels.json');
const violations = require('./violations.js');
var violationsTable = new db.table(`violations`);

module.exports = {
    async execute(word, msg, bot) {
        const spamLogs = msg.guild.channels.cache.get(channelsJSON.spam_logs);
        const msgDeletedEmbed = new MessageEmbed()
                .setTitle(`Message Deleted`)
                .setDescription(`A message sent by ${msg.member} has been deleted in ${msg.channel}`)
                .setAuthor(`${msg.member.user.tag}`, msg.member.user.displayAvatarURL({ dynamic: true, size: 512 }))
                .addField(`Reason:`, `The word **${word}** has been found inside the message!`, false)
                .addField(`Message Content:`, `**${msg}**`, false)
                .setColor('RED');
        spamLogs.send({embeds: [msgDeletedEmbed]});
        msg.delete();
        violations.execute(word, msg, bot, 'banned_word')
    }
}
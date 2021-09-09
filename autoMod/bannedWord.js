const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
var violationsTable = new db.table(`violations`)

module.exports = {
    async execute(word, msg, bot, spamLogs) {
        const msgDeletedEmbed = new MessageEmbed()
                .setTitle(`Message Deleted`)
                .setDescription(`A message sent by ${msg.member} has been deleted in ${msg.channel}`)
                .setAuthor(`${msg.member.user.tag}`, msg.member.user.displayAvatarURL({ dynamic: true, size: 512 }))
                .addField(`Reason:`, `The word **${word}** has been found inside the message!`, false)
                .addField(`Message Content:`, `**${msg}**`, false)
                .setColor('RED');
        spamLogs.send({embeds: [msgDeletedEmbed]});
        msg.delete();
        let violations = await violationsTable.fetch(`${msg.member.id}`)
        violations++;
        violationsTable.set(`${msg.member.id}`, violations);
    }
}
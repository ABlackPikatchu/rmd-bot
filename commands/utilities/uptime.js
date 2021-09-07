const { MessageEmbed } = require('discord.js');
const uptime = new MessageEmbed()
    .setTitle('Uptime')
    .setColor('AQUA')

module.exports = {
    name: 'uptime',
    aliases: ['up'],
    description: 'Shows the uptime of the bot',
    execute(msg, args, bot) {
        let totalSeconds = (bot.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        uptime.setDescription(
            "I have been online for:\n" +
            `${seconds} seconds or\n` +
            `${minutes} minutes or\n` +
            `${hours} hours or\n` +
            `${days} days\n`
        );
        msg.reply({embeds: [uptime]});
    }
};

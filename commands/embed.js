const {
    MessageEmbed
} = require('discord.js');
const toDoEmbed = new MessageEmbed()
    .setTitle('Embed')
    .setTimestamp();

module.exports = {
    name: 'embed',
    description: 'Sends an embed!',
    execute(msg, args) {
        if (msg.member.roles.cache.some(role => role.name === '⚔️ Staff') || msg.member.roles.cache.some(role => role.name === 'Embed Creator') || msg.channel ==  msg.member.guild.channels.cache.find(i => i.name === '🎉︱self-promotion')) {
            const title = args.shift();
            const colour = args.shift();
            toDoEmbed.setColor(colour);
            toDoEmbed.setTitle(title);
            const description = msg.toString().substring(colour.length + title.length + 9);
            toDoEmbed.setDescription(description);
            msg.channel.send({ embeds: [toDoEmbed] });
            msg.delete();
        } else msg.reply('You do not have the required permissions!')
    }
};
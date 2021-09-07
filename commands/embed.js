const { MessageEmbed } = require('discord.js');
const toDoEmbed = new MessageEmbed()
    .setTitle('Embed')
    .setTimestamp();

const aliases = ['to-do'];
const helpEmbed = new MessageEmbed()
    .setTitle("How to use the **EMBED** command!")
    .setColor('RANDOM')
    .addFields(
        { name: "Name", value: "embed", inline: false },
        { name: "Aliases", value: aliases.toString() + "\n", inline: false },
        { name: "Usage", value: "embed ***title colour description***", inline: false },
        {
            name: "Arguments", value:
                "**title** - the title of the embed, has to be one word (e.g This-Is-An-Embed)\n" +
                "**colour** - the colour of the embed, has to be an hex value (e.g. #11f0f0)\n" +
                "**description** - the description of the embed\n\n"
            , inline: false
        }
    );

module.exports = {
    name: 'embed',
    aliases: aliases,
    helpEmbed: helpEmbed,
    description: 'Sends an embed!',
    execute(msg, args) {
        if (msg.member.roles.cache.some(role => role.name === '⚔️ Staff') || msg.member.roles.cache.some(role => role.name === 'Embed Creator') || msg.channel == msg.member.guild.channels.cache.find(i => i.name === '🎉︱self-promotion')) {
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
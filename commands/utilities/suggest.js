const { MessageEmbed, Permissions } = require('discord.js');
const aliases = ['suggestion'];
module.exports = {
    name: 'suggest',
    aliases: aliases,
    description: 'Sends a suggestion',
    execute(message, args, bot) {
        const type = args.shift().toLowerCase();
        if (type === 'mod') {
            const modChannel = message.guild.channels.cache.find(i => i.name === '🎮︱mod-suggestions');

            if (!args[0]) return message.channel.send('You need to enter a Suggestion');
            message.channel.send(`Thank you <@${message.author.id}> for giving the suggestion of: \n${args.join(' ')}`);

            const modEmbed = new MessageEmbed()
                .setTitle(`New Suggestion`)
                .setColor('RANDOM')
                .setTimestamp()
                .addFields(
                    { name: `User Information`, value: `Username: <@${message.author.id}> \n` + `ID: ${message.author.id}`, inline: true },
                    { name: `Suggestion:`, value: `${args.join(' ')}`, inline: false }
                );

            modChannel.send({ embeds: [modEmbed] })
                .then(function (message) {
                    message.react('👍');
                    message.react('👎');
                }).catch(function () {
                    console.log("❌could not react to the message!");
                });
        } else if (type === 'server') {
            const serverChannel = message.guild.channels.cache.find(i => i.name === '🚃︱server-suggestions');

            if (!args[0]) return message.channel.send('You need to enter a Suggestion');
            message.channel.send(`Thank you <@${message.author.id}> for giving the suggestion of: \n${args.join(' ')}`);

            const serverEmbed = new MessageEmbed()
                .setTitle(`New Suggestion`)
                .setColor('RANDOM')
                .setTimestamp()
                .addFields(
                    { name: `User Information`, value: `Username: <@${message.author.id}> \n` + `ID: ${message.author.id}`, inline: true },
                    { name: `Suggestion:`, value: `${args.join(' ')}`, inline: false }
                );

            serverChannel.send({ embeds: [serverEmbed] })
                .then(function (message) {
                    message.react('👍');
                    message.react('👎');
                }).catch(function () {
                    console.log("❌could not react to the message!");
                });
        } else {
            const errorEmbed = new MessageEmbed()
                .setTitle("Invalid Suggestion Type")
                .setColor('RED')
                .setTimestamp()
                .setDescription(
                    `Invalid Type: *${type}*!\n\n` +
                    "Valid types: **mod, server**"
                )
            message.reply({embeds: [errorEmbed]});
        }
    }
};
const { MessageEmbed, Permissions } = require('discord.js');
const channelsJSON = require('../../JSON/channels.json');

const aliases = ['suggestion'];
const description = 'Sends a suggestion';
const helpEmbed = new MessageEmbed()
    .setTitle("How to use the **SUGGEST** command!")
    .setColor('RANDOM')
    .setDescription(description)
    .addFields(
        { name: "Name", value: "suggest", inline: false },
        { name: "Aliases", value: aliases.toString() + "\n", inline: false },
        { name: "Usage", value: "suggest ***type suggestion***", inline: false },
        { name: 'Permissions/Roles Required', value: 'none', inline: false },
        {
            name: "Arguments", value:
                "**type** - the type of the suggestion. Can be **mod** or **server** (mandatory)\n" +
                "**suggestion** - the suggestion (e.g. Add the machine: blah) (mandatory)\n"
            , inline: false
        }
    );

module.exports = {
    name: 'suggest',
    aliases: aliases,
    description: description,
    helpEmbed: helpEmbed,
    execute(message, args, bot) {
        const type = args.shift().toLowerCase();
        if (type === 'mod') {
            const modChannel = message.guild.channels.cache.get(channelsJSON.mod_suggestions);

            if (!args[0]) return message.channel.send('You need to enter a Suggestion');
            
            const thanksEmbed1 = new MessageEmbed()
                .setTitle(`Thank you for your mod suggestion!`)
                .setDescription(`Thank you <@${message.author.id}> for the suggestion! Check it out in <#${channelsJSON.mod_suggestions}>!`)
                .addField(`Content:`, `${args.join(' ')}`, false)
                .setColor(`GREEN`);

            message.reply({embeds: [thanksEmbed1]})

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
            const serverChannel = message.guild.channels.cache.get(channelsJSON.server_suggestions);

            if (!args[0]) return message.channel.send('You need to enter a Suggestion');

            const thanksEmbed2 = new MessageEmbed()
                .setTitle(`Thank you for your server suggestion!`)
                .setDescription(`Thank you <@${message.author.id}> for the suggestion! Check it out in <#${channelsJSON.server_suggestions}>!`)
                .addField(`Content:`, `${args.join(' ')}`, false)
                .setColor(`GREEN`);

            message.reply({embeds: [thanksEmbed2]})

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
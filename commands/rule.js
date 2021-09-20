const { MessageEmbed } = require('discord.js');
const rules = require('../JSON/rules.json');
const emojis = require('../JSON/emoji.json');

const aliases = ['rules'];
const description = 'Shows a rule';
const helpEmbed = new MessageEmbed()
    .setTitle("How to use the **RULE** command!")
    .setColor('RANDOM')
    .setDescription(description)
    .addFields(
        { name: "Name", value: "rule", inline: false },
        { name: "Aliases", value: aliases.toString() + "\n", inline: false },
        { name: "Usage", value: "rule ***number***", inline: false },
        { name: 'Permissions/Roles Required', value: 'none', inline: false },
        {
            name: "Arguments", value: "**number** - the number of the rule to show (mandatory)" , inline: false
        }
    );

const ruleEmbed = new MessageEmbed();

module.exports = {
    name: 'rule',
    aliases: aliases,
    helpEmbed: helpEmbed,
    description: description,
    execute(msg, args, bot) {
        const number = args.shift();
        if (!rules[number]) msg.reply("Unknown Rule!")
        else {
            ruleEmbed.setTitle(`${emojis.rules} Rule ${number}`).setDescription(rules[number]).setColor('RANDOM');
            msg.reply({embeds: [ruleEmbed]});
        }
    }
};

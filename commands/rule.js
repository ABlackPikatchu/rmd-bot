const { MessageEmbed } = require('discord.js');
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

module.exports = {
    name: 'rule',
    aliases: aliases,
    helpEmbed: helpEmbed,
    description: description,
    execute(msg, args, bot) {
        if (args == 1) msg.reply(
            "**1. Follow Discord's TOS**\n" + 
            "https://discordapp.com/terms/\n" +
            "https://discordapp.com/guidelines/"
        )
        else if (args == 2) msg.reply(
            "**2. Be respectful with all members**\n" +
            "Be respectful to others , No death threats, sexism, hate speech, racism (NO N WORD, this includes soft N)\n" +
            "No doxxing, swatting, witch hunting"
        )
        else if (args == 3) msg.reply(
            "**3. No Advertising** \n" +
            `Includes DM Advertising. We do not allow advertising here of any kind unless done in <#883794369512108052>!`
        )
        else if (args == 4) msg.reply(
            "**4. No NSFW content**\n" +
            "Anything involving gore or sexual content is not allowed." +
            "NSFW = Not Safe for Work"
        )
        else if (args == 5) msg.reply(
            "**5. No spamming in text or VC**\n" +
            "Do not spam messages, soundboards, voice changers, or earrape in any channel."
        )
        else if (args == 6) msg.reply(
            "**6. Do not discuss about sensitive topics**\n" + 
            "This isn't a debating server, keep sensitive topics out of here so we don't have a ton of nasty arguments."
        )
        else if (args == 7) msg.reply(
            "**7. No malicious content**\n" +
            "No grabify links, viruses, crash videos, links to viruses, or token grabbers. These will result in an automated ban."
        )
        else if (args == 8) msg.reply(
            "**8. No Self Bots**\n" +
            "Includes all kinds of selfbots: Nitro snipers, selfbots like nighty, auto changing statuses"
        )
        else if (args == 9) msg.reply(
            "**9. Do not DM the staff team** \n" +
            "Unless we ask it (e.g for the Mod Maker role) else please open a ticket instead!\n"
        )
        else if (args == 10) msg.reply(
            "**10. Profile Picture / Banner Rules** \n" +
            "No NSFW allowed" +
            "No racism" +
            "No brightly flashing pictures to induce an epileptic attack"
        )
        else if (args == 11) msg.reply(
            "**11. Emoji Rules** \n" +
            "No NSFW allowed" +
            "No racism" +
            "No brightly flashing pictures to induce an epileptic attack"

        )
        else if (args == 12) msg.reply(
            "**12. Use English only** \n" +
            "We cannot easily moderate chats in different languages, sorry. English only."
        )
        else msg.reply(
            "Unknown Rule!"
        )
    }
};

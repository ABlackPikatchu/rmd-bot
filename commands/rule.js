module.exports = {
    name: 'rule',
    aliases: ['rules'],
    description: 'Shows a rule',
    execute(msg, args) {
        if (args == 1) msg.channel.send(
            "**1. Follow Discord's TOS**\n" + 
            "https://discordapp.com/terms/\n" +
            "https://discordapp.com/guidelines/"
        )
        else if (args == 2) msg.channel.send(
            "**2. Be respectful with all members**\n" +
            "Be respectful to others , No death threats, sexism, hate speech, racism (NO N WORD, this includes soft N)\n" +
            "No doxxing, swatting, witch hunting"
        )
        else if (args == 3) msg.channel.send(
            "**3. No Advertising** \n" +
            "Includes DM Advertising. We do not allow advertising here of any kind unless done in 🎉︱self-promotion!"
        )
        else if (args == 4) msg.channel.send(
            "**4. No NSFW content**\n" +
            "Anything involving gore or sexual content is not allowed." +
            "NSFW = Not Safe for Work"
        )
        else if (args == 5) msg.channel.send(
            "**5. No spamming in text or VC**\n" +
            "Do not spam messages, soundboards, voice changers, or earrape in any channel."
        )
        else if (args == 6) msg.channel.send(
            "**6. Do not discuss about sensitive topics**\n" + 
            "This isn't a debating server, keep sensitive topics out of here so we don't have a ton of nasty arguments."
        )
        else if (args == 7) msg.channel.send(
            "**7. No malicious content**\n" +
            "No grabify links, viruses, crash videos, links to viruses, or token grabbers. These will result in an automated ban."
        )
        else if (args == 8) msg.channel.send(
            "**8. No Self Bots**\n" +
            "Includes all kinds of selfbots: Nitro snipers, selfbots like nighty, auto changing statuses"
        )
        else if (args == 9) msg.channel.send(
            "**9. Do not DM the staff team** \n" +
            "Unless we ask it (e.g for the Mod Maker role) else please open a ticket instead!\n"
        )
        else if (args == 10) msg.channel.send(
            "**10. Profile Picture / Banner Rules** \n" +
            "No NSFW allowed" +
            "No racism" +
            "No brightly flashing pictures to induce an epileptic attack"
        )
        else if (args == 11) msg.channel.send(
            "**11. Emoji Rules** \n" +
            "No NSFW allowed" +
            "No racism" +
            "No brightly flashing pictures to induce an epileptic attack"

        )
        else if (args == 12) msg.channel.send(
            "**12. Use English only** \n" +
            "We cannot easily moderate chats in different languages, sorry. English only."
        )
        else msg.channel.send(
            "Unknown Rule!"
        )
    }
};

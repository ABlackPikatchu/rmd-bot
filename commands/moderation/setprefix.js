const { MessageEmbed, Permissions } = require('discord.js');
const db = require('quick.db');
const emoji = require('../../JSON/emoji');

module.exports = {
    name: 'setprefix',
    permissions: [Permissions.FLAGS.ADMINISTRATOR],
    description: 'Sets the prefix of the bot!',
    hideFromHelp: true,
    async execute(msg, args, bot) {
        var newPrefix = args[0];
        if (!newPrefix) return msg.reply('Please specify a new prefix');
        if (newPrefix.length != 1) return msg.reply('The prefix is too long! It must be only one character!');
        const oldPrefix = bot.prefix;

        db.set(`prefix`, newPrefix);
        bot.prefix = newPrefix;
        return msg.reply(`My prefix has been changed from **${oldPrefix}** to **${newPrefix}**!`);
    }
}
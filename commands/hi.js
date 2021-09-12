const Discord = require('discord.js');
module.exports = {
    name: 'hi',
    aliases: ['hello', 'hallo'],
    description: 'Hi!',
    hideFromHelp: true,
    execute(msg, args, bot) {
        msg.reply('Hallo!');
    }
};

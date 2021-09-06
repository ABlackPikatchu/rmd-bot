const Discord = require('discord.js');
module.exports = {
    name: 'hi',
    aliases: ['hello', 'hallo'],
    description: 'Hi!',
    execute(msg, args) {
        msg.reply('Hallo!');
    }
};

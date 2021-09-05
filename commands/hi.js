const Discord = require('discord.js');
module.exports = {
    name: 'hi',
    description: 'Hi!',
    execute(msg, args) {
        msg.reply('Hallo!');
    }
};

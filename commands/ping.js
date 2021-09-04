const { Guild, GuildChannel, GuildMember } = require("discord.js");

module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(msg, args) {
        msg.reply('pong');
    }
};

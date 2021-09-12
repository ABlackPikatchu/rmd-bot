module.exports = {
    name: 'ping',
    description: 'Ping!',
    hideFromHelp: true,
    execute(msg, args, bot) {
        msg.reply('pong');
    }
};

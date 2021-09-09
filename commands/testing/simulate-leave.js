module.exports = {
    name: 'simulate-leave',
    aliases: ['simleave'],
    description: 'Simulates an user leave',
    execute (msg, args, bot) {
        bot.emit('guildMemberRemove', msg.member)
    }
}
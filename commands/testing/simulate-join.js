module.exports = {
    name: 'simulate-join',
    aliases: ['simjoin'],
    description: 'Simulates an user join',
    execute (msg, args, bot) {
        bot.emit('guildMemberAdd', msg.member)
    }
}
module.exports = {
    name: 'simulate-leave',
    aliases: ['simleave'],
    description: 'Simulates an user leave',
    execute (msg, args, bot) {
        if (!args[0]) bot.emit('guildMemberRemove', msg.member);
        else {
            const user = msg.guild.members.cache.get(args[0])
            try {
                bot.emit('guildMemberRemove', user);
            } catch (e) {
                console.log('failed to simulate leave!', e)
            }
        }
    }
}
module.exports = {
    name: 'simulate-join',
    aliases: ['simjoin'],
    description: 'Simulates an user join',
    hideFromHelp: true,
    execute (msg, args, bot) {
        if (!args[0]) bot.emit('guildMemberAdd', msg.member);
        else {
            const user = msg.guild.members.cache.get(args[0])
            try {
                bot.emit('guildMemberAdd', user);
            } catch (e) {
                console.log('failed to simulate join!', e)
            }
        }
    }
}
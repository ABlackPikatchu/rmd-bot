const { MessageEmbed } = require('discord.js');
const toDoEmbed = new MessageEmbed()
	.setTitle('To-Do')
    .setTimestamp();
    
module.exports = {
    name: 'to-do',
    description: 'Adds a to-do embed!',
    execute(msg, args) {
        if (msg.member.roles.cache.some(role => role.name === 'Refinement Dev')) {
            const title = args.shift();
            const colour = args.shift();
            toDoEmbed.setColor(colour);
            toDoEmbed.setTitle(title);
            const description = msg.toString().substring(colour.length + title.length + 9);
            toDoEmbed.setDescription(description);
            msg.channel.send({ embed: toDoEmbed })
    } else msg.reply('You do not have the required permissions!')
    }
};

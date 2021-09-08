const { MessageEmbed, Permissions } = require('discord.js');
module.exports = {
    name: 'react',
    description: 'Makes the bot react to a message',
    async execute(msg, args, bot) {
        if (msg.channel.permissionsFor(msg.member).has(Permissions.FLAGS.MANAGE_MESSAGES)) {
        const msgID = args.shift().toLowerCase();
        const m = await msg.channel.messages.fetch(msgID);
        args.forEach(emoji => {
            m.react(emoji);
        });
    } else {
        const permsError = new MessageEmbed()
				.setDescription(`You do not have the required permissions to make me react to a message in this channel!`)
				.setColor('RED');
			return msg.reply({embeds: [permsError]});
    }
    }
};
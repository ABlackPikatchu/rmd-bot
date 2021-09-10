const { MessageEmbed, Permissions } = require('discord.js');
const animatedEmoji = require('../../JSON/animated_emoji.json')
module.exports = {
    name: 'animated-react',
    description: 'Makes the bot react to a message with an animated emoji!',
    async execute(msg, args, bot) {
        if (msg.channel.permissionsFor(msg.member).has(Permissions.FLAGS.MANAGE_MESSAGES)) {
        const msgID = args.shift();
        let m = null;
        try {
        m = await msg.channel.messages.fetch(msgID);
        } catch {}
        if (m != null) args.forEach(emoji => {
            if (emoji.toLowerCase() === 'animated_check') m.react(animatedEmoji.animated_check)
            if (emoji.toLowerCase() === 'animated_test_tubes') m.react(animatedEmoji.animated_test_tubes)
            if (emoji.toLowerCase() === 'announcement') m.react(animatedEmoji.announcement)
        });
    } else {
        const permsError = new MessageEmbed()
				.setDescription(`You do not have the required permissions to make me react to a message in this channel!`)
				.setColor('RED');
			return msg.reply({embeds: [permsError]});
    }
    }
};
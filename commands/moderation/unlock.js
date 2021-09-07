const { MessageEmbed, Permissions } = require('discord.js');
module.exports = {
    name: 'unlock',
    aliases: ['unlockchannel'],
	description: 'Unlocks a channel',
	execute(message, args, bot) {
        let channel = message.mentions.channels.first();
		let reason = args.join(' ') || 'Not Specified';

		if (channel) {
			reason = args.join(' ').slice(22) || 'Not Specified';
		} else {
			channel = message.channel;
		}
        if (channel.permissionsFor(message.member).has(Permissions.FLAGS.MANAGE_CHANNELS)) {
		if (channel.permissionsFor(message.guild.id).has(Permissions.FLAGS.SEND_MESSAGES) === true) {
			const lockchannelError2 = new MessageEmbed()
				.setDescription(`${channel} is not locked!`)
				.setColor('RED');

			return message.channel.send({embeds: [lockchannelError2]});
		}

		channel.permissionOverwrites.create(channel.guild.roles.everyone, { SEND_MESSAGES: true });

		const embed = new MessageEmbed()
			.setTitle(`Channel Unlocked!`)
			.setDescription(`**Channel:** ${channel} \n **Reason:** ${reason}`)
			.setColor('#544B94');

		message.channel.send({embeds: [embed]});

		if (message.channel != channel) {
			const channelUnlockEmbed = new MessageEmbed()
			.setTitle(`Channel Unlocked!`)
			.setDescription(`**Unlocked by:** <@${message.member.id}> \n **Reason:** ${reason}`)
			.setColor('#544B94');
			channel.send({embeds: [channelUnlockEmbed]})
		}
    } else {
        const permsError = new MessageEmbed()
				.setDescription(`You do not have permissions to unlock the channel specified!`)
				.setColor('RED');
			return message.channel.send({embeds: [permsError]});
    }
    }
};
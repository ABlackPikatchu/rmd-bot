const { MessageEmbed, Permissions } = require('discord.js');
module.exports = {
    name: 'lock',
    aliases: ['lockchannel'],
	description: 'Locks a channel',
	execute(message, args, bot) {
        let channel = message.mentions.channels.first();
		let reason = args.join(' ') || 'Not Specified';

		if (channel) {
			reason = args.join(' ').slice(22) || 'Not Specified';
		} else {
			channel = message.channel;
		}
        if (channel.permissionsFor(message.member).has(Permissions.FLAGS.MANAGE_CHANNELS)) {
		if (channel.permissionsFor(message.guild.id).has(Permissions.FLAGS.SEND_MESSAGES) === false) {
			const lockchannelError2 = new MessageEmbed()
				.setDescription(`${channel} is already locked!`)
				.setColor('RED');

			return message.channel.send({embeds: [lockchannelError2]});
		}

		channel.permissionOverwrites.create(channel.guild.roles.everyone, { SEND_MESSAGES: false });

		const embed = new MessageEmbed()
			.setTitle(`Channel Locked!`)
			.setDescription(`**Channel:** ${channel} \n **Reason:** ${reason}`)
			.setColor('#544B94');

		message.channel.send({embeds: [embed]});

		if (message.channel != channel) {
			const channelLockEmbed = new MessageEmbed()
			.setTitle(`Channel Locked!`)
			.setDescription(`**Locked by:** <@${message.member.id}> \n **Reason:** ${reason}`)
			.setColor('#544B94');
			channel.send({embeds: [channelLockEmbed]})
		}
    } else {
        const permsError = new MessageEmbed()
				.setDescription(`You do not have permissions to lock the channel!.`)
				.setColor('RED');
			return message.channel.send({embeds: [permsError]});
    }
    }
};
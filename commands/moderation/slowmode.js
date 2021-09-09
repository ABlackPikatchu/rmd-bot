const { MessageEmbed, Permissions } = require('discord.js');
module.exports = {
    name: 'slowmode',
	description: 'Activates / Disables slowmode in the channel it is ran in!',
	aliases: ['sm'],
    execute(message, args, bot) {
        if (!message.channel.permissionsFor(message.member).has(Permissions.FLAGS.MANAGE_CHANNELS)) {
			const slowmodeError = new MessageEmbed()
				.setDescription(`You do not have permissions to enable/disable slowmode.`)
				.setColor('RED');
			return message.channel.send({embeds: [slowmodeError]});
		}
		if (!args[0]) {
			const slowmodeError2 = new MessageEmbed()
				.setDescription(`You did not provide a time (in seconds). \n\n (Example - ?slowmode 5)`)
				.setColor('RED');
			return message.channel.send({embeds: [slowmodeError2]});
		}
		const currentSlowmode = message.channel.rateLimitPerUser;
		const reason = args[1] ? args.slice(1).join(' ') : 'Not Specified';

		if (args[0] === 'off') {
			if (currentSlowmode === 0) {
				const slowmodeOfferror = new MessageEmbed()
					.setDescription(`Slowmode is already off`)
					.setColor('RED');
				return message.channel.send({embeds: [slowmodeOfferror]});
			}
			message.channel.setRateLimitPerUser(0, reason);
			const slowmodeOff = new MessageEmbed()
				.setDescription(`Slowmode Disabled`)
				.setColor('#544B94');

			return message.channel.send({embeds: [slowmodeOff]});
		}

		const time = args[0];
		const slowmodeError3 = new MessageEmbed()
			.setDescription(`This is not a valid time. Please write the time in seconds. \n\n (Example - +slowmode 5)`)
            .setColor('RED');
		if (isNaN(time)) {
		    return message.channel.send({embeds: [slowmodeError3]});
        } 

		if (time > 21600000) {
			const slowmodeError4 = new MessageEmbed()
				.setDescription(`Time is too high. Make sure its below 6 hours.`)
				.setColor('RED');

			return message.channel.send({embeds: [slowmodeError4]});
		}

		if (currentSlowmode === time) {
			const slowmodeError5 = new MessageEmbed()
				.setDescription(`Slowmode is already set to ${args[0]}`)
				.setColor('RED');
			return message.channel.send({embeds: [slowmodeError5]});
		}

        message.channel.setRateLimitPerUser(time);
		const afterSlowmode = message.channel.rateLimitPerUser;
		if (afterSlowmode > 0) {
			const embed = new MessageEmbed()
				.setTitle(`Slowmode Enabled`)
				.addField(`Slowmode Duration`, args[0] + " seconds")
				.setColor('#544B94');
			if (reason != null) embed.addField(`Reason`, 'Not Specified')
			else embed.addField(`Reason`, reason)
			return message.channel.send({embeds: [embed]});
		}
    }
};

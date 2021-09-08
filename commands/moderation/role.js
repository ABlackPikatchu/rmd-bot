const { MessageEmbed, Permissions } = require('discord.js');
module.exports = {
	name: 'role',
	description: 'Adds or removes a role form the mentioned member',
	permissions: [Permissions.FLAGS.ADMINISTRATOR],
	execute(message, args, bot) {
		const action = args.shift();
		if (action === 'add') {
			const member = message.mentions.members.first();
			if (!member) {
				const addroleError = new MessageEmbed()
					.setDescription(`Please mention a member in order to give them the role`)
					.setColor('RED');
				return message.channel.send({ embeds: [addroleError] });
			}
			args.shift();
			const roleToGive = message.mentions.roles.first();

			if (!roleToGive) {
				const addroleError2 = new MessageEmbed()
					.setDescription(`No Roles Provided`)
					.setColor('RED');
				return message.channel.send({ embeds: [addroleError2] });
			}
			const mentionedPosition = member.roles.highest.position;
			const selfPosition = message.member.roles.highest.position;

			if (selfPosition <= mentionedPosition) {
				const posi = new MessageEmbed()
					.setDescription(`You cannot add role to this member as their role is higher/equal to yours.`)
					.setColor('RED');
				return message.channel.send({ embeds: [posi] });
			}
			if (member.roles.cache.get(roleToGive.id)) {
				const addroleError3 = new MessageEmbed()
					.setDescription(`The member already has that role`)
					.setColor('RED');
				return message.channel.send({ embeds: [addroleError3] });
			}
			member.roles.add(roleToGive);
			const embed = new MessageEmbed()
				.setDescription(`Role ${roleToGive} has been added to ${member}`)
				.setColor('GREEN');

			message.channel.send({ embeds: [embed] });
			message.delete();
		} else if (action === 'remove') {
			const member = message.mentions.members.first();
			if (!member) {
				const addroleError = new MessageEmbed()
					.setDescription(`Please mention a member in order to remove the role from them`)
					.setColor('RED');
				return message.channel.send({ embeds: [addroleError] });
			}
			args.shift();
			const roleToRemove = message.mentions.roles.first();

			if (!roleToRemove) {
				const addroleError2 = new MessageEmbed()
					.setDescription(`No Roles Provided`)
					.setColor('RED');
				return message.channel.send({ embeds: [addroleError2] });
			}
			
			if (!member.roles.cache.get(roleToRemove.id)) {
				const addroleError3 = new MessageEmbed()
					.setDescription(`The member does not have that role!`)
					.setColor('RED');
				return message.channel.send({ embeds: [addroleError3] });
			}
			member.roles.remove(roleToRemove);
			const embed = new MessageEmbed()
				.setDescription(`Role ${roleToRemove} has been removed from ${member}`)
				.setColor('GREEN');

			message.channel.send({ embeds: [embed] });
			message.delete();
		} else return message.reply('Unknown action!');
	} 
};
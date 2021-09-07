const { MessageEmbed, Permissions, GuildMember } = require('discord.js');
module.exports = {
    name: 'unmute',
    description: 'Unmutes a member!',
    permissions: [Permissions.FLAGS.KICK_MEMBERS],
    async execute(message, args, bot) {
        const user = message.mentions.members.first();

		if (!user) {
			return message.channel.send('Please mention the user I need to unmute!').setColor('RED');
		}

		if (user.id === message.author.id) {
			return message.channel.send("Haha I see what you\'re trying to do here xD");
		}

		const muterole = message.guild.roles.cache.find(x => x.name === 'Muted');

		if (!muterole) {
			return message.channel.send("This server doesn\'t have a role name `Muted`");
		}

		if (!user.roles.cache.get(muterole.id)) {
			return message.reply('The given user is not muted!');
		}

		const embed = new MessageEmbed()
            .setAuthor(`You unmuted ${message.mentions.users.first().username}`)
			.setColor('#544B94');

		const DMEmbed = new MessageEmbed()
			.setTitle(`Unmute`)
			.setDescription(`You got unmuted in ${message.guild.name} by ${message.member.username}!`)

		try {
			user.roles.remove(muterole);
			await message.channel.send({embeds: [embed]});
			user.send({embeds: [DMEmbed]});
		} catch (error) {
			console.log(error);
			message.channel.send('Make Sure Your Server has a role named `Muted` And the Appropriate Permissions are set!');
		}
    }
};
const { MessageEmbed, Permissions, GuildMember } = require('discord.js');
module.exports = {
    name: 'mute',
	description: 'Mutes a member!',
	hideFromHelp: true,
    permissions: [Permissions.FLAGS.KICK_MEMBERS],
    async execute(message, args, bot) {
        const user = message.mentions.members.first();

		if (!user) {
			return message.channel.send('Please mention the user I need to mute!').setColor('RED');
		}

		if (user.id === message.author.id) {
			return message.channel.send("Haha I see what you\'re trying to do here xD");
		}

		const reason = args.slice(1).join(' ');

		if (!reason) {
			return message.channel.send('Please give a reason to mute the person!');
		}

		const muterole = message.guild.roles.cache.find(x => x.name === 'Muted');

		if (!muterole) {
			return message.channel.send("This server doesn\'t have a role name `Muted`");
		}

		if (user.roles.cache.get(muterole.id)) {
			return message.reply('The given user is already muted!');
        }
        
        const mentionedPosition = user.roles.highest.position;
        const memberPosition = message.member.roles.highest.position;
        const botPosition = message.guild.me.roles.highest.position;

        if (memberPosition <= mentionedPosition) {
            const kickerr = new MessageEmbed()
                .setDescription('You cannot mute this member because their role is higher/equal to yours!')
                .setColor('RED');

            return message.channel.send({ embeds: [kickerr] });
        } else if (botPosition <= mentionedPosition) {
            const kickerr2 = new MessageEmbed()
                .setDescription('I cannot mute this member because their role is higher/equal to mine!')
                .setColor('RED');

            return message.channel.send({ embeds: [kickerr2] });
        }

		const embed = new MessageEmbed()
            .setAuthor(`You muted ${message.mentions.users.first().username}`)
            .addField(`Reason:`, `${reason}`, false)
			.setColor('#544B94');

		const DMEmbed = new MessageEmbed()
			.setTitle(`Mute`)
			.setDescription(`You got muted in ${message.guild.name} by ${message.member.user}!`)
            .addField(`Reason:`, `${reason ? `**${reason}**` : ''}`, false);


		try {
			user.roles.add(muterole);
			await message.channel.send({embeds: [embed]});
			user.send({embeds: [DMEmbed]});
		} catch (error) {
			console.log(error);
			message.channel.send('Make Sure Your Server has a role named `Muted` And the Appropriate Permissions are set!');
		}
    }
};
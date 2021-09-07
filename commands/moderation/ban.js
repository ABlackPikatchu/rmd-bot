const { MessageEmbed, Permissions, GuildMember } = require('discord.js');
module.exports = {
    name: 'ban',
    description: 'Bans a member!',
    permissions: [Permissions.FLAGS.BAN_MEMBERS],
    async execute(message, args, bot) {
        const mentionedUser = message.mentions.members.first();

        if (!mentionedUser) {
            const banerror3 = new MessageEmbed()
                .setDescription('You need to mention a member to ban!')
                .setColor('RED');

            return message.channel.send({ embeds: [banerror3] });
        }

        const allBans = await message.guild.bans.fetch();

        if (allBans.get(mentionedUser.id)) {
            const banerr = new MessageEmbed()
                .setDescription('The user is already banned!')
                .setColor('#544B94');

            return message.channel.send({ embeds: [banerr] });
        }

        const mentionedMember = message.guild.members.cache.get(mentionedUser.id);

        if (mentionedMember) {
            const mentionedPosition = mentionedMember.roles.highest.position;
            const memberPosition = message.member.roles.highest.position;
            const botPosition = message.guild.me.roles.highest.position;

            if (memberPosition <= mentionedPosition) {
                const banerr2 = new MessageEmbed()
                    .setDescription('You cannot ban this member because their role is higher/equal to yours!')
                    .setColor('RED');

                return message.channel.send({ embeds: [banerr2] });
            } else if (botPosition <= mentionedPosition) {
                const banerr3 = new MessageEmbed()
                    .setDescription('I cannot ban this member because their role is higher/equal to mine!')
                    .setColor('RED');

                return message.channel.send({ embeds: [banerr3] });
            }
        }

        const reason = args.slice(1).join(' ');

        if (!reason) {
			return message.channel.send('Please give a reason to ban the person!');
		}

        try {
            const DMBanSuccess = new MessageEmbed()
                .setTitle('Ban')
                .setDescription(`You got banned in ${message.guild.name} by ${message.member.user}!`)
                .addField(`Reason:`, `${reason ? `**${reason}**` : ''}`, false);


            const banSuccess = new MessageEmbed()
                .setAuthor(`You banned ${message.mentions.users.first().username}`)
                .addField(`Reason:`, `${reason}`, false)
                .setColor('#544B94');

            mentionedMember.createDM().then((DMChannel) => {
                DMChannel
                    .send({ embeds: [DMBanSuccess] })
                    .then(() => {
                        message.channel.send({ embeds: [banSuccess] })
                        message.guild.members.ban(mentionedMember, {reason: reason});
                    }).catch((e) => {
                        console.log('Failed to ban!', e);
                    });
            });
        } catch (error) {
            console.log(error);
            const errorEmbed = new MessageEmbed()
                .setDescription('There was an unexpected error banning this member!')
                .setColor('RED');

            message.channel.send({ embeds: [errorEmbed] });
        }
    }
};
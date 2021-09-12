const { MessageEmbed, Permissions, GuildMember } = require('discord.js');
module.exports = {
    name: 'kick',
    hideFromHelp: true,
    description: 'Kicks a member!',
    permissions: [Permissions.FLAGS.KICK_MEMBERS],
    async execute(message, args, bot) {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!mentionedMember) {
            const kickerror3 = new MessageEmbed()
                .setDescription('You need to mention a member that you want to kick!')
                .setColor('RED');

            return message.channel.send({ embeds: [kickerror3] });
        }

        const mentionedPosition = mentionedMember.roles.highest.position;
        const memberPosition = message.member.roles.highest.position;
        const botPosition = message.guild.me.roles.highest.position;

        if (memberPosition <= mentionedPosition) {
            const kickerr = new MessageEmbed()
                .setDescription('You cannot kick this member because their role is higher/equal to yours!')
                .setColor('RED');

            return message.channel.send({ embeds: [kickerr] });
        } else if (botPosition <= mentionedPosition) {
            const kickerr2 = new MessageEmbed()
                .setDescription('I cannot kick this member because their role is higher/equal to mine!')
                .setColor('RED');

            return message.channel.send({ embeds: [kickerr2] });
        }

        const reason = args.slice(1).join(' ');

        try {
            const DMKickSuccess = new MessageEmbed()
                .setTitle('Kick')
                .setDescription(`You got kicked in ${message.guild.name} by ${message.member.user}!`)
                .addField(`Reason:`, `${reason ? `**${reason}**` : ''}`, false);


            const kickSuccess = new MessageEmbed()
                .setTitle('Kick successful!')
                .setDescription(`Kicked ${mentionedMember}!\n ${reason ? `Reason: **${reason}**` : ''}`)
                .setColor('#544B94');

            mentionedMember.createDM().then((DMChannel) => {
                DMChannel
                    .send({ embeds: [DMKickSuccess] })
                    .then(() => {
                        
                    }).catch((e) => {
                        console.log('Failed to kick!', e);
                    });
            });
            message.channel.send({ embeds: [kickSuccess] })
            mentionedMember.kick(reason)
        } catch (error) {
            console.log(error);
            const errorEmbed = new MessageEmbed()
                .setDescription('There was an unexpected error kicking this member!')
                .setColor('RED');

            message.channel.send({ embeds: [errorEmbed] });
        }
    }
};
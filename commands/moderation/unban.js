const { MessageEmbed, Permissions, GuildMember } = require('discord.js');
const userReg = RegExp(/<@!?(\d+)>/);
module.exports = {
    name: 'unban',
    description: 'Un-bans a member!',
    permissions: [Permissions.FLAGS.BAN_MEMBERS],
    async execute(message, args, bot) {
        const userID = userReg.test(args[0]) ? userReg.exec(args[0])[1] : [0];
		const mentionedUser = await message.client.users.fetch(userID).catch(() => null);

        if (!mentionedUser) {
            const banerror3 = new MessageEmbed()
                .setDescription('You need to mention a member to un-ban!')
                .setColor('RED');

            return message.channel.send({ embeds: [banerror3] });
        }

        const allBans = await message.guild.bans.fetch();

        if (!allBans.get(mentionedUser.id)) {
            const banerr = new MessageEmbed()
                .setDescription('The user is not banned!')
                .setColor('#544B94');

            return message.channel.send({ embeds: [banerr] });
        }

        const mentionedMember = message.guild.members.cache.get(mentionedUser.id);

        const reason = args.slice(1).join(' ');

        try {
            const DMUnbanSuccess = new MessageEmbed()
                .setTitle('Un-Ban')
                .setDescription(`You got un-banned in ${message.guild.name} by ${message.member.user}!`)


            const unbanSuccess = new MessageEmbed()
                .setAuthor(`You un-banned ${message.mentions.users.first().username}`)
                .setColor('#544B94');

            mentionedMember.createDM().then((DMChannel) => {
                DMChannel
                    .send({ embeds: [DMUnbanSuccess] })
                    .then(() => {
                        message.channel.send({ embeds: [unbanSuccess] })
                        message.guild.members.unban(mentionedMember);
                    }).catch((e) => {
                        console.log('Failed to un-ban!', e);
                    });
            });
        } catch (error) {
            console.log(error);
            const errorEmbed = new MessageEmbed()
                .setDescription('There was an unexpected error un-banning this member!')
                .setColor('RED');

            message.channel.send({ embeds: [errorEmbed] });
        }
    }
};
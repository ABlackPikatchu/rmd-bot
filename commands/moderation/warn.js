const { MessageEmbed, Permissions, GuildMember } = require('discord.js');
const db = require('quick.db');
module.exports = {
    name: 'warn',
    description: 'Does stuff regarding warns',
    permissions: [Permissions.FLAGS.BAN_MEMBERS, Permissions.FLAGS.KICK_MEMBERS],
    async execute(message, args, bot) {
        const type = args.shift().toLowerCase();
        if (type === 'list') {
            const mentionedUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (!mentionedUser) {
                const warnError2 = new MessageEmbed()
                    .setDescription('You need to mention a member to see their warnings!')
                    .setColor('RED');
                return message.channel.send({ embeds: [warnError2] });
            }
            
            let warnDoc = await db.fetch(`warns.${mentionedUser.id}`);

            const listEmbed = new MessageEmbed()
                .setTitle(`Warnings list of ${mentionedUser.displayName}`)
                .setColor('YELLOW')

            if (!warnDoc) listEmbed.setDescription(`The user has no warnings!`)
            else warnDoc.forEach(warn => {
                listEmbed.addField(`Warn ${warn.number}`, `Reason: **${warn.reason}**\nModerator: <@${warn.moderator}>`, false)
            })
            message.reply({ embeds: [listEmbed] })
        } else if (type === 'clear') {
            const mentionedUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (!mentionedUser) {
                const warnError2 = new MessageEmbed()
                    .setDescription('You need to mention a member to clear their warnings!')
                    .setColor('RED');
                return message.channel.send({ embeds: [warnError2] });
            }

            const number = args[1]

            const numberError = new MessageEmbed()
                .setDescription(`Unknown warning number : **${number}**!\nRun *${bot.prefix}warn list <@${mentionedUser.id}>* for a list of all their warnings!`)

            let warnDoc = await db.fetch(`warns.${mentionedUser.id}`);

            if (!warnDoc || warnDoc == []) {
                numberError.setDescription(`The user has no warnings!`);
                return message.reply({ embeds: [numberError] });
            }


            if (number.toLowerCase() === 'all') {
                const successClearAll = new MessageEmbed()
                        .setDescription(`Cleared all warnings from user <@${mentionedUser.id}>!`)
                db.set(`warns.${mentionedUser.id}`, [])
                return message.reply({ embeds: [successClearAll] });
            }

            warnDoc.forEach(warn => {
                if (warn.number == number) {
                    const successEmbed = new MessageEmbed()
                        .setDescription(`Cleared warning number ${number} from user <@${mentionedUser.id}>!`)
                    warnDoc.splice(number - 1, 1)
                    for (i = 0; i < number; i++) {
                        if (warnDoc[i].number = i + 1) warnDoc[i].number = i + 1
                    }
                    db.set(`warns.${mentionedUser.id}`, warnDoc)
                    return message.reply({ embeds: [successEmbed] });
                }
            })
            return message.reply({ embeds: [numberError] });
        } else if (type === 'new') {
            const mentionedUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

            if (!mentionedUser) {
                const warnError2 = new MessageEmbed()
                    .setDescription('You need to mention a member to warn them!')
                    .setColor('RED');
                return message.channel.send({ embeds: [warnError2] });
            }
            const mentionedPosition = mentionedUser.roles.highest.position;
            const memberPosition = message.member.roles.highest.position;

            if (memberPosition <= mentionedPosition) {
                const warnError3 = new MessageEmbed()
                    .setDescription('You cannot warn this member as their role position is higher/equal to yours')
                    .setColor('RED');
                return message.channel.send({ embeds: [warnError3] });
            }

            const reason = args.slice(1).join(' ') || 'Not Specified';

            let warnDoc = await db.fetch(`warns.${mentionedUser.id}`);

            if (!warnDoc) warnDoc = [];

            if (warnDoc.length >= 3) {
                return message.channel.send('This member has already been warned 3 times.');
            }

            warnDoc.push({ number: warnDoc.length + 1, reason: reason, moderator: message.member.id })

            const DMWarnSuccess = new MessageEmbed()
                .setTitle('Warning')
                .setDescription(`You got warned in ${message.guild.name} by ${message.member.user}!`)
                .addField(`Reason:`, `${reason ? `**${reason}**` : ''}`, false);

            mentionedUser.send({ embeds: [DMWarnSuccess] });
            db.set(`warns.${mentionedUser.id}`, warnDoc);

            const embed = new MessageEmbed()
                .setDescription(`Warned **${mentionedUser}** \n Reason: **${reason}**`)
                .setColor('#544B94');

            return message.channel.send({ embeds: [embed] });
        }
    }
};

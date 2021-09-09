const { MessageEmbed, Permissions } = require('discord.js');
const quickdb = require('quick.db');
const db = new quickdb.table(`tickets`);
const channelCategories = require('../../JSON/channel_categories.json');
const rolesJSON = require('../../JSON/roles.json');

module.exports = {
    name: 'ticket',
    aliases: ['tickets'],
    description: 'Stuff regarding tickets',
    async execute(message, args, bot) {
        if (message.member.roles.cache.has(rolesJSON.ticket_blacklist)) return message.reply(`You are blacklisted from tickets! You cannot create one!`)

        const type = args.shift().toLowerCase();

        if (type === 'new') {
            const ticketNumber = db.get(`total_number`) + 1;
            message.guild.channels.create(`ticket-${ticketNumber}`, { type: "GUILD_TEXT" }).then((channel) => {
                channel.setParent(channelCategories.open_tickets);
                db.set(`${ticketNumber}`, {
                    'owner': message.member.id
                })
                db.set(`total_number`, ticketNumber)
                channel.permissionOverwrites.set([
                    {
                        id: message.guild.id,
                        deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                    },
                    {
                        id: message.member.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                    },
                    {
                        id: rolesJSON.staff, //Staff
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "MANAGE_CHANNELS"]
                    }
                ]);
                message.reply(`Ticket number ${ticketNumber} created in ${channel}`);
                const channelSuccessTicket = new MessageEmbed()
                    .setTitle(`Ticket number ${ticketNumber} was created!`)
                    .setDescription(`Welcome ${message.member}!\n\nPlease describe the reasoning for opening this ticket, include any information you think may be relevant such as proof, other third parties and so on.\n\nUse the following command to close the ticket:\n**${bot.prefix}ticket close reason_for_closing**`)
                    .addField(`Staff Only:`, `Use the following command to add users to the ticket\n**${bot.prefix}ticket adduser userID**\n\nUse the following command to delete the ticket (cannot be reversed)\n**${bot.prefix}ticket delete**`, false)
                    .setColor('YELLOW')
                channel.send({ embeds: [channelSuccessTicket] }).then((message) => {
                    message.pin();
                }).catch((e) => { console.log(`error while pinning welcome message in ticket number ${ticketNumber}`, e) })
                channel.send(`<@${message.author.id}> <@&${rolesJSON.staff}>`);
            })
        } else if (type === 'close') {
            if (message.channel.name.startsWith('ticket-')) {
                const channel = message.channel;
                const ticketNumber = channel.name.substring(7);
                const ownerID = db.get(`${ticketNumber}`).owner;
                if (message.member.id == ownerID || channel.permissionsFor(message.member).has(Permissions.FLAGS.MANAGE_CHANNELS)) {
                    if (channel.parent.id == channelCategories.closed_tickets) return message.reply(`This ticket is already closed!`);
                    const reason = args.join(' ');
                    if (!reason) {
                        return message.reply('Please give a reason for closing the ticket!');
                    }

                    channel.setParent(channelCategories.closed_tickets);
                    channel.permissionOverwrites.set([
                        {
                            id: message.guild.id,
                            deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                        },
                        {
                            id: ownerID,
                            deny: ["SEND_MESSAGES"],
                            allow: ["VIEW_CHANNEL"]
                        },
                        {
                            id: rolesJSON.staff, //Staff
                            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "MANAGE_CHANNELS"]
                        }
                    ]);
                    const closeSuccesEmbed = new MessageEmbed()
                        .setTitle("Ticket Closed!")
                        .addField(`Reason:`, `**${reason}**`, false)
                        .addField(`Closed by: `, `${message.member}`, true)
                        .setColor(`BLUE`);
                    channel.send({ embeds: [closeSuccesEmbed] });
                } else {
                    message.reply('You do not have the required permissions to close this ticket!')
                }
            } else {
                message.reply('This channel is not a ticket!')
            }
        } else if (type === 'open') {
            if (message.channel.name.startsWith('ticket-')) {
                const channel = message.channel;
                const ticketNumber = channel.name.substring(7);
                const ownerID = db.get(`${ticketNumber}`).owner;
                if (channel.permissionsFor(message.member).has(Permissions.FLAGS.MANAGE_CHANNELS)) {
                    if (channel.parent.id == channelCategories.open_tickets) return message.reply(`This ticket is already opened!`);
                    channel.setParent(channelCategories.open_tickets);
                    channel.permissionOverwrites.set([
                        {
                            id: message.guild.id,
                            deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                        },
                        {
                            id: ownerID,
                            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                        },
                        {
                            id: rolesJSON.staff, //Staff
                            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "MANAGE_CHANNELS"]
                        }
                    ]);
                    const openSuccessEmbed = new MessageEmbed()
                        .setTitle(`Ticket re-opened!`)
                        .addField(`Re-opened by: `, `${message.member}`, true)
                        .setColor('GREEN');
                    channel.send({ embeds: [openSuccessEmbed] });
                } else {
                    message.reply('You do not have the required permissions to re-open this ticket!')
                }
            } else {
                message.reply('This channel is not a ticket!')
            }
        } else if (type === 'delete') {
            if (message.channel.name.startsWith('ticket-')) {
                const channel = message.channel;
                const ticketNumber = channel.name.substring(7);
                const ownerID = db.get(`${ticketNumber}`).owner;
                if (channel.permissionsFor(message.member).has(Permissions.FLAGS.MANAGE_CHANNELS)) {
                    channel.delete();
                } else {
                    message.reply('You do not have the required permissions to delete this ticket!')
                }
            } else {
                message.reply('This channel is not a ticket!')
            }
        } else if (type === 'adduser') {
            if (message.channel.name.startsWith('ticket-')) {
                const channel = message.channel;
                const ticketNumber = channel.name.substring(7);
                if (channel.permissionsFor(message.member).has(Permissions.FLAGS.MANAGE_CHANNELS)) {
                    const user = message.mentions.members.first() || args[0];
                    if (!user) return message.reply('Please mention a member that you want to add to this ticket!');
                    try {
                        await channel.permissionOverwrites.edit(user, { "VIEW_CHANNEL": true, "SEND_MESSAGES": true })
                    } catch (e) {
                        message.reply('There was an error adding the member to this ticket!')
                    }
                } else {
                    message.reply('You do not have the required permissions to add a member to this ticket!')
                }
            } else {
                message.reply('This channel is not a ticket!')
            }
        } else return message.reply(`Unknown argument **${type}**! Valid arguments: **new, close, open, delete, adduser**!`)
    }
}
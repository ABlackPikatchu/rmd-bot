const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const bot = require("../bot.js")

const rolePanels = require('../reactionRoles/index.js');
var roles = new Discord.Collection();

Object.keys(rolePanels).map(key => {
    roles.set(rolePanels[key].messageID, rolePanels[key]);
});

module.exports = {
    name: 'messageReactionRemove',
    once: false,
    async execute(reaction, user) {
        if (reaction.partial) {
            // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
            try {
                await reaction.fetch();
            } catch (error) {
                console.error('Something went wrong when fetching the message:', error);
                // Return as `reaction.message.author` may be undefined/null
                return;
            }
        }

        const userRoles = reaction.message.guild.members.cache.get(user.id).roles;

        if (roles.has(reaction.message.id)) {
            if (roles.get(reaction.message.id).channelID === reaction.message.channel.id) {
                roles.get(reaction.message.id).roles.forEach(role => {
                    if (role.emoji === reaction.emoji.name) {
                        if (userRoles.cache.get(role.id)) {
                            userRoles.remove(role.id);
                            if (roles.get(reaction.message.id).DMMessage) {
                                const successEmbed = new MessageEmbed()
                                    .setTitle('Role')
                                    .setDescription(`The role **${role.name}** got removed from you in the server **${reaction.message.guild.name}**!`)
                                    .setColor(reaction.message.guild.roles.cache.get(role.id).hexColor);
                                user.send({ embeds: [successEmbed] });
                            }
                        } else {
                            if (roles.get(reaction.message.id).DMMessage) {
                                const successEmbed = new MessageEmbed()
                                    .setTitle('Role')
                                    .setDescription(`I cannot remove the role **${role.name}** from you in the server **${reaction.message.guild.name}** because you do not have that role!`)
                                    .setColor(reaction.message.guild.roles.cache.get(role.id).hexColor);
                                user.send({ embeds: [successEmbed] });
                            }
                        }
                    }
                })
            }
        }
    }
};
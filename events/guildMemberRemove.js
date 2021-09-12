const { MessageEmbed } = require('discord.js');
const quickdb = require('quick.db')
const db = new quickdb.table('roles')
module.exports = {
        name: 'guildMemberRemove',
        once: false,
        async execute(member) {
                let rolesList = [];

                try {
                member.roles.cache.forEach(role => {
                        if (role.rawPosition === 0) return; 
                        rolesList.push(role.id);
                })
        } catch (e) {
                console.error(`Error while saving roles of ${member}!`, e)
        }

                db.set(`${member.id}`, rolesList);
                const goodbyeEmbed = new MessageEmbed();

                goodbyeEmbed.setColor('#f00000')
                goodbyeEmbed.setTitle('**' + member.user.username + '** left us! There are now **' + member.guild.memberCount + '** left Among Us!')

                member.guild.channels.cache.find(i => i.name === '👋︱welcome').send({ embeds: [goodbyeEmbed] });
        },
};
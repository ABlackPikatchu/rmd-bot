const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'guildMemberRemove',
	once: false,
	execute(member) {
        const goodbyeEmbed = new MessageEmbed();

        goodbyeEmbed.setColor('#f00000')
        goodbyeEmbed.setTitle('**' + member.user.username + '** left us! There are now **' + member.guild.memberCount + '** left Among Us!')
      
        member.guild.channels.cache.find(i => i.name === '👋︱welcome').send({ embeds: [goodbyeEmbed] });
	},
};
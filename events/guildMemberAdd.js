const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'guildMemberAdd',
	once: false,
	execute(member) {
        if (member.guild.memberCount <= 100) member.roles.add(member.guild.roles.cache.find(i => i.name === 'Early Supporter'))
        const welcomeEmbed = new MessageEmbed();
      
        welcomeEmbed.setColor('#5cf000')
        welcomeEmbed.setTitle('**' + member.user.username + '** is now Among Us other **' + (member.guild.memberCount - 1) + '** people')
        welcomeEmbed.setDescription('Hi, ' + '<@' + member.user.id + '> ! We are happy to see you here!')
        welcomeEmbed.setImage('https://www.bing.com/th?id=OIP.-eKx0rCRrBVkABUHSyo2RwHaEK&w=170&h=96&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2')
      
        member.guild.channels.cache.find(i => i.name === '👋︱welcome').send({ embeds: [welcomeEmbed] });
	},
};
const { MessageEmbed } = require('discord.js');
const githubEmbed = new MessageEmbed()
	.setColor('#211F1F')
	.setTitle('Check out the Refinement mod Github!')
    .setURL('https://github.com/ABlackPikatchu/Refinement')
    .addField('Link:', 'https://github.com/ABlackPikatchu/Refinement', true)
	.setImage('https://www.bing.com/th?id=OIP.ckeUFk-yid0vfWnd56w7wAHaHa&w=204&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2')
    .setTimestamp();
    
module.exports = {
    name: 'github',
    description: 'Github Link',
    execute(msg, args) {
        msg.channel.send({ embeds: [githubEmbed] })
    }
};

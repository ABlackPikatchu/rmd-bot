const { MessageEmbed } = require('discord.js');
const githubEmbed = new MessageEmbed()
	.setColor('#211F1F')
	.setTitle('Check out the RMD Bot Github!')
    .setURL('https://github.com/Matyrobbrt/rmd-bot')
    .addField('Link:', 'https://github.com/Matyrobbrt/rmd-bot', true)
	.setImage('https://www.bing.com/th?id=OIP.ckeUFk-yid0vfWnd56w7wAHaHa&w=204&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2')
    .setTimestamp();
module.exports = {
    name: 'bot-github',
    description: 'RMD Bot Github Link',
    execute(msg, args, bot) {
        msg.channel.send({ embeds: [githubEmbed] });
    }
};

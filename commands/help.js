const { MessageEmbed } = require('discord.js');
const helpEmbed = new MessageEmbed()
    .setColor('#211F1F')
    .setTitle('Command Help')
    .setTimestamp();
    
module.exports = {
    name: 'help',
    description: 'Offers help about a command!',
    execute(msg, args) {
        if (args == 'to-do') {
            helpEmbed.setColor('#5bdd61');
            helpEmbed.setTitle('How to use the command: *to-do*');
            helpEmbed.setDescription(
                "The *to-do* command needs 3 arguments:\n" +
                "**title**\n" +
                "**colour**\n" +
                "**description**\n\n" +
                "e.g.: Running __(prefix)to-do This-is-a-todo #ffffff this is a to-do text__\n" +
                "Will result in an embed with the text *This-is-a-todo*, the colour *#ffffff* and the description *this is a to-do text*"
            );
            msg.channel.send({ embed: helpEmbed })
        }
    }
};

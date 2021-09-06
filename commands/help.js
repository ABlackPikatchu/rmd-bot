const { MessageEmbed } = require('discord.js');
const helpEmbed = new MessageEmbed()
    .setColor('#211F1F')
    .setTitle('Command Help')
    .setTimestamp();
    
module.exports = {
    name: 'help',
    description: 'Offers help about a command!',
    execute(msg, args) {
        if (args == 'embed') {
            helpEmbed.setColor('#5bdd61');
            helpEmbed.setTitle('How to use the command: *embed*');
            helpEmbed.setDescription(
                "The *embed* command needs 3 arguments:\n" +
                "**title** - has to be one word (e.g This-Is-An-Embed)\n" +
                "**colour** - has to be an hex value (e.g. #11f0f0)\n" +
                "**description**\n\n" +
                "e.g.: Running __(prefix)embed This-is-a-todo #ffffff this is a to-do text__\n\n" +
                "Will result in an embed with the text *This-is-a-todo*, the colour *#ffffff* and the description *this is a to-do text*"
            );
            msg.channel.send({ embed: helpEmbed })
        }
    }
};

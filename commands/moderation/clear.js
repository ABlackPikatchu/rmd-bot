const { MessageEmbed, Permissions } = require('discord.js');

const aliases = ['clr', 'delete', 'del'];
const description = 'Clears the last x amount of messages in the channel it was ran in!';
const helpEmbed = new MessageEmbed()
    .setTitle("How to use the **CLEAR** command!")
    .setColor('RANDOM')
    .setDescription(description)
    .addFields(
        { name: "Name", value: "clear", inline: false },
        { name: "Aliases", value: aliases.toString() + "\n", inline: false },
        { name: "Usage", value: "clear ***number***", inline: false },
        {
            name: "Arguments", value:
                "**number** - the number of messages to delete (between 1 and 100) (mandatory)\n" , inline: false
        }
    );

module.exports = {
    name: 'clear',
    description: description,
    helpEmbed: helpEmbed,
    aliases: aliases,
    async execute(message, args, bot) {
        let channel = message.channel;
        if (channel.permissionsFor(message.member).has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            if (!args[0]) {
                return message.channel.send('Please Enter An Amount Between 1 and 100');
            }

            let deleteAmount;

            if (parseInt(args[0]) > 100) {
                deleteAmount = 100;
            } else {
                deleteAmount = parseInt(args[0]);
            }

            await message.channel.bulkDelete(deleteAmount, true);

            const embed = new MessageEmbed()
                .setDescription(`Successfully deleted ${deleteAmount} messages!`)
                .setColor('#544B94');

            // eslint-disable-next-line no-shadow
            await message.channel.send({embeds: [embed]}).then(message => message.delete({ timeout: 5000 }));
        } else {
            const permsError = new MessageEmbed()
                .setDescription(`You do not have permissions to clear messages from this channel!`)
                .setColor('RED');
            return message.reply({ embeds: [permsError] });
        }
    }
};
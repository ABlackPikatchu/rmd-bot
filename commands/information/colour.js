const { MessageEmbed, Permissions } = require('discord.js');
const { Color, isColor} = require('coloras');

const aliases = ['color'];

module.exports = {
    name: 'colour',
    aliases: aliases,
    description: 'Shows information about a colour!',
    aliases: aliases,
    async execute(msg, args, bot) {
        try {
            const arg = args.shift();
            let random
            if (!arg) random = true;
            else if (!isColor(arg).color) return msg.reply({ embeds: [new MessageEmbed().setDescription(`Invalid colour **${arg}**`).setColor('RED')] });
            const value = random ? null : args.join(" ");
            const colour = new Color(value);
            const embed = new MessageEmbed() // Prettier
                .setTitle("Colour Info")
                .addField("HEX", "`" + colour.toHex() + "`", false)
                .addField("RGB", "`" + colour.toRgb() + "`", false)
                .addField("HSL", "`" + colour.toHsl() + "`", false)
                .addField("HSV", "`" + colour.toHsv() + "`", false)
                .addField("CMYK", "`" + colour.toCmyk() + "`", false)
                .setThumbnail(colour.imageUrl)
                .setColor(colour.toHex());
            msg.reply({embeds: [embed]})
        } catch (e) {
            console.log(`Colour command error: `, e);
            msg.reply({embeds: [new MessageEmbed().setDescription(`Something went wrong... ${bot.normal_emojis.sadness}`).setColor(`RED`)]})
        }
    }
};
const { MessageEmbed, Permissions } = require('discord.js');
const quickdb = require('quick.db');
const db = new quickdb.table(`commands`)

module.exports = {
    name: "custom-command",
    aliases: ['cc', 'command'],
    hideFromHelp: true,
    permissions: [Permissions.FLAGS.ADMINISTRATOR],
    description: 'Custom command stuff',
    async execute(message, args, bot) {
        const action = args.shift().toLowerCase();
        if (action === 'add') {
            const name = args.shift().toLowerCase();
            if (!await db.fetch(`${name}`)) {
                const content = args.join(' ');
                db.set(`${name}`, {content: content});
                return message.reply(`Added command **${name}**, with the content:\n**${content}**`);
            } else return;
        } else if (action === 'delete') {
            const name = args.shift().toLowerCase();
            if (!await db.fetch(`${name}`)) return message.reply(`Unknown command **${name}**!`)
            else {
                db.delete(`${name}`);
                return message.reply(`Successfully deleted command **${name}**`);
            }
        }
    }
}
const { MessageEmbed } = require('discord.js');
const bannedWords = require('../JSON/banned_words.json');
const channelsJSON = require('../JSON/channels.json');
const config = require('../JSON/config.json');
const botJs = require('../bot.js');
const index = require('./index.js');

module.exports = {
    async execute(msg, args, bot) {
        if (!msg.guild) return;
        try {
        if (msg.member.roles.cache.some(role => config.auto_mod.ignored_roles.includes(role.id))) return;
        } catch(e) {
            console.log('Failed to check for roles!', e);
        }
        bannedWords.banned_words.forEach(async (word) => {
            if (msg.toString().toLowerCase().indexOf(word.toLowerCase()) > -1) {
                index.BannedWord.execute(word, msg, bot)
            }
        })
    }
};
const { MessageEmbed } = require('discord.js');
const bannedWords = require('../JSON/banned_words.json');
const channelsJSON = require('../JSON/channels.json');
const botJs = require('../bot.js');
const index = require('./index.js');

module.exports = {
    async execute(msg, args, bot) {
        const spamLogs = msg.guild.channels.cache.get(channelsJSON.spam_logs);

        bannedWords.banned_words.forEach(async (word) => {
            if (msg.toString().toLowerCase().indexOf(word.toLowerCase()) > -1) {
                index.BannedWord.execute(word, msg, bot, spamLogs)
            }
        })
    }
};
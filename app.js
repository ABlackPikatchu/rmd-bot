const Discord = require('discord.js');
require('dotenv').config();
const { Intents } = require('discord.js');
const bot = new Discord.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
})
bot.login(process.env.BOT_TOKEN);
bot.commands = new Discord.Collection();
const botCommands = require('./commands');
let prefix = '+';

Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

bot.on('message', msg => {
  const args = msg.content.split(/ +/);
  let command = args.shift().toLowerCase();
  if (command.startsWith(prefix)) {
    command = command.substring(prefix.length, command.length)
    console.info(`Called command: ${command}`);

    if (!bot.commands.has(command)) return;

    try {
      bot.commands.get(command).execute(msg, args);
    } catch (error) {
      console.error(error);
      msg.reply('there was an error trying to execute that command!');
    }
  }
});
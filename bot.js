const Discord = require('discord.js');
require('dotenv').config();
const { Intents } = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_MEMBERS]
})
bot.login(process.env.BOT_TOKEN);
bot.commands = new Discord.Collection();
const botCommands = require('./commands');
let prefix = '+';

Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
  if (botCommands[key].aliases != undefined) {
    Object.keys(botCommands[key].aliases).map(aliasKey => {
      bot.commands.set(botCommands[key].aliases[aliasKey], botCommands[key]);
    })
    console.log("*" + botCommands[key].name + "* command loaded, with the aliases: *" + botCommands[key].aliases.toString() + "* !");
  } else console.log("*" + botCommands[key].name + "* command loaded!");
});

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    bot.once(event.name, (...args) => event.execute(...args));
  } else {
    bot.on(event.name, (...args) => event.execute(...args));
  }
}

bot.on('messageCreate', msg => {
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
})

module.exports = bot;
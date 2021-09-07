const Discord = require('discord.js');
require('dotenv').config();
const { Intents, Collection } = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client({
  intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES, 
    Intents.FLAGS.GUILD_INVITES, 
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS
  ]
})
bot.login(process.env.BOT_TOKEN);
bot.commands = new Discord.Collection();
const botCommands = require('./commands');
bot.prefix = '+';

Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
  if (botCommands[key].aliases != undefined) {
    Object.keys(botCommands[key].aliases).map(aliasKey => {
      bot.commands.set(botCommands[key].aliases[aliasKey], botCommands[key]);
    })
    console.log("*" + botCommands[key].name + "* command loaded, with the aliases: *" + botCommands[key].aliases.toString() + "* !");
  } else console.log("*" + botCommands[key].name + "* command loaded!");
});
console.log("------------------------");
const helpCommand = require('./help');
console.log("------------------------");

bot.slashCommands = new Collection();
const slashCommandFiles = fs.readdirSync('./slashCommands').filter(file => file.endsWith('.js'));

for (const file of slashCommandFiles) {
	const command = require(`./slashCommands/${file}`);
  bot.slashCommands.set(command.data.name, command);
  console.log("Registered slash command: " + command.data.name);
}
console.log("------------------------");

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
  if (command.startsWith(bot.prefix)) {
    command = command.substring(bot.prefix.length, command.length)
    console.info(`Called command: ${command}`);
    if (command  === 'help') {
      helpCommand.execute(msg, args, bot);
    } else {
    if (!bot.commands.has(command)) return;

    try {
      bot.commands.get(command).execute(msg, args, bot);
    } catch (error) {
      console.error(error);
      msg.reply('there was an error trying to execute that command!');
    }
  }
}
});

bot.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = bot.slashCommands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

module.exports = bot;
const Discord = require('discord.js');
require('dotenv').config();
const { Intents } = require('discord.js');
const bot = new Discord.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_MEMBERS]
})
bot.login(process.env.BOT_TOKEN);
bot.commands = new Discord.Collection();
const botCommands = require('./commands');
let prefix = '+';

Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
  console.log(botCommands[key].name + " command loaded!");
});

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
});

bot.on('guildMemberAdd', member => {
  if (member.guild.memberCount <= 100) member.roles.add(member.guild.roles.cache.find(i => i.name === 'Early Supporter'))
  const welcomeEmbed = new Discord.MessageEmbed();

  welcomeEmbed.setColor('#5cf000')
  welcomeEmbed.setTitle('**' + member.user.username + '** is now Among Us other **' + (member.guild.memberCount - 1) + '** people')
  welcomeEmbed.setDescription('Hi, ' + '<@' + member.user.id + '> ! We are happy to see you here!')
  welcomeEmbed.setImage('https://www.bing.com/th?id=OIP.-eKx0rCRrBVkABUHSyo2RwHaEK&w=170&h=96&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2')

  member.guild.channels.cache.find(i => i.name === '👋︱welcome').send(welcomeEmbed)
});

bot.on('guildMemberRemove', member => {
  const goodbyeEmbed = new Discord.MessageEmbed()

  goodbyeEmbed.setColor('#f00000')
  goodbyeEmbed.setTitle('**' + member.user.username + '** left us! There are now **' + member.guild.memberCount + '** left Among Us!')

  member.guild.channels.cache.find(i => i.name === '👋︱welcome').send(goodbyeEmbed)
});
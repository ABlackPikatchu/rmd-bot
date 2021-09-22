require('module-alias/register')

const Discord = require('discord.js');
require('dotenv').config();
const { Intents, Collection, MessageEmbed } = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_INVITES,
		Intents.FLAGS.GUILD_MESSAGE_TYPING,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_BANS,
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGE_TYPING,
		Intents.FLAGS.GUILD_PRESENCES,
		Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS
	],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER', 'GUILD_MEMBER']
})
bot.login(process.env.BOT_TOKEN);
const quickdb = require('quick.db');
const customCommandsTable = new quickdb.table('commands');
bot.commands = new Discord.Collection();
const botCommands = require('./commands');
bot.config = require('./JSON/config.json');
bot.prefix = bot.config.prefix;
if (quickdb.get('prefix') != null) bot.prefix = quickdb.get('prefix');
bot.normal_emojis = require('./JSON/emoji.json');
bot.animated_emojis = require('./JSON/animated_emoji.json');
const autoMod = require('./autoMod/autoMod');
const levelling = require('./levelling/handleLevelling');

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
const slashUtilitiesCommandFiles = fs.readdirSync('./slashCommands/utilities').filter(file => file.endsWith('.js'));
const slashModerationCommandFiles = fs.readdirSync('./slashCommands/moderation').filter(file => file.endsWith('.js'));

for (const file of slashCommandFiles) {
	const command = require(`./slashCommands/${file}`);
	bot.slashCommands.set(command.data.name, command);
	console.log("Registered slash command: " + command.data.name);
}

for (const file of slashUtilitiesCommandFiles) {
	const command = require(`./slashCommands/utilities/${file}`);
	bot.slashCommands.set(command.data.name, command);
	console.log("Registered slash command: " + command.data.name);
}

for (const file of slashModerationCommandFiles) {
	const command = require(`./slashCommands/moderation/${file}`);
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

let recentlyRan = [];

bot.on('messageCreate', msg => {
	const args = msg.content.split(/ +/);
	let command = args.shift().toLowerCase();
	if (command.startsWith(bot.prefix)) {
		command = command.substring(bot.prefix.length, command.length)
		console.info(`Called command: ${command}`);
		if (command === 'help') {
			helpCommand.execute(msg, args, bot);
		} else {
			if (!bot.commands.has(command)) {
				if (customCommandsTable.has(`${command}`)) return msg.reply(customCommandsTable.get(`${command}`).content);
				else return;
			}

			try {
				if (bot.commands.get(command).permissions == null) execute(command, msg, args);
				else {
					if (msg.member.permissions.has(bot.commands.get(command).permissions)) {
						execute(command, msg, args);
					} else {
						const permsError = new MessageEmbed()
							.setDescription(`${bot.normal_emojis.perms} You do not have the required permissions to run the command: **` + command + "**!")
							.setColor('RED');
						return msg.reply({ embeds: [permsError] });
					}

				}
			} catch (e) {
				console.error(e);
				msg.reply({ embeds: [new MessageEmbed().setDescription(`${bot.normal_emojis.sadness} There was an error trying to execute that command!`).setColor('RED')] });
			}
		}
	} else if (bot.config.auto_mod.enabled) autoMod.execute(msg, args, bot);
	if (bot.config.levelling.enabled) levelling.execute(msg, args, bot);
});

bot.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = bot.slashCommands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, bot);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

function execute(execCommand, msg, args) {
	const command = bot.commands.get(execCommand);
	const cooldown = command.cooldown;
	const globalCooldown = command.globalCooldown;
	const cooldownString = `${msg.guild.id}-${msg.member.id}-${command.name}`;
	const globalCooldownString = `global-${msg.guild.id}-${command.name}`;

	if (globalCooldown > 0) {
		if (recentlyRan.includes(globalCooldownString)) {
			let shouldIgnore = false;

			try {
				msg.member.roles.cache.forEach(role => {
					if (bot.config.cooldown.ignored_roles.includes(`${role.id}`)) shouldIgnore = true;
				})
				
				bot.config.cooldown.ignored_members.forEach(member => {
					if (msg.member.id == member) shouldIgnore = true;
				})
			} catch (e) {
				
			}

			if (!shouldIgnore) return msg.reply({ embeds: [new MessageEmbed().setDescription(`${bot.normal_emojis.hourglass_flowing_sand} You cannot run this command yet, as the command is on cooldown! Please wait!`).setColor('RED')] });
		}
		else {
			recentlyRan.push(globalCooldownString)
			setTimeout(() => {
				recentlyRan = recentlyRan.filter((string) => {
					return string !== globalCooldownString;
				})
			}, 1000 * globalCooldown);
		}
	}

	if (cooldown > 0) {
		if (recentlyRan.includes(cooldownString)) {
			let shouldIgnore = false;

			try {
				msg.member.roles.cache.forEach(role => {
					if (bot.config.cooldown.ignored_roles.includes(`${role.id}`)) shouldIgnore = true;
				})
				
				bot.config.cooldown.ignored_members.forEach(member => {
					if (msg.member.id == member) shouldIgnore = true;
				})
			} catch (e) {
				
			}

			if (!shouldIgnore) return msg.reply({ embeds: [new MessageEmbed().setDescription(`${bot.normal_emojis.hourglass_flowing_sand} You cannot run this command yet, as you are on cooldown! Please wait!`).setColor('RED')] });
		}
		else {
			recentlyRan.push(cooldownString)
			setTimeout(() => {
				recentlyRan = recentlyRan.filter((string) => {
					return string !== cooldownString;
				})
			}, 1000 * cooldown);
		}
	}


	command.execute(msg, args, bot);
}

module.exports = bot;
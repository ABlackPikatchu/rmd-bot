const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
let helpEmbed = new MessageEmbed()
	.setColor('#211F1F')
	.setTitle('Command Help')
	.setTimestamp();

let commandList = new MessageEmbed()
	.setColor('#e5df2a')
	.setTitle('Command List')

const botCommands = require('./commands/index.js');
var commands = new Discord.Collection();

const bot = require("./bot.js")

console.log("Loaded help command for: " + Object.keys(botCommands));
Object.keys(botCommands).map(key => {
	commands.set(botCommands[key].name, botCommands[key]);
	if (botCommands[key].aliases != undefined) {
		Object.keys(botCommands[key].aliases).map(aliasKey => {
			commands.set(botCommands[key].aliases[aliasKey], botCommands[key]);
		})
	}
});

module.exports = {
	name: 'help',
	description: 'Offers help about a command!',
	helpEmbed: helpEmbed,
	execute(msg, args, bot) {
		if (args[0] != null) {
			let command = args.shift().toString().toLowerCase();

			if (commands.has(command)) {

				try {
					if (commands.get(command).helpEmbed != null) msg.reply({ embeds: [commands.get(command).helpEmbed] });
					else if (commands.get(command).help != null) {

						//Data collection
						const help = commands.get(command).help;
						const title = `How to use the **${commands.get(command).name.toUpperCase()}** command!`;
						const colour = help.colour ? help.colour : 'RANDOM';
						const description = commands.get(command).description ? commands.get(command).description : 'No description provided';
						const name = commands.get(command).name;
						const aliases = commands.get(command).aliases ? commands.get(command).aliases : 'None';
						const permissions = help.permissions ? help.permissions : 'None';
						let userCooldown = commands.get(command).cooldown ? commands.get(command).cooldown : '0';
						let globalCooldown = commands.get(command).globalCooldown ? commands.get(command).globalCooldown : '0';
						const usage = help.usage ? help.usage : 'Not Specified';
						const arguments = help.arguments ? help.arguments : [];

						userCooldown += ` seconds`;
						globalCooldown += ` seconds`;

						let stringArguments = '';
						arguments.forEach(arg => {
							stringArguments += arg + "\n";
						});
						if (stringArguments === '') stringArguments = 'None Specified'

						//Embed creation
						const embed = new MessageEmbed()
							.setTitle(title)
							.setColor(colour)
							.setDescription(description)
							.addFields(
								{ name: 'Name', value: name, inline: false },
								{ name: 'Aliases', value: aliases.toString(), inline: false },
								{ name: 'Permissions/Roles Required', value: permissions, inline: false },
								{ name: 'User Cooldown', value: userCooldown, inline: false },
								{ name: 'Global Cooldown', value: globalCooldown, inline: false },
								{ name: 'Usage', value: usage, inline: false },
								{ name: 'Arguments', value: stringArguments, inline: false }
							);

						msg.reply({ embeds: [embed] })
					}
					else {
						msg.reply({ embeds: [new MessageEmbed().setDescription(`The command *${command}* does not have any help message!`).setColor('BLUE')] });
					}
				} catch (error) {
					console.error(error);
					msg.reply('there was an error trying to execute that command!');
				}
			} else {
				msg.reply({ embeds: [new MessageEmbed().setTitle(`Unknown command *${command}*!`).setDescription(`Run *` + bot.prefix + "help" + `* for a list of commands!`).setColor('RED')] })
			}
		} else {
			var description = 'Run *' + bot.prefix + 'help commandName* for help with a specific command!\n\nCommand List:\n';
			var addToDescription;
			Object.keys(botCommands).map(key => {
				if (!botCommands[key].hideFromHelp) {
					if (botCommands[key].aliases != null) addToDescription = "**" + botCommands[key].name + "**" + " (aliases: *" + botCommands[key].aliases + "*): " + botCommands[key].description + "\n";
					else addToDescription = "**" + botCommands[key].name + "**: " + botCommands[key].description + "\n";
					description += addToDescription;
				}
			});
			commandList.setDescription(description);
			msg.reply({ embeds: [commandList] });
		}
	}
};

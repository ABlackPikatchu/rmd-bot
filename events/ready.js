const { MessageEmbed, WebhookClient } = require('discord.js');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {

		async function setPerms(command, perms) {
			await command.permissions.set({ permissions: perms })
		}

		if (!client.application?.owner) await client.application?.fetch();
		await client.guilds.cache.get('871030809627349093')?.commands.fetch();
		client.slashCommands.forEach(slashCommand => {
			if (slashCommand.permissions != null && slashCommand.permissions != []) {
				const command = client.guilds.cache.get('871030809627349093')?.commands.cache.find(i => i.name === slashCommand.data.name);
				const perms = slashCommand.permissions;
				setPerms(command, perms)
				///console.log(`Perms for command **${command.name}** have been set to: ${JSON.stringify(perms)}`)
			}
		});
		//console.log(`------------------------`);
		console.log(`Ready! Logged in as ${client.user.tag}! The prefix is *${client.prefix}*`);
		client.user.setActivity("Run +help for a list of commands!", { type: 'PLAYING' });
		console.log('Status set!');
		console.log(`------------------------`);
	},
};
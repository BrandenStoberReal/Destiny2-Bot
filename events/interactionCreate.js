const Handler = require('discord-handlers');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
		const handler = new Handler();
		// Pass in both the interaction and client:
		await handler.handleInteraction(interaction, client);
	},
};
/* eslint-disable no-inline-comments */
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Sends the bot's current WebSocket ping",
  category: "Info",
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with the bot's current WebSocket ping"),
  execute(interaction, client) {
    interaction.reply({
      content: "Pong! ``" + client.ws.ping + "ms``",
      ephemeral: false,
    });
  },
};

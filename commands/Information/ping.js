/* eslint-disable no-inline-comments */
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { sendPublicEmbed, handleError } = require(global.root +
  "/libraries/util.js");

module.exports = {
  name: "ping",
  description: "Sends the bot's current WebSocket ping",
  category: "Info",
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with the bot's current WebSocket ping"),
  execute(interaction, client) {
    try {
      sendPublicEmbed(
        interaction,
        "Pong!",
        "Websocket Ping: ``" + client.ws.ping + "ms``",
        "https://media.tenor.com/0AVbKGY_MxMAAAAM/check-mark-verified.gif"
      );
    } catch (e) {
      handleError(interaction, e);
    }
  },
};

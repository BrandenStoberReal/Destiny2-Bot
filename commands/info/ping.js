const Discord = require("discord.js");
const { Command } = require("discom");
const brandUtil = require(global.utilLib);

module.exports = new Command({
  name: "ping",
  category: "info",
  description: "Shows the bot's ping",
  usage: "ping",
  onError: async ({ reply }, error) => {
    return require("util").handleError(reply, error);
  },
  async run({ client, reply, edit }) {
    try {
      const startTime = Date.now();

      var ping = new Discord.EmbedBuilder()
        .setDescription("**Pinging...**")
        .setColor(global.embedcolor);
      await reply({ embeds: [ping] });

      const endTime = Date.now();
      var pinged = new Discord.EmbedBuilder()
        .setColor(global.embedcolor)
        .setTimestamp()
        .setThumbnail(brandUtil.CheckmarkGif)
        .setDescription(
          `**Rest API Latency**\n\`${
            endTime - startTime
          }ms\`\n**Websocket Latency**\n\`${client.ws.ping}ms\``
        )
        .setFooter({
          text: client.user.username,
          iconURL: client.user.avatarURL({
            size: 512,
            format: "png",
            dynamic: true,
          }),
        })
        .setTitle("🏓 Pong! 🏓");

      await edit({ embeds: [pinged] });
    } catch (e) {
      console.log(e);
    }
  },
});

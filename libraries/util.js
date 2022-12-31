const util = require("util");
const Discord = require("discord.js");
const EmbedColor = global.embedcolor;

// Useful sprites
module.exports.CheckmarkGif =
  "https://cdn.discordapp.com/emojis/723073203307806761.gif?v=1";

// Handles errors if any pop up
module.exports.handleError = async function handleError(reply, error) {
  if (typeof error !== "string") error = util.inspect(error, { depth: 0 });
  const embed = new Discord.EmbedBuilder()
    .setTitle("Something went wrong!")
    .setDescription("```js\n" + error + "\n```")
    .setColor("#ED4245")
    .setTimestamp()
    .setFooter({ text: "Skill issue istg" });

  return await reply({ embeds: [embed] }).catch(() => {});
};

module.exports.sendEmbed = async function sendEmbed(
  reply,
  title,
  description,
  public = false,
  color = EmbedColor,
  thumbnail = null,
  image = null,
  footer = null
) {
  const embed = new Discord.EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setTimestamp()
    .setColor(color);

  // If programmer included a thumbnail
  if (thumbnail) {
    embed.setThumbnail(thumbnail);
  }

  // If programmer included a footer
  if (footer) {
    embed.setFooter(footer);
  } else {
    embed.setFooter({
      text: client.user.username,
      iconURL: client.user.avatarURL({
        size: 512,
        format: "png",
        dynamic: true,
      }),
    });
  }

  // If programmer included an image
  if (image) {
    embed.setImage(image);
  }

  // Reply to the original message
  return await reply({ embeds: [embed], ephemeral: !public }).catch((error) => {
    this.handleError(reply, error);
  });
};

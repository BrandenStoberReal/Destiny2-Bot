const util = require("util");
const Discord = require("discord.js");
const EmbedColor = global.embedcolor;

// Handles errors if any pop up
module.exports.handleError = async function handleError(interaction, error) {
  if (typeof error !== "string") error = util.inspect(error, { depth: 0 });
  const embed = new Discord.EmbedBuilder()
    .setTitle("Something went wrong!")
    .setDescription("```js\n" + error + "\n```")
    .setColor("#ED4245")
    .setTimestamp()
    .setFooter({ text: "Skill issue istg" });

  return await interaction
    .reply({ embeds: [embed], ephemeral: true })
    .catch(() => {});
};

// Ephemeral reply
module.exports.sendPrivateEmbed = async function sendEmbed(
  interaction,
  title,
  description,
  thumbnail = "None"
) {
  let embed = new Discord.EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor(EmbedColor)
    .setTimestamp()
    .setFooter({
      iconURL: client.user.avatarURL(),
      text: "Euphorium " + global.version,
    });
  if (thumbnail != "None") {
    embed.setThumbnail(thumbnail);
  }

  return await interaction
    .reply({ embeds: [embed], ephemeral: true })
    .catch(() => {});
};

// Non-ephemeral reply
module.exports.sendPublicEmbed = async function sendEmbed(
  interaction,
  title,
  description,
  thumbnail = "None"
) {
  let embed = new Discord.EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor(EmbedColor)
    .setTimestamp()
    .setFooter({
      iconURL: client.user.avatarURL(),
      text: "Euphorium " + global.version,
    });
  if (thumbnail != "None") {
    embed.setThumbnail(thumbnail);
  }

  return await interaction
    .reply({ embeds: [embed], ephemeral: false })
    .catch(() => {});
};

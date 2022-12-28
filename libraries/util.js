const util = require("util");
const Discord = require("discord.js");
const EmbedColor = "Blue"; // Change if needed

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
  if (thumbnail == "None") {
    const embed = new Discord.EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor(EmbedColor)
      .setTimestamp()
      .setFooter({ text: "Euphorium 1.0.0" });
  } else {
    const embed = new Discord.EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor(EmbedColor)
      .setThumbnail(thumbnail)
      .setTimestamp()
      .setFooter({ text: "Euphorium 1.0.0" });
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
  let embed;
  if (thumbnail == "None") {
    embed = new Discord.EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor(EmbedColor)
      .setTimestamp()
      .setFooter({ text: "Euphorium 1.0.0" });
  } else {
    embed = new Discord.EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor(EmbedColor)
      .setThumbnail(thumbnail)
      .setTimestamp()
      .setFooter({ text: "Euphorium 1.0.0" });
  }

  return await interaction
    .reply({ embeds: [embed], ephemeral: false })
    .catch(() => {});
};

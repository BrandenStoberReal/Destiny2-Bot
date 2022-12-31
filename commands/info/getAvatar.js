const Discord = require("discord.js");
const util = require("util");
const brandUtil = require(global.utilLib);
const { Command, ArgumentType } = require("discom");
const { Console } = require("console");

module.exports = new Command({
  name: "getavatar",
  category: "info",
  description: "Shows a user's avatar",
  usage: "getavatar [user]",
  options: [
    {
      name: "user",
      description: "User to get avatar of",
      type: ArgumentType.USER,
      required: false,
    },
  ],
  onError: async ({ reply }, error) => {
    return brandUtil.handleError(reply, error);
  },
  async run({ client, reply, guild, author, args }) {
    let user = args.get("user")?.user;

    // If operator actually supplied a user
    if (user) {
      let avatarURL = user.avatarURL();

      let Embed = new Discord.EmbedBuilder()
        .setAuthor({
          name: "Avatar of " + user.tag,
          url: avatarURL,
        })
        .setColor(global.embedcolor)
        .setImage(avatarURL)
        .setFooter({
          text: client.user.username,
          iconURL: client.user.avatarURL({
            size: 512,
            format: "png",
            dynamic: true,
          }),
        })
        .setTimestamp();
      return await reply({ embeds: [Embed] });
    }
    // If operator didn't supply a user
    else {
      user = author;
      let avatarURL = user.avatarURL();

      let Embed = new Discord.EmbedBuilder()
        .setAuthor({
          name: "Avatar of " + user.tag,
          url: avatarURL,
        })
        .setColor(global.embedcolor)
        .setThumbnail(avatarURL)
        .setFooter({
          text: client.user.username,
          iconURL: client.user.avatarURL({
            size: 512,
            format: "png",
            dynamic: true,
          }),
        })
        .setTimestamp();
      return await reply({ embeds: [Embed] });
    }
  },
});

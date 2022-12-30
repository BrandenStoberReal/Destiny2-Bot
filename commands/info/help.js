const Discord = require("discord.js");
const util = require("util");
const brandUtil = require(global.utilLib);
const { Command, ArgumentType } = require("discom");
const { Console } = require("console");

module.exports = new Command({
  name: "help",
  category: "info",
  description: "Sends all commands or the help for commands",
  usage: "help [command]",
  options: [
    {
      name: "Command Or Category",
      description: "Gets the info on a command or category",
      type: ArgumentType.STRING,
      required: false,
    },
  ],
  onError: async ({ reply }, error) => {
    return brandUtil.handleError(reply, error);
  },
  async run({ client, reply, guild, author, args }) {
    const PREFIX = "/"; // Will always return "/" due to Discord API changes
    let query; // Placeholder variable, gets filled below

    // Somewhat dumb variable integrity check
    if (args.data[0]) {
      query = args.data[0].value.toString();
    } else {
      query = undefined;
    }

    // If the user specifies a command/category to get more information on
    if (query != undefined) {
      // If query is a command
      if (client.commands.has(query.toLowerCase())) {
        const command = client.commands.get(query.toLowerCase());
        const userRequired = command.userRequiredPermissions
          ? typeof command.userRequiredPermissions === "string"
            ? command.userRequiredPermissions
            : command.userRequiredPermissions.join(", ")
          : "None";
        const clientRequired = command.clientRequiredPermissions
          ? typeof command.clientRequiredPermissions === "string"
            ? command.clientRequiredPermissions
            : command.clientRequiredPermissions.join(", ")
          : "None";
        let isSlash = "Disabled";
        let isContext = "Disabled";
        if (command.slash || command.slash === "false") {
          if (command.slash === "slash") isSlash = "Slash Only";
          if (command.slash === "message") isSlash = "Message Only";
          if (command.slash === "both") isSlash = "Both Slash and Message";
          if (command.slash === "false") isSlash = "Disabled";
        } else if (client.slash) {
          if (client.slash === "slash") isSlash = "Slash Only";
          if (client.slash === "message") isSlash = "Message Only";
          if (client.slash === "both") isSlash = "Both Slash and Message";
          if (client.slash === "false") isSlash = "Disabled";
        }

        if (command.context || command.context === "false") {
          if (command.context === "user") isContext = "User Only";
          if (command.context === "message") isContext = "Message Only";
          if (command.context === "both")
            isContext = "Both Context and Message";
          if (command.context === "false") isContext = "Disabled";
        } else if (client.context) {
          if (client.context === "user") isContext = "User Only";
          if (client.context === "message") isContext = "Message Only";
          if (client.context === "both") isContext = "Both Context and Message";
          if (client.context === "false") isContext = "Disabled";
        }

        let SHembed = new Discord.EmbedBuilder()
          .setColor(global.embedcolor)
          .setTitle("Help")
          .setDescription(
            [
              `**Name:** ${command.name}`,
              `**Description:** ${command.description}`,
              `**Category:** ${command.category || "None"}`,
              `**User Required Permissions:** ${userRequired}`,
              `**Client Required Permissions:** ${clientRequired}`,
              `**Cooldown:** ${command.cooldown || "None"}`,
              `**NSFW:** ${command.nsfw ? "Yes" : "No"}`,
              `**Slash:** ${isSlash}`,
              `**Context Menu:** ${isContext}`,
              `**Usage:** ${PREFIX}${command.usage || command.name}`,
              `**Allowed on DMs:** ${command.allowDm ? "Yes" : "No"}`,
            ].join("\n")
          )
          .setTimestamp()
          .setFooter({
            text: client.user.username,
            iconURL: client.user.avatarURL({
              size: 512,
              format: "png",
              dynamic: true,
            }),
          });

        await reply({ embeds: [SHembed] });
      }
      // If query is a category
      else if (client.categories.includes(query.toLowerCase())) {
        const commands = client.commands
          .filter((m) => m.category == query)
          .map((m) => m.name);
        const category = query.slice(0, 1).toUpperCase() + query.slice(1);
        let em = new Discord.EmbedBuilder()
          .setColor(global.embedcolor)
          .setTitle("Help")
          .setDescription(
            `**Category:** ${category}\n\n\`${commands.join(",` `")}\``
          )
          .setTimestamp()
          .setFooter({
            text: client.user.username,
            iconURL: client.user.avatarURL({
              size: 512,
              format: "png",
              dynamic: true,
            }),
          });

        await reply({ embeds: [em] });
      }
      // If query doesn't exist at all
      else {
        let NoCommandEmbed = new Discord.EmbedBuilder()
          .setColor("Red")
          .setTitle("Not Found")
          .setDescription(
            `Sorry, command or category \"\`\`${query}\`\`\" was not found!`
          )
          .setTimestamp()
          .setFooter({
            text: "Great now im sad",
            iconURL: client.user.avatarURL({
              size: 512,
              format: "png",
              dynamic: true,
            }),
          });
        return reply({ embeds: [NoCommandEmbed] });
      }
    }
    // If the user runs the command with no arguments
    else {
      const categories = client.categories;

      // Embed base code
      const embed = new Discord.EmbedBuilder()
        .setColor(global.embedcolor)
        .setTitle(`Help`)
        .setDescription(`**Server prefix is:** \`${PREFIX}\`\n`)
        .setTimestamp()
        .setFooter({
          text: `For more info about commands do ${PREFIX}help [Command name]`,
        });

      // Loop through commands and format them for our embed's fields
      let embedFields = [];
      for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const dir = client.commands.filter((c) => c.category === category);
        if (
          (category === "admin" && !global.admins.includes(author.id)) ||
          (category === "hidden" &&
            author.id !== global.admins.includes(author.id))
        ) {
          continue;
        }
        const capitalise =
          category.slice(0, 1).toUpperCase() + category.slice(1);
        const embedValue = dir
          .map(
            (c) => `\`${c.name.slice(0, 1).toUpperCase() + c.name.slice(1)}\``
          )
          .join(", ");
        embedFields.push({
          name: `${capitalise} (${dir.size}):`,
          value: embedValue.toLowerCase(),
        });
      }
      embed.addFields(embedFields);

      // Generate a button containing an invite to our bot
      const botInvite = new Discord.ButtonBuilder()
        .setLabel("Add me!")
        .setURL(
          `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`
        )
        .setStyle("Link");

      // Generate a button containing a link to discord's status page
      const discordStatus = new Discord.ButtonBuilder()
        .setLabel("Discord's API Status")
        .setURL("https://status.discord.com/")
        .setStyle("Link");

      // Reply to the user's interaction
      await reply({
        embeds: [embed],
        components: [
          new Discord.ActionRowBuilder().addComponents([
            botInvite,
            discordStatus,
          ]),
        ],
      });
    }
  },
});

/* eslint-disable no-inline-comments */
// This is the entry point for the entire bot.
// Dependencies included: js, js voice, bufferutil, utf-8-decode, and zlib.
const Env = require("dotenv");
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const Handler = require("discord-handlers");
const { Collection } = require("mongoose");
const handler = new Handler();

const client = new Client({
  typescript: false,
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

// Process the .env file
Env.config({ path: "./.env" });

// Main Script Variables
const Token = process.env.TOKEN;
client.login(Token);

// Handler Events
handler.handleClientEvents("./events", client);
handler.handleGlobalCommands(
  "./commands",
  client,
  "1044374073624494161",
  Token
);

// Assign Global Variables
global.admins = ["959826700236099614"];
global.embedcolor = "BLUE";
global.client = client;
global.commands = new Collection();

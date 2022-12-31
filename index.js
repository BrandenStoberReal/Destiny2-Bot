// This is the entry point for the entire bot.
// Dependencies included: js, js voice, bufferutil, utf-8-decode, and zlib.
const Env = require("dotenv");
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const { DiscomClient } = require("discom");
const { Collection } = require("mongoose");
const socket = require("socket.io")();
global.root = __dirname; // Project root. Needed by some commands.
global.utilLib = __dirname + "/libraries/util.js";

// Discord Client Instantiation
const client = new DiscomClient({
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
  language: "en-US",
  cmdDir: __dirname + "/commands",
  eventDir: __dirname + "/events",
  commands: {
    loadFromCache: true,
    autoDefer: true,
    allowDm: true,
    deleteNonExistent: true,
  },
});

// Log events to console
client.on("log", console.log);

// Process the .env file
Env.config({ path: "./.env" });

// Main Script Variables
const Token = process.env.TOKEN;

// WebSocket Login
client.login(Token);

// Assign Pre-Load Global Variables
global.version = "1.0.1";
global.admins = ["959826700236099614", "520349721823281152"];
global.embedcolor = "Blue";
global.client = client;

// Sockets
socket.on("oauth-complete", (client) => {});
socket.listen(6500);

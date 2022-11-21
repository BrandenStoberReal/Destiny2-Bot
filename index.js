// This is the entry point for the entire bot.
// Dependencies included: discord.js, discord.js voice, bufferutil, utf-8-decode, and zlib.
const Env = require("dotenv"); // .env parser
const { REST, Routes, Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
Env.config({ path: './.env' }); // Load the .env file
const Token = process.env.TOKEN;

const commands = []; // TODO: Read files

const rest = new REST({ version: '10' }).setToken(Token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});

client.login(Token);
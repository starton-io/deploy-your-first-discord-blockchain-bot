const { Client, Events, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv')
dotenv.config()

const BOT_TOKEN = process.env.BOT_TOKEN
console.log(BOT_TOKEN)

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(BOT_TOKEN);
const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const dotenv = require('dotenv')
dotenv.config()

const BOT_TOKEN = process.env.BOT_TOKEN
if (!BOT_TOKEN) {
    console.error('BOT_TOKEN not set, please get it on the Discord Developer Portal')
    return
}
console.log('BOT_TOKEN: ', BOT_TOKEN)

const APPLICATION_ID = process.env.APPLICATION_ID
if (!APPLICATION_ID) {
    console.error('APPLICATION_ID not set, please get it on the Discord Developer Portal')
    return
}
console.log('APPLICATION_ID: ', APPLICATION_ID)

const GUILD_ID = process.env.GUILD_ID
if (!GUILD_ID) {
    console.error('GUILD_ID not set, get it by right-clicking on your Discord server name')
    return
}
console.log('GUILD_ID: ', GUILD_ID)

const commands = [];
// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    // Grab all the command files from the commands directory you created earlier
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        commands.push(command.data.toJSON());
    }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(BOT_TOKEN);

// and deploy your commands!
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(APPLICATION_ID, GUILD_ID),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();


const { REST, Routes } = require('discord.js');
const path = require('path');
const fs = require('fs');

const commandsPath = path.join(__dirname, 'commands');

const commands = [];
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require('./commands/${file}');
    commands.push(command.data.toJSON());

}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

rest.put(
    Routes.applicationCommands(process.env.TOKEN), 
    { body: commands },
);
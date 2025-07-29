// index.js
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const TOKEN = ''; 

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (message) => {
  if (message.content === '!cropcheck') {
    let cropRoll = Math.floor(Math.random() * 1225) + 1;;
    if (cropRoll == 69) {
        message.reply('Today, the crops are: **Go fuck yourself.**');
    } else if (cropRoll == 1000) {
        message.reply('Today, the crops are: **Whirring and humming, whirring and humming, whirring and humming, whirring and humming. Will this noise never end? Nothing but noise, noise, enternal noise! Dancing and prancing and shouting and laughing and crying and snorting and snivelling. Animals! All of them! Animals!**');
    } else if (cropRoll % 4 == 1) {
        message.reply('Today, the crops are: **Thriving**');
    } else if (cropRoll % 4 == 2) {
        message.reply('Today, the crops are: **Withering**');
    } else if (cropRoll % 4 == 3) {
        message.reply('Today, the crops are: **Average**');
    } else {
        message.reply('Today, the crops are: **BAD. You will starve.**');
    }
  }
});

client.login(TOKEN);


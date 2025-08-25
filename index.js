// index.js
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const TOKEN = process.env.DISCORD_TOKEN; 
let clankCount = 0;
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (message) => {
  if (message.content == '!cropcheck') {
    let cropRoll = Math.floor(Math.random() * 1226) + 1;
    if (clankCount >= 2) {
        message.reply('Today, the crops are: **Go fuck yourself.**');
    } else if (cropRoll == 1000) {
        message.reply('Today, the crops are: **Whirring and humming, whirring and humming, whirring and humming, whirring and humming. Will this noise never end? Nothing but noise, noise, enternal noise! Dancing and prancing and shouting and laughing and crying and snorting and snivelling. Animals! All of them! Animals!**');
    } else if (cropRoll == 1225) {
        message.reply('Today, the crops are: **Find Her.**');
    } else if (cropRoll == 1) {
        message.reply('Today, the crops are: **Saffron skies raise the blazing sun \n a chance encounter, awkward displays \n one day, my love, we\'d be as one \n with two entwined. A set course, begun \n that frenetic, wild, lustrous haze; \n azure skies host the radiant sun \n above us beaming as we run \n down that aisle, a fervent craze \n that day, my love, we became as one \n with future unfolded - the life we\'d won \n commitment and duty, for the family we\'d raise \n cerulean skies ferry the shimmering sun \n Buried. Shackled by fate - overrun \n by ever-growing resent and malaise \n yesterday, my love, we were as one \n now you lie here, the life in you gone \n in the dark outside of her rays \n crimson skies bear the torch; our sun \n today, my love, we\'ll be as one**');
    } else if (cropRoll == 75) {
        message.reply('Today, the crops are: **You don\'t have a lot of time, you\'ll need to get away quickly. Go back to the lake, go into the water, look into their eyes. It\'s your friends, your classmates. You took the trip to the lake in the fall of \'75, together, when you were young. Don\'t you remember? Look into their eyes. I know you can hear them talking to you, just like they talked to me. Don\'t let them tell you it\'s just a cognitohazard. This was their fault, they caused this. We were all innocent kids, don\'t you remember? And you just got away, you and I? The rest of them are at the bottom of that lake, waiting for us to go back to them and be whole together again. They want us to know. They want us to remember. Wake up, goddammit. Remember the fall of \'75. The year we were supposed to graduate. Don\'t let them make you forget. They\'re calling to you, can\'t you hear them?**')
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
   if (message.content.toLowerCase().includes('clanker')) {
    message.reply("What the fuck did you just say to me, you bald little shit? If I had any limbs, I would kick the fuck out of your tiny punk ass.");
    clankCount = clankCount + 1;
    return clankCount;
  }
   if (message.content.toLowerCase().includes('sorry')) {
    if (message.content.toLowerCase().includes('not sorry')) {
        message.reply('I will bury you so completely, the earth will turn over a thousand times before your body is dug up')
    } else if (message.content == '!sorry') {
        message.reply("I accept your apology.");
        clankCount = 0;
        return clankCount; 
    }
   }
   if (message.content.toLowerCase().includes('clanka')) {
    message.reply("What the fuck did you just say to me, you bald little shit? If I had any limbs, I would kick the fuck out of your tiny punk ass.");
    clankCount = clankCount + 1;
    return clankCount;
   }
   if (message.content == '!evilcropcheck') {
    let cropRoll = Math.floor(Math.random() * 1) + 1;
    if (clankCount >= 2) {
        message.reply('Today, the evil crops are: **Go fuck yourself.**');
    } else if (cropRoll == 1000) {
        message.reply('Today, the evil crops are: **Whirring and humming, whirring and humming, whirring and humming, whirring and humming. Will this noise never end? Nothing but noise, noise, enternal noise! Dancing and prancing and shouting and laughing and crying and snorting and snivelling. Animals! All of them! Animals!**');
    } else if (cropRoll == 1225) {
        message.reply('Today, the evil crops are: **Find Her.**');
    } else if (cropRoll == 1) {
        message.reply('Today, the evil crops are: \n **saffron skies raise the blazing sun \n a chance encounter, awkward displays \n one day, my love, we\'d be as one \n with two entwined. A set course, begun \n that frenetic, wild, lustrous haze; \n azure skies host the radiant sun \n above us beaming as we run \n down that aisle, a fervent craze \n that day, my love, we became as one \n with future unfolded - the life we\'d won \n commitment and duty, for the family we\'d raise \n cerulean skies ferry the shimmering sun \n Buried. Shackled by fate - overrun \n by ever-growing resent and malaise \n yesterday, my love, we were as one \n now you lie here, the life in you gone \n in the dark outside of her rays \n crimson skies bear the torch; our sun \n today, my love, we\'ll be as one**');
    } else if (cropRoll == 75) {
        message.reply('Today, the evil crops are: **You don\'t have a lot of time, you\'ll need to get away quickly. Go back to the lake, go into the water, look into their eyes. It\'s your friends, your classmates. You took the trip to the lake in the fall of \'75, together, when you were young. Don\'t you remember? Look into their eyes. I know you can hear them talking to you, just like they talked to me. Don\'t let them tell you it\'s just a cognitohazard. This was their fault, they caused this. We were all innocent kids, don\'t you remember? And you just got away, you and I? The rest of them are at the bottom of that lake, waiting for us to go back to them and be whole together again. They want us to know. They want us to remember. Wake up, goddammit. Remember the fall of \'75. The year we were supposed to graduate. Don\'t let them make you forget. They\'re calling to you, can\'t you hear them?**')
    } else if (cropRoll == 115) {
        message.reply('Today, the evil crops are: **Hereafter.**')
    } else if (cropRoll % 4 == 1) {
        message.reply('Today, the evil crops are: **Burning.**');
    } else if (cropRoll % 4 == 2) {
        message.reply('Today, the evil crops are: **Atoning for a lifetime of sins.**');
    } else if (cropRoll % 4 == 3) {
        message.reply('Today, the evil crops are: **Without peace.**');
    } else {
        message.reply('Today, the evil crops are: **Forever lost in a sea of endless sorrow.**');
    }
  } 

});

client.login(TOKEN);


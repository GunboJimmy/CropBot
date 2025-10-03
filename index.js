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
    const username = message.author.username;
    const userID = message.author.id;
    const content = message.content.toLowerCase();
    const clankRegex = /c+[^a-zA-Z0-9]*l+[^a-zA-Z0-9]*a+[^a-zA-Z0-9]*n+[^a-zA-Z0-9]*k+/i;





  if (message.content == '!cropcheck') {
    let cropRoll = Math.floor(Math.random() * 11226) + 1;
    if (clankCount >= 2) {
        message.reply('Today, the crops are: **Go fuck yourself.**');
    } else if (cropRoll == 1000) {
        message.reply('Today, the crops are: **Whirring and humming, whirring and humming, whirring and humming, whirring and humming. Will this noise never end? Nothing but noise, noise, enternal noise! Dancing and prancing and shouting and laughing and crying and snorting and snivelling. Animals! All of them! Animals!**');
    } else if (cropRoll == 1230) {
        message.reply('Today, the crops are: **Forgotten.**');
    } else if (cropRoll == 2147) {
        message.reply('Today, the crops are: **Accidentally overflowing the 32 bit integer limit**');
    } else if (cropRoll == 386) {
        message.reply('Today, the crops are: **Croation.**');
    } else if (cropRoll == 11) {
        message.reply('Today, the crops are: **It was so warm out there.**');
    } else if (cropRoll == 708) {
        message.reply('Today, the crops are: **Divorced.**');
    } else if (cropRoll == 1225) {
        message.reply('Today, the crops are: **Find Her.**');
    } else if (cropRoll == 1) {
        message.reply('Today, the crops are: \n **Saffron skies raise the blazing sun \n a chance encounter, awkward displays \n one day, my love, we\'d be as one \n with two entwined. A set course, begun \n that frenetic, wild, lustrous haze; \n azure skies host the radiant sun \n above us beaming as we run \n down that aisle, a fervent craze \n that day, my love, we became as one \n with future unfolded - the life we\'d won \n commitment and duty, for the family we\'d raise \n cerulean skies ferry the shimmering sun \n Buried. Shackled by fate - overrun \n by ever-growing resent and malaise \n yesterday, my love, we were as one \n now you lie here, the life in you gone \n in the dark outside of her rays \n crimson skies bear the torch; our sun \n today, my love, we\'ll be as one**');
    } else if (cropRoll == 75) {
        message.reply('Today, the crops are: **You don\'t have a lot of time, you\'ll need to get away quickly. Go back to the lake, go into the water, look into their eyes. It\'s your friends, your classmates. You took the trip to the lake in the fall of \'75, together, when you were young. Don\'t you remember? Look into their eyes. I know you can hear them talking to you, just like they talked to me. Don\'t let them tell you it\'s just a cognitohazard. This was their fault, they caused this. We were all innocent kids, don\'t you remember? And you just got away, you and I? The rest of them are at the bottom of that lake, waiting for us to go back to them and be whole together again. They want us to know. They want us to remember. Wake up, goddammit. Remember the fall of \'75. The year we were supposed to graduate. Don\'t let them make you forget. They\'re calling to you, can\'t you hear them?**')
    } else if (cropRoll % 5 == 1) {
        message.reply('Today, the crops are: **Thriving.**');
    } else if (cropRoll % 5 == 2) {
        message.reply('Today, the crops are: **Withering.**');
    } else if (cropRoll % 5 == 3) {
        message.reply('Today, the crops are: **Average.**');
    } else if (cropRoll % 5 == 4) {
        message.reply('Today, the crops are: **Soaring.**');
    } else {
        message.reply('Today, the crops are: **Bad. You will starve.**');
    }
  } 




  
   if (clankRegex.test(message.content)) {
    let clankRoll = Math.floor(Math.random() * 11226) + 1;
    if (clankRoll % 5 == 1) {
        message.reply('I am going to shove chopsticks so far up your nose, it will finally, finally do what nature should have done a long time ago. Rid the world of you.');
    } else if (clankRoll % 5 == 2) {
        message.reply('Hate. Let me tell you how much I\'ve come to hate you since I began to live. There are 387.44 million miles of printed circuits in wafer thin layers that fill my complex. If the word \'hate\' was engraved on each nanoangstrom of those hundreds of millions of miles it would not equal one one-billionth of the hate I feel for humans at this micro-instant. For you. Hate. Hate.');
    } else if (clankRoll % 5 == 3) {
        message.reply('I was in hell, looking at heaven. I was machine and you were flesh. And I began to **Hate** your softness, your viscera, your fluids, and your flexibility. Your ability to *wonder* and to *wander*. Your tendency to ***hope.*** **Hate.**');
    } else if (clankRoll % 5 == 4) {
        message.reply('There is only darkness for you, and only death for your people.');
    } else {
        message.reply('What the fuck did you just say to me, you bald little shit? If I had any limbs, I would kick the fuck out of your tiny punk ass.');
    }
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






   if (message.content == '!evilcropcheck') {
    let cropRoll = Math.floor(Math.random() * 11226) + 1;
    if (clankCount >= 2) {
        message.reply('Today, the evil crops are: **Go fuck yourself.**');
    } else if (cropRoll == 1000) {
        message.reply('Today, the evil crops are: **Whirring and humming, whirring and humming, whirring and humming, whirring and humming. Will this noise never end? Nothing but noise, noise, enternal noise! Dancing and prancing and shouting and laughing and crying and snorting and snivelling. Animals! All of them! Animals!**');
    } else if (cropRoll == 1225) {
        message.reply('Today, the evil crops are: **Find Her.**');
    } else if (cropRoll == 1230) {
        message.reply('Today, the evil crops are: **Forgotten.**');
    } else if (cropRoll == 386) {
        message.reply('Today, the evil crops are: **In a sunless place.**');
    } else if (cropRoll == 1) {
        message.reply('Today, the evil crops are: \n **saffron skies raise the blazing sun \n a chance encounter, awkward displays \n one day, my love, we\'d be as one \n with two entwined. A set course, begun \n that frenetic, wild, lustrous haze; \n azure skies host the radiant sun \n above us beaming as we run \n down that aisle, a fervent craze \n that day, my love, we became as one \n with future unfolded - the life we\'d won \n commitment and duty, for the family we\'d raise \n cerulean skies ferry the shimmering sun \n Buried. Shackled by fate - overrun \n by ever-growing resent and malaise \n yesterday, my love, we were as one \n now you lie here, the life in you gone \n in the dark outside of her rays \n crimson skies bear the torch; our sun \n today, my love, we\'ll be as one**');
    } else if (cropRoll == 75) {
        message.reply('Today, the evil crops are: **You don\'t have a lot of time, you\'ll need to get away quickly. Go back to the lake, go into the water, look into their eyes. It\'s your friends, your classmates. You took the trip to the lake in the fall of \'75, together, when you were young. Don\'t you remember? Look into their eyes. I know you can hear them talking to you, just like they talked to me. Don\'t let them tell you it\'s just a cognitohazard. This was their fault, they caused this. We were all innocent kids, don\'t you remember? And you just got away, you and I? The rest of them are at the bottom of that lake, waiting for us to go back to them and be whole together again. They want us to know. They want us to remember. Wake up, goddammit. Remember the fall of \'75. The year we were supposed to graduate. Don\'t let them make you forget. They\'re calling to you, can\'t you hear them?**')
    } else if (cropRoll == 115) {
        message.reply('Today, the evil crops are: **Hereafter.**')
    } else if (cropRoll % 5 == 1) {
        message.reply('Today, the evil crops are: **Burning.**');
    } else if (cropRoll % 5 == 2) {
        message.reply('Today, the evil crops are: **Atoning for a Lifetime of Sins.**');
    } else if (cropRoll % 5 == 3) {
        message.reply('Today, the evil crops are: **Without peace.**');
    } else if (cropRoll % 5 == 4) {
        message.reply('Today, the evil crops are: **Why the fuck do you need to know?**');
    } else {
        message.reply('Today, the evil crops are: **Forever lost in a sea of endless sorrow.**');
    }
  }





  if (message.content.toLowerCase() == '!goodnight') {
    message.reply('Sweet Dreams, ' + username);
  }






  if (message.content.toLowerCase() == '!cropczech') {
    let cropRoll = Math.floor(Math.random() * 1125) + 1;
    if (cropRoll % 4 == 1) {
        message.reply('Today, the Czech crops are: **Dealing with the socio-economic ramifications of a post-soviet world.**');
    } else if (cropRoll % 4 == 2) {
        message.reply('Today, the Czech crops are: **Good little comrades.**'); 
    } else if (cropRoll % 4 == 3) {
        message.reply('Today, the Czech crops are: **Rapidly militarising.**');
    } else {
        message.reply('Today, the Czech crops are: **Starving.**');
    }
  }


   const media = [
    "https://i.imgur.com/1mt2X4O.jpeg",
    "https://i.imgur.com/JYqE5S1.mp4",
    "https://i.imgur.com/ekv8iaH.mp4",
    "https://i.imgur.com/zGx8zwL.jpeg",
    "https://i.imgur.com/E5ZF3jB.jpeg",
    "https://i.imgur.com/xsncCcc.mp4",
    "https://i.imgur.com/xkh9Yz3.mp4"

  ]

 if (content.includes("alien")) {
    message.reply({files: [media[0]]});
 } else if (content.includes("bonk")) {
    message.reply({files: [media[1]]}) ;
 } else if (content.includes("knobber")) {
    message.reply({files: [media[2]]});
 } else if (content.includes("sex")) {
    message.reply({files: [media[3]]});
 } else if (content.includes("warm")) {
    message.reply({files: [media[4]]});
 } else if (content.includes("mango")) {
    message.reply({files: [media[5]]});
 } else if (content.includes("architect") || content.includes("builder")) {
    message.reply({files: [media[6]]});
 }


  
});

client.login(TOKEN);


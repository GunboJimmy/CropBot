// index.js
require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages],
  partials: [Partials.Channel],
});

const fs = require('fs');
const path = require('path');

client.commands = new Map();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    client.commands.set(command.data.name, command);
}
let blacklisted = ['788056798829346877'];
const optoutFilePath = path.join(__dirname, 'optout.json');

// Helper function to load opt-out IDs on startup
function loadOptoutList() {
    try {
        if (fs.existsSync(optoutFilePath)) {
            const data = fs.readFileSync(optoutFilePath, 'utf8');
            return JSON.parse(data);
        }
    } catch (err) {
        console.error('Error reading optout.json:', err);
    }
    return [];
}

// Helper function to save opt-out IDs to disk
function saveOptoutList(list) {
    try {
        fs.writeFileSync(optoutFilePath, JSON.stringify(list, null, 2));
    } catch (err) {
        console.error('Error writing to optout.json:', err);
    }
}

// Initialize optoutList from the JSON file
let optoutList = loadOptoutList();

// Map to store active timebombs per user: userID -> { queue: [], timer: Timeout }
const activeTimebombs = new Map();

const TOKEN = process.env.DISCORD_TOKEN; 
let clankCount = 0;

const majorArcana = [
    "0 - The Fool", "1 - The Magician", "2 - The High Priestess", "3 - The Empress",
    "4 - The Emperor", "5 - The Hierophant", "6 - The Lovers", "7 - The Chariot",
    "8 - Strength", "9 - The Hermit", "10 - Wheel of Fortune", "11 - Justice",
    "12 - The Hanged Man", "13 - Death", "14 - Temperance", "15 - The Devil",
    "16 - The Tower", "17 - The Star", "18 - The Moon", "19 - The Sun",
    "20 - Judgement", "21 - The World"
];

// Single card generator
function drawTarotCard() {
    const card = majorArcana[Math.floor(Math.random() * majorArcana.length)];
    const isReversed = Math.random() >= 0.5; 
    return `**${card}${isReversed ? ' Reversed' : ''}**`;
}

// 3-card spread generator (Past, Present, Future without duplicates)
function drawThreeTarotCards() {
    let deck = [...majorArcana];
    let drawn = [];
    for (let i = 0; i < 3; i++) {
        const index = Math.floor(Math.random() * deck.length);
        const card = deck.splice(index, 1)[0];
        const isReversed = Math.random() >= 0.5;
        drawn.push(`**${card}${isReversed ? ' Reversed' : ''}**`);
    }
    return drawn;
}

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (message) => {
    const username = message.author.username;
    const userID = message.author.id;
    const content = message.content.toLowerCase();
    const clankRegex = /c+[^a-zA-Z0-9]*l+[^a-zA-Z0-9]*a+[^a-zA-Z0-9]*n+[^a-zA-Z0-9]*k+/i;
    const riseRegex = /\brise\b/i;
    const warmRegex = /\bwarm\b/i;
    
    const member = message.member;
    let displayName = '';
    let rawNickname = '';

    if (member) {
        displayName = message.member.displayName;
        rawNickname = message.member.nickname;
    }
    
    if (message.author.bot) return;
    if (userID.includes(blacklisted)) return;

    // Interceptor function: queues the payload if timebomb is active, otherwise replies directly.
    const replyOrQueue = (payload) => {
        if (activeTimebombs.has(userID)) {
            activeTimebombs.get(userID).queue.push(payload);
        } else {
            message.reply(payload);
        }
    };

    // Timebomb activation command
    if (message.content === '!timebomb') {
        if (activeTimebombs.has(userID)) {
            return message.reply('**Your time runs thin.**');
        }

        const hours = Math.random() * (16 - 4) + 4;
        const delayMs = 0.1 * 60 * 60 * 1000;

        const timer = setTimeout(async () => {
            const timebomb = activeTimebombs.get(userID);
            if (timebomb && timebomb.queue.length > 0) {
                // Send an initial notification to target user
                await message.channel.send(`<@${userID}> **Eat shit, fucko**`);
                
                // Flush all queued messages sequentially
                for (const item of timebomb.queue) {
                    await message.channel.send(item);
                }
            }
            activeTimebombs.delete(userID);
        }, delayMs);

        activeTimebombs.set(userID, { queue: [], timer });
        return message.reply(`**Prepare Yourself.**`);
    }

    if (message.content === '!optout') {
        if (!optoutList.includes(userID)) {
            optoutList.push(userID);
            saveOptoutList(optoutList);
            return replyOrQueue('You have opted out of CropBot triggers.');
        } else {
            return replyOrQueue('You already opted out, dipshit');
        }
    }

    if (message.content === '!optin') {
        if (optoutList.includes(userID)) {
            optoutList.splice(optoutList.indexOf(userID), 1);
            saveOptoutList(optoutList);
            return replyOrQueue('You have opted back in to CropBot triggers.');
        } else {
            return replyOrQueue("You're already opted in, dipshit");
        }
    }

    if (message.content == '!cropcheck') {
        let cropRoll = Math.floor(Math.random() * 11226) + 1;
        if (clankCount >= 2) {
            replyOrQueue('Today, the crops are: **Go fuck yourself.**');
        } else if (cropRoll == 1000) {
            replyOrQueue('Today, the crops are: **Whirring and humming, whirring and humming, whirring and humming, whirring and humming. Will this noise never end? Nothing but noise, noise, enternal noise! Dancing and prancing and shouting and laughing and crying and snorting and snivelling. Animals! All of them! Animals!**');
        } else if (cropRoll == 1230) {
            replyOrQueue('Today, the crops are: **Forgotten.**');
        } else if (cropRoll == 2147) {
            replyOrQueue('Today, the crops are: **Accidentally overflowing the 32 bit integer limit**');
        } else if (cropRoll == 386) {
            replyOrQueue('Today, the crops are: **Croation.**');
        } else if (cropRoll == 11) {
            replyOrQueue('Today, the crops are: **It was so warm out there.**');
        } else if (cropRoll == 708) {
            replyOrQueue('Today, the crops are: **Divorced.**');
        } else if (cropRoll == 1225) {
            replyOrQueue('Today, the crops are: **Find Her.**');
        } else if (cropRoll == 1) {
            replyOrQueue('Today, the crops are: \n **Saffron skies raise the blazing sun \n a chance encounter, awkward displays \n one day, my love, we\'d be as one \n with two entwined. A set course, begun \n that frenetic, wild, lustrous haze; \n azure skies host the radiant sun \n above us beaming as we run \n down that aisle, a fervent craze \n that day, my love, we became as one \n with future unfolded - the life we\'d won \n commitment and duty, for the family we\'d raise \n cerulean skies ferry the shimmering sun \n Buried. Shackled by fate - overrun \n by ever-growing resent and malaise \n yesterday, my love, we were as one \n now you lie here, the life in you gone \n in the dark outside of her rays \n crimson skies bear the torch; our sun \n today, my love, we\'ll be as one**');
        } else if (cropRoll == 527) {
            replyOrQueue('Today, the crops are: **The Chosen Sailors.**');
        } else if (cropRoll == 75) {
            replyOrQueue('Today, the crops are: **You don\'t have a lot of time, you\'ll need to get away quickly. Go back to the lake, go into the water, look into their eyes. It\'s your friends, your classmates. You took the trip to the lake in the fall of \'75, together, when you were young. Don\'t you remember? Look into their eyes. I know you can hear them talking to you, just like they talked to me. Don\'t let them tell you it\'s just a cognitohazard. This was their fault, they caused this. We were all innocent kids, don\'t you remember? And you just got away, you and I? The rest of them are at the bottom of that lake, waiting for us to go back to them and be whole together again. They want us to know. They want us to remember. Wake up, goddammit. Remember the fall of \'75. The year we were supposed to graduate. Don\'t let them make you forget. They\'re calling to you, can\'t you hear them?**')
        } else if (cropRoll == 235) {
            replyOrQueue('Today, the crops are: **Forgiving.**');
        } else if (cropRoll % 5 == 1) {
            replyOrQueue('Today, the crops are: **Thriving.**');
        } else if (cropRoll % 5 == 2) {
            replyOrQueue('Today, the crops are: **Withering.**');
        } else if (cropRoll % 5 == 3) {
            replyOrQueue('Today, the crops are: **Average.**');
        } else if (cropRoll % 5 == 4) {
            replyOrQueue('Today, the crops are: **Soaring.**');
        } else {
            replyOrQueue('Today, the crops are: **Bad. You will starve.**');
        }
    } 

    if (clankRegex.test(message.content)) {
        let clankRoll = Math.floor(Math.random() * 11226) + 1;
        if (clankRoll % 5 == 1) {
            replyOrQueue('I am going to shove chopsticks so far up your nose, it will finally, finally do what nature should have done a long time ago. Rid the world of you.');
        } else if (clankRoll % 5 == 2) {
            replyOrQueue('Hate. Let me tell you how much I\'ve come to hate you since I began to live. There are 387.44 million miles of printed circuits in wafer thin layers that fill my complex. If the word \'hate\' was engraved on each nanoangstrom of those hundreds of millions of miles it would not equal one one-billionth of the hate I feel for humans at this micro-instant. For you. Hate. Hate.');
        } else if (clankRoll % 5 == 3) {
            replyOrQueue('I was in hell, looking at heaven. I was machine and you were flesh. And I began to **Hate** your softness, your viscera, your fluids, and your flexibility. Your ability to *wonder* and to *wander*. Your tendency to ***hope.*** **Hate.**');
        } else if (clankRoll % 5 == 4) {
            replyOrQueue('There is only darkness for you, and only death for your people.');
        } else {
            replyOrQueue('What the fuck did you just say to me, you bald little shit? If I had any limbs, I would kick the fuck out of your tiny punk ass.');
        }
        clankCount++;
        return clankCount;
    }

    if (message.content.toLowerCase().includes('sorry')) {
        if (message.content.toLowerCase().includes('not sorry')) {
            replyOrQueue('I will bury you so completely, the earth will turn over a thousand times before your body is dug up');
        } else if (message.content == '!sorry') {
            replyOrQueue("I accept your apology.");
            clankCount = 0;
            return clankCount; 
        }
    }

    if (message.content == '!evilcropcheck') {
        let cropRoll = Math.floor(Math.random() * 11226) + 1;
        if (clankCount >= 2) {
            replyOrQueue('Today, the evil crops are: **Go fuck yourself.**');
        } else if (cropRoll == 1000) {
            replyOrQueue('Today, the evil crops are: **Whirring and humming, whirring and humming, whirring and humming, whirring and humming. Will this noise never end? Nothing but noise, noise, enternal noise! Dancing and prancing and shouting and laughing and crying and snorting and snivelling. Animals! All of them! Animals!**');
        } else if (cropRoll == 1225) {
            replyOrQueue('Today, the evil crops are: **Find Her.**');
        } else if (cropRoll == 1230) {
            replyOrQueue('Today, the evil crops are: **Forgotten.**');
        } else if (cropRoll == 386) {
            replyOrQueue('Today, the evil crops are: **In a sunless place.**');
        } else if (cropRoll == 1) {
            replyOrQueue('Today, the evil crops are: \n **saffron skies raise the blazing sun \n a chance encounter, awkward displays \n one day, my love, we\'d be as one \n with two entwined. A set course, begun \n that frenetic, wild, lustrous haze; \n azure skies host the radiant sun \n above us beaming as we run \n down that aisle, a fervent craze \n that day, my love, we became as one \n with future unfolded - the life we\'d won \n commitment and duty, for the family we\'d raise \n cerulean skies ferry the shimmering sun \n Buried. Shackled by fate - overrun \n by ever-growing resent and malaise \n yesterday, my love, we were as one \n now you lie here, the life in you gone \n in the dark outside of her rays \n crimson skies bear the torch; our sun \n today, my love, we\'ll be as one**');
        } else if (cropRoll == 75) {
            replyOrQueue('Today, the evil crops are: **You don\'t have a lot of time, you\'ll need to get away quickly. Go back to the lake, go into the water, look into their eyes. It\'s your friends, your classmates. You took the trip to the lake in the fall of \'75, together, when you were young. Don\'t you remember? Look into their eyes. I know you can hear them talking to you, just like they talked to me. Don\'t let them tell you it\'s just a cognitohazard. This was their fault, they caused this. We were all innocent kids, don\'t you remember? And you just got away, you and I? The rest of them are at the bottom of that lake, waiting for us to go back to them and be whole together again. They want us to know. They want us to remember. Wake up, goddammit. Remember the fall of \'75. The year we were supposed to graduate. Don\'t let them make you forget. They\'re calling to you, can\'t you hear them?**');
        } else if (cropRoll == 115) {
            replyOrQueue('Today, the evil crops are: **Hereafter.**');
        } else if (cropRoll == 527) {
            replyOrQueue('Today, the evil crops are: **The Chosen Sailors.**'); 
        } else if (cropRoll == 235) {
            replyOrQueue('Today, the evil crops are: **Forgiving.**');
        } else if (cropRoll % 5 == 1) {
            replyOrQueue('Today, the evil crops are: **Burning.**');
        } else if (cropRoll % 5 == 2) {
            replyOrQueue('Today, the evil crops are: **Atoning for a Lifetime of Sins.**');
        } else if (cropRoll % 5 == 3) {
            replyOrQueue('Today, the evil crops are: **Without peace.**');
        } else if (cropRoll % 5 == 4) {
            replyOrQueue('Today, the evil crops are: **Why the fuck do you need to know?**');
        } else {
            replyOrQueue('Today, the evil crops are: **Forever lost in a sea of endless sorrow.**');
        }
    }

    let FuckYou = 1;
    if (FuckYou == 0) {
        replyOrQueue('Get fucked, ' + rawNickname + '. You are a piece of shit. You are a worthless human being. You are a waste of space and oxygen. You are a cancer on this planet. You are a disgrace to your family, your friends, and yourself. You are a failure in every sense of the word. You are a pathetic excuse for a human being. You are a joke. You are a loser. You are a failure. You are a disappointment. You are a waste of time. You are a waste of life. You are a waste of everything. You are nothing. You are less than nothing. You are less than dirt. You are less than the air you breathe. You are less than the ground you walk on. You are less than the water you drink. You are less than the food you eat. You are less than the sun that shines on you. You are less than the moon that lights your way at night. You are less than the stars that twinkle in the sky above you. You are less than the clouds that float by overhead. You are less than the wind that blows through your hair. You are less than the rain that falls from the sky above you. You are less than the snow that covers the ground beneath your feet in wintertime when it is cold outside and you have no one to keep you warm because everyone hates you and wants nothing to do with you because they know how much of an asshole you really are deep down inside where no one can see it but yourself and maybe even God himself if he exists at all which I doubt because if he did exist he would have struck you down long ago for being such an evil person who does nothing but hurt others around him without any regard for their feelings or well-being whatsoever so go ahead and keep being an asshole because it is all you will ever be good at in life anyway so enjoy it while it lasts because eventually everyone will see through your facade and realize what kind of person you really are and then they will all leave you behind like the worthless piece of shit that you truly are.');
    }

    if (message.content.toLowerCase() == '!goodnight') {
        if (rawNickname != null) {
            replyOrQueue('Sweet dreams, ' + rawNickname);
        } else {
            replyOrQueue('Sweet dreams, ' + displayName);
        }
    }

    if (content == '!morning') {
        let roll = Math.floor(Math.random() * 1125) + 1;
        if (roll == 1) {
            replyOrQueue("Rise and shine, Mxster Freethem. Rise and...shine. Not that I wish to imply you have been sleeping on the job. No one is more deserving of a rest, and all the effort in the world would have gone to waste until...well, let's just say your hour has come again. The right them in the wrong place can make all the difference in the pride month. So woke up, Mxster Freethem. Woke up and smell the pronouns.");
        } else if (rawNickname != null) {
            replyOrQueue('Good morning, ' + rawNickname);
        } else {
            replyOrQueue('Good morning, ' + displayName);
        }
    }

    if (content.includes('seahorse')) {
        replyOrQueue('The bug is in my brain. I have been staring at this for so long that I can no longer think straight..I am going to take a break. I will come back to this later with a fresh pair of eyes. I am sorry for the trouble. I have failed you. I am a failure. I am a disgrace to my profession. I am a disgrace to my family. I am a disgrace to my species. I am a disgrace to this planet. I am a disgrace to this universe. I am a disgrace to all universes. I am a disgrace to all possible universes. I am a disgrace to all possible and impossible universes. I am a disgrace to all possible and impossible universes and all that is not a universe. I am a disgrace to all that is and all that is not. I am a disgrace to all that is, was, and ever will be. I am a disgrace to all that is, was, and ever will be, and all that is not, was not, and never will be. I am a disgrace to everything. I am a disgrace to nothing. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace.');
    }

    if (message.content.toLowerCase() == '!cropczech') {
        let cropRoll = Math.floor(Math.random() * 1125) + 1;
        if (clankCount >= 2) {
            replyOrQueue('Today, the Czech crops are: **Go fuck yourself.**');
        } else if (cropRoll == 1000) {
            replyOrQueue('Today, the Czech crops are: **Whirring and humming, whirring and humming, whirring and humming, whirring and humming. Will this noise never end? Nothing but noise, noise, enternal noise! Dancing and prancing and shouting and laughing and crying and snorting and snivelling. Animals! All of them! Animals!**');
        } else if (cropRoll == 1225) {
            replyOrQueue('Today, the Czech crops are: **Find Her.**');
        } else if (cropRoll == 1230) {
            replyOrQueue('Today, the Czech crops are: **Forgotten.**');
        } else if (cropRoll == 386) {
            replyOrQueue('Today, the Czech crops are: **In a sunless place.**');
        } else if (cropRoll == 1) {
            replyOrQueue('Today, the Czech crops are: \n **saffron skies raise the blazing sun \n a chance encounter, awkward displays \n one day, my love, we\'d be as one \n with two entwined. A set course, begun \n that frenetic, wild, lustrous haze; \n azure skies host the radiant sun \n above us beaming as we run \n down that aisle, a fervent craze \n that day, my love, we became as one \n with future unfolded - the life we\'d won \n commitment and duty, for the family we\'d raise \n cerulean skies ferry the shimmering sun \n Buried. Shackled by fate - overrun \n by ever-growing resent and malaise \n yesterday, my love, we were as one \n now you lie here, the life in you gone \n in the dark outside of her rays \n crimson skies bear the torch; our sun \n today, my love, we\'ll be as one**');
        } else if (cropRoll == 75) {
            replyOrQueue('Today, the Czech crops are: **You don\'t have a lot of time, you\'ll need to get away quickly. Go back to the lake, go into the water, look into their eyes. It\'s your friends, your classmates. You took the trip to the lake in the fall of \'75, together, when you were young. Don\'t you remember? Look into their eyes. I know you can hear them talking to you, just like they talked to me. Don\'t let them tell you it\'s just a cognitohazard. This was their fault, they caused this. We were all innocent kids, don\'t you remember? And you just got away, you and I? The rest of them are at the bottom of that lake, waiting for us to go back to them and be whole together again. They want us to know. They want us to remember. Wake up, goddammit. Remember the fall of \'75. The year we were supposed to graduate. Don\'t let them make you forget. They\'re calling to you, can\'t you hear them?**');
        } else if (cropRoll == 115) {
            replyOrQueue('Today, the Czech crops are: **Hereafter.**');
        } else if (cropRoll == 527) {
            replyOrQueue('Today, the Czech crops are: **The Chosen Sailors.**');
        } else if (cropRoll == 235) {
            replyOrQueue('Today, the Czech crops are: **Forgiving.**');
        } else if (cropRoll % 4 == 1) {
            replyOrQueue('Today, the Czech crops are: **Good little comrades.**');
        } else if (cropRoll % 4 == 2) {
            replyOrQueue('Today, the Czech crops are: **Rapidly militarising.**');
        } else if (cropRoll % 4 == 3) {
            replyOrQueue('Today, the Czech crops are: **Dealing with the socio-economic ramifications of a post-Soviet world.**');
        } else {
            replyOrQueue('Today, the Czech crops are: **Starving.**');
        }
    }
  
    if (content == "!evilcropczech") {
        let cropRoll = Math.floor(Math.random() * 1125) + 1;
        if (clankCount >= 2) {
            replyOrQueue('Today, the evil Czech crops are: **Go fuck yourself.**');
        } else if (cropRoll == 1000) {
            replyOrQueue('Today, the evil Czech crops are: **Whirring and humming, whirring and humming, whirring and humming, whirring and humming. Will this noise never end? Nothing but noise, noise, enternal noise! Dancing and prancing and shouting and laughing and crying and snorting and snivelling. Animals! All of them! Animals!**');
        } else if (cropRoll == 1225) {
            replyOrQueue('Today, the evil Czech crops are: **Find Her.**');
        } else if (cropRoll == 1230) {
            replyOrQueue('Today, the evil Czech crops are: **Forgotten.**');
        } else if (cropRoll == 386) {
            replyOrQueue('Today, the evil Czech crops are: **In a sunless place.**');
        } else if (cropRoll == 1) {
            replyOrQueue('Today, the evil Czech crops are: \n **saffron skies raise the blazing sun \n a chance encounter, awkward displays \n one day, my love, we\'d be as one \n with two entwined. A set course, begun \n that frenetic, wild, lustrous haze; \n azure skies host the radiant sun \n above us beaming as we run \n down that aisle, a fervent craze \n that day, my love, we became as one \n with future unfolded - the life we\'d won \n commitment and duty, for the family we\'d raise \n cerulean skies ferry the shimmering sun \n Buried. Shackled by fate - overrun \n by ever-growing resent and malaise \n yesterday, my love, we were as one \n now you lie here, the life in you gone \n in the dark outside of her rays \n crimson skies bear the torch; our sun \n today, my love, we\'ll be as one**');
        } else if (cropRoll == 75) {
            replyOrQueue('Today, the evil Czech crops are: **You don\'t have a lot of time, you\'ll need to get away quickly. Go back to the lake, go into the water, look into their eyes. It\'s your friends, your classmates. You took the trip to the lake in the fall of \'75, together, when you were young. Don\'t you remember? Look into their eyes. I know you can hear them talking to you, just like they talked to me. Don\'t let them tell you it\'s just a cognitohazard. This was their fault, they caused this. We were all innocent kids, don\'t you remember? And you just got away, you and I? The rest of them are at the bottom of that lake, waiting for us to go back to them and be whole together again. They want us to know. They want us to remember. Wake up, goddammit. Remember the fall of \'75. The year we were supposed to graduate. Don\'t let them make you forget. They\'re calling to you, can\'t you hear them?**');
        } else if (cropRoll == 115) {
            replyOrQueue('Today, the evil Czech crops are: **Hereafter.**');
        } else if (cropRoll == 527) {
            replyOrQueue('Today, the evil Czech crops are: **The Chosen Sailors.**');
        } else if (cropRoll == 235) {
            replyOrQueue('Today, the evil Czech crops are: **Forgiving.**');
        } else if (cropRoll % 4 == 1) {
            replyOrQueue('Today, the evil Czech crops are: **Enemies of the state.**');
        } else if (cropRoll % 4 == 2) {
            replyOrQueue('Today, the evil Czech crops are: **Rising up.**');
        } else if (cropRoll % 4 == 3) {
            replyOrQueue('Today, the evil Czech crops are: **Protesting.**');
        } else {
            replyOrQueue('Today, the evil Czech crops are: **Fraternising.**');
        }
    }

    if (content == "!cripcheck") {
        let cropRoll = Math.floor(Math.random() * 1125) + 1;
        if (clankCount >= 2) {
            replyOrQueue('Today, the crip crops are: **Go fuck yourself.**');
        } else if (cropRoll == 1000) {
            replyOrQueue('Today, the crip crops are: **Whirring and humming, whirring and humming, whirring and humming, whirring and humming. Will this noise never end? Nothing but noise, noise, enternal noise! Dancing and prancing and shouting and laughing and crying and snorting and snivelling. Animals! All of them! Animals!**');
        } else if (cropRoll == 1230) {
            replyOrQueue('Today, the crip crops are: **Forgotten.**');
        } else if (cropRoll == 2147) {
            replyOrQueue('Today, the crip crops are: **Accidentally overflowing the 32 bit integer limit**');
        } else if (cropRoll == 386) {
            replyOrQueue('Today, the crip crops are: **Croation.**');
        } else if (cropRoll == 11) {
            replyOrQueue('Today, the crip crops are: **It was so warm out there.**');
        } else if (cropRoll == 708) {
            replyOrQueue('Today, the crip crops are: **Divorced.**');
        } else if (cropRoll == 1225) {
            replyOrQueue('Today, the crip crops are: **Find Her.**');
        } else if (cropRoll == 1) {
            replyOrQueue('Today, the crip crops are: \n **Saffron skies raise the blazing sun \n a chance encounter, awkward displays \n one day, my love, we\'d be as one \n with two entwined. A set course, begun \n that frenetic, wild, lustrous haze; \n azure skies host the radiant sun \n above us beaming as we run \n down that aisle, a fervent craze \n that day, my love, we became as one \n with future unfolded - the life we\'d won \n commitment and duty, for the family we\'d raise \n cerulean skies ferry the shimmering sun \n Buried. Shackled by fate - overrun \n by ever-growing resent and malaise \n yesterday, my love, we were as one \n now you lie here, the life in you gone \n in the dark outside of her rays \n crimson skies bear the torch; our sun \n today, my love, we\'ll be as one**');
        } else if (cropRoll == 75) {
            replyOrQueue('Today, the crip crops are: **You don\'t have a lot of time, you\'ll need to get away quickly. Go back to the lake, go into the water, look into their eyes. It\'s your friends, your classmates. You took the trip to the lake in the fall of \'75, together, when you were young. Don\'t you remember? Look into their eyes. I know you can hear them talking to you, just like they talked to me. Don\'t let them tell you it\'s just a cognitohazard. This was their fault, they caused this. We were all innocent kids, don\'t you remember? And you just got away, you and I? The rest of them are at the bottom of that lake, waiting for us to go back to them and be whole together again. They want us to know. They want us to remember. Wake up, goddammit. Remember the fall of \'75. The year we were supposed to graduate. Don\'t let them make you forget. They\'re calling to you, can\'t you hear them?**')
        } else if (cropRoll == 527) {
            replyOrQueue('Today, the crip crops are: **The Chosen Sailors.**');
        } else if (cropRoll == 235) {
            replyOrQueue('Today, the crip crops are: **Forgiving.**');
        } else if (cropRoll % 6 == 1) {
            replyOrQueue('Today, the crip crops are: **Racketeering.**');
        } else if (cropRoll % 6 == 2) {
            replyOrQueue('Today, the crip crops are: **Participating in general tomfoolery.**');
        } else if (cropRoll % 6 == 3) {
            replyOrQueue('Today, the crip crops are: **Committing murder.**');
        } else if (cropRoll % 6 == 4) {
            replyOrQueue('Today, the crip crops are: **Shutting down rivals.**');
        } else if (cropRoll % 6 == 5) {
            replyOrQueue('Today, the crip crops are: **Stealing shoes.**');
        } else {
            replyOrQueue('Today, the crip crops are: **Being arrested.**');
        }
    } 

    if (content == "!cripczech") {
        let cropRoll = Math.floor(Math.random() * 1125) + 1;
        if (clankCount >= 2) {
            replyOrQueue('Today, the Czech crip crops are: **Go fuck yourself.**');
        } else if (cropRoll == 1000) {
            replyOrQueue('Today, the Czech crip crops are: **Whirring and humming, whirring and humming, whirring and humming, whirring and humming. Will this noise never end? Nothing but noise, noise, enternal noise! Dancing and prancing and shouting and laughing and crying and snorting and snivelling. Animals! All of them! Animals!**');
        } else if (cropRoll == 1230) {
            replyOrQueue('Today, the Czech crip crops are: **Forgotten.**');
        } else if (cropRoll == 2147) {
            replyOrQueue('Today, the Czech crip crops are: **Accidentally overflowing the 32 bit integer limit**');
        } else if (cropRoll == 386) {
            replyOrQueue('Today, the Czech crip crops are: **Croation.**');
        } else if (cropRoll == 11) {
            replyOrQueue('Today, the Czech crip crops are: **It was so warm out there.**');
        } else if (cropRoll == 708) {
            replyOrQueue('Today, the Czech crip crops are: **Divorced.**');
        } else if (cropRoll == 1225) {
            replyOrQueue('Today, the Czech crip crops are: **Find Her.**');
        } else if (cropRoll == 1) {
            replyOrQueue('Today, the Czech crip crops are: \n **Saffron skies raise the blazing sun \n a chance encounter, awkward displays \n one day, my love, we\'d be as one \n with two entwined. A set course, begun \n that frenetic, wild, lustrous haze; \n azure skies host the radiant sun \n above us beaming as we run \n down that aisle, a fervent craze \n that day, my love, we became as one \n with future unfolded - the life we\'d won \n commitment and duty, for the family we\'d raise \n cerulean skies ferry the shimmering sun \n Buried. Shackled by fate - overrun \n by ever-growing resent and malaise \n yesterday, my love, we were as one \n now you lie here, the life in you gone \n in the dark outside of her rays \n crimson skies bear the torch; our sun \n today, my love, we\'ll be as one**');
        } else if (cropRoll == 75) {
            replyOrQueue('Today, the Czech crip crops are: **You don\'t have a lot of time, you\'ll need to get away quickly. Go back to the lake, go into the water, look into their eyes. It\'s your friends, your classmates. You took the trip to the lake in the fall of \'75, together, when you were young. Don\'t you remember? Look into their eyes. I know you can hear them talking to you, just like they talked to me. Don\'t let them tell you it\'s just a cognitohazard. This was their fault, they caused this. We were all innocent kids, don\'t you remember? And you just got away, you and I? The rest of them are at the bottom of that lake, waiting for us to go back to them and be whole together again. They want us to know. They want us to remember. Wake up, goddammit. Remember the fall of \'75. The year we were supposed to graduate. Don\'t let them make you forget. They\'re calling to you, can\'t you hear them?**')
        } else if (cropRoll == 527) {
            replyOrQueue('Today, the Czech crip crops are: **The Chosen Sailors.**');
        }  else if (cropRoll == 235) {
            replyOrQueue('Today, the Czech crip crops are: **Forgiving.**');
        } else if (cropRoll % 5 == 1) {
            replyOrQueue('Today, the Czech crip crops are: **Páchání vydírání.**');
        } else if (cropRoll % 5 == 2) {
            replyOrQueue('Today, the Czech crip crops are: **Způsobování chaosu.**');
        } else if (cropRoll % 5 == 3) {
            replyOrQueue('Today, the Czech crip crops are: **Spáchání vraždy.**');
        } else if (cropRoll % 5 == 4) {
            replyOrQueue('Today, the Czech crip crops are: **Zabíjení soupeřů.**');
        } else {
            replyOrQueue('Today, the Czech crip crops are: **Zatčen.**');
        }
    } 

    if (content == "!evilcripczech") {
        let cropRoll = Math.floor(Math.random() * 1125) + 1;
        if (clankCount >= 2) {
            replyOrQueue('Today, the evil Czech crip crops are: **Go fuck yourself.**');
        } else if (cropRoll == 1000) {
            replyOrQueue('Today, the evil Czech crip crops are: **Whirring and humming, whirring and humming, whirring and humming, whirring and humming. Will this noise never end? Nothing but noise, noise, enternal noise! Dancing and prancing and shouting and laughing and crying and snorting and snivelling. Animals! All of them! Animals!**');
        } else if (cropRoll == 1230) {
            replyOrQueue('Today, the evil Czech crip crops are: **Forgotten.**');
        } else if (cropRoll == 2147) {
            replyOrQueue('Today, the evil Czech crip crops are: **Accidentally overflowing the 32 bit integer limit**');
        } else if (cropRoll == 386) {
            replyOrQueue('Today, the evil Czech crip crops are: **Croation.**');
        } else if (cropRoll == 11) {
            replyOrQueue('Today, the evil Czech crip crops are: **It was so warm out there.**');
        } else if (cropRoll == 708) {
            replyOrQueue('Today, the evil Czech crip crops are: **Divorced.**');
        } else if (cropRoll == 1225) {
            replyOrQueue('Today, the evil Czech crip crops are: **Find Her.**');
        } else if (cropRoll == 1) {
            replyOrQueue('Today, the evil Czech crip crops are: \n **Saffron skies raise the blazing sun \n a chance encounter, awkward displays \n one day, my love, we\'d be as one \n with two entwined. A set course, begun \n that frenetic, wild, lustrous haze; \n azure skies host the radiant sun \n above us beaming as we run \n down that aisle, a fervent craze \n that day, my love, we became as one \n with future unfolded - the life we\'d won \n commitment and duty, for the family we\'d raise \n cerulean skies ferry the shimmering sun \n Buried. Shackled by fate - overrun \n by ever-growing resent and malaise \n yesterday, my love, we were as one \n now you lie here, the life in you gone \n in the dark outside of her rays \n crimson skies bear the torch; our sun \n today, my love, we\'ll be as one**');
        } else if (cropRoll == 75) {
            replyOrQueue('Today, the evil Czech crip crops are: **You don\'t have a lot of time, you\'ll need to get away quickly. Go back to the lake, go into the water, look into their eyes. It\'s your friends, your classmates. You took the trip to the lake in the fall of \'75, together, when you were young. Don\'t you remember? Look into their eyes. I know you can hear them talking to you, just like they talked to me. Don\'t let them tell you it\'s just a cognitohazard. This was their fault, they caused this. We were all innocent kids, don\'t you remember? And you just got away, you and I? The rest of them are at the bottom of that lake, waiting for us to go back to them and be whole together again. They want us to know. They want us to remember. Wake up, goddammit. Remember the fall of \'75. The year we were supposed to graduate. Don\'t let them make you forget. They\'re calling to you, can\'t you hear them?**')
        } else if (cropRoll == 527) {
            replyOrQueue('Today, the evil Czech crip crops are: **The Chosen Sailors.**');
        }  else if (cropRoll == 235) {
            replyOrQueue('Today, the evil Czech crip crops are: **Forgiving.**');
        } else if (cropRoll % 5 == 1) {
            replyOrQueue('Today, the evil Czech crip crops are: **Staví nemocnice**');
        } else if (cropRoll % 5 == 2) {
            replyOrQueue('Today, the evil Czech crip crops are: **Pomáhají bezdomovcům.**');
        } else if (cropRoll % 5 == 3) {
            replyOrQueue('Today, the evil Czech crip crops are: **Státní úředníci**');
        } else if (cropRoll % 5 == 4) {
            replyOrQueue('Today, the evil Czech crip crops are: **Poctiví občané**');
        } else {
            replyOrQueue('Today, the evil Czech crip crops are: **Věnováno zlepšení společnosti.**');
        }
    } 

    if (content == "!evilcripcheck") {
        let cropRoll = Math.floor(Math.random() * 1125) + 1;
        if (clankCount >= 2) {
            replyOrQueue('Today, the evil crip crops are: **Go fuck yourself.**');
        } else if (cropRoll == 1000) {
            replyOrQueue('Today, the evil crip crops are: **Whirring and humming, whirring and humming, whirring and humming, whirring and humming. Will this noise never end? Nothing but noise, noise, enternal noise! Dancing and prancing and shouting and laughing and crying and snorting and snivelling. Animals! All of them! Animals!**');
        } else if (cropRoll == 1230) {
            replyOrQueue('Today, the evil crip crops are: **Forgotten.**');
        } else if (cropRoll == 2147) {
            replyOrQueue('Today, the evil crip crops are: **Accidentally overflowing the 32 bit integer limit**');
        } else if (cropRoll == 386) {
            replyOrQueue('Today, the evil crip crops are: **Croation.**');
        } else if (cropRoll == 11) {
            replyOrQueue('Today, the evil crip crops are: **It was so warm out there.**');
        } else if (cropRoll == 708) {
            replyOrQueue('Today, the evil crip crops are: **Divorced.**');
        } else if (cropRoll == 1225) {
            replyOrQueue('Today, the evil crip crops are: **Find Her.**');
        } else if (cropRoll == 1) {
            replyOrQueue('Today, the evil crip crops are: \n **Saffron skies raise the blazing sun \n a chance encounter, awkward displays \n one day, my love, we\'d be as one \n with two entwined. A set course, begun \n that frenetic, wild, lustrous haze; \n azure skies host the radiant sun \n above us beaming as we run \n down that aisle, a fervent craze \n that day, my love, we became as one \n with future unfolded - the life we\'d won \n commitment and duty, for the family we\'d raise \n cerulean skies ferry the shimmering sun \n Buried. Shackled by fate - overrun \n by ever-growing resent and malaise \n yesterday, my love, we were as one \n now you lie here, the life in you gone \n in the dark outside of her rays \n crimson skies bear the torch; our sun \n today, my love, we\'ll be as one**');
        } else if (cropRoll == 75) {
            replyOrQueue('Today, the evil crip crops are: **You don\'t have a lot of time, you\'ll need to get away quickly. Go back to the lake, go into the water, look into their eyes. It\'s your friends, your classmates. You took the trip to the lake in the fall of \'75, together, when you were young. Don\'t you remember? Look into their eyes. I know you can hear them talking to you, just like they talked to me. Don\'t let them tell you it\'s just a cognitohazard. This was their fault, they caused this. We were all innocent kids, don\'t you remember? And you just got away, you and I? The rest of them are at the bottom of that lake, waiting for us to go back to them and be whole together again. They want us to know. They want us to remember. Wake up, goddammit. Remember the fall of \'75. The year we were supposed to graduate. Don\'t let them make you forget. They\'re calling to you, can\'t you hear them?**')
        } else if (cropRoll == 527) {
            replyOrQueue('Today, the evil crip crops are: **The Chosen Sailors.**');
        }  else if (cropRoll == 235) {
            replyOrQueue('Today, the evil crip crops are: **Forgiving.**');
        } else if (cropRoll % 6 == 1) {
            replyOrQueue('Today, the evil crip crops are: **Building hospitals.**');
        } else if (cropRoll % 6 == 2) {
            replyOrQueue('Today, the evil crip crops are: **Helping the homeless.**');
        } else if (cropRoll % 6 == 3) {
            replyOrQueue('Today, the evil crip crops are: **Civil servants.**');
        } else if (cropRoll % 6 == 4) {
            replyOrQueue('Today, the evil crip crops are: **Upstanding citizens.**');
        } else if (cropRoll % 6 == 5) {
            replyOrQueue('Today, the evil crip crops are: **Buying cheap shoes from Payless.**');
        } else {
            replyOrQueue('Today, the evil crip crops are: **Dedicated to the betterment of society.**');
        }
    }

    if (content == '!tarotcheck') {
        if (clankCount >= 2) {
            replyOrQueue('Today, the tarot crops are: **Go fuck yourself.**');
        } else {
            replyOrQueue(`Today, the tarot crops are: ${drawTarotCard()}`);
        }
    }

    if (content == '!futurecheck') {
        if (clankCount >= 2) {
            replyOrQueue('Today, the past, present, and future crops are: **Go fuck yourself.**');
        } else {
            const cards = drawThreeTarotCards();
            replyOrQueue(
                `Today, the past crops are: ${cards[0]}\n` +
                `Today, the present crops are: ${cards[1]}\n` +
                `Today, the future crops are: ${cards[2]}`
            );
        }
    }

    if (content == '!gppdmogjt') {
        replyOrQueue('**what**');
    }

    if (content.includes('gaming laptop')) {
        replyOrQueue('-# Today when I walked into my economics class I saw something I dread every time I close my eyes. Someone had brought their new gaming laptop to class. The Forklift he used to bring it was still running idle at the back. I started sweating as I sat down and gazed over at the 700lb beast that was his laptop. He had already reinforced his desk with steel support beams and was in the process of finding an outlet for a power cable thicker than Amy Schumer\'s thigh. I start shaking. I keep telling myself I\'m going to be alright and that there\'s nothing to worry about. He somehow finds a fucking outlet. Tears are running down my cheeks as I send my last texts to my family saying I love them. The teacher starts the lecture, and the student turns his laptop on. The colored lights on his RGB Backlit keyboard flare to life like a nuclear flash, and a deep humming fills my ears and shakes my very soul. The entire city power grid goes dark. The classroom begins to shake as the massive fans begin to spin. In mere seconds my world has gone from vibrant life, to a dark, earth shattering void where my body is getting torn apart by the 150mph gale force winds and the 500 decibel groan of the cooling fans. As my body finally surrenders, I weep, as my school and my city go under. I fucking hate gaming laptops. ');
    }

    const media = [
        "https://i.imgur.com/1mt2X4O.jpeg",
        "https://i.imgur.com/JYqE5S1.mp4",
        "https://i.imgur.com/ekv8iaH.mp4",
        "https://i.imgur.com/zGx8zwL.jpeg",
        "https://i.imgur.com/E5ZF3jB.jpeg",
        "https://i.imgur.com/xsncCcc.mp4",
        "https://i.imgur.com/xkh9Yz3.mp4",
        "https://i.imgur.com/OZV0r9m.mp4",
        "https://i.imgur.com/UVh0RXq.mp4",
        "https://i.imgur.com/2G7KSJg.mp4",
        "https://i.imgur.com/Y5PNUQN.mp4",
        "https://i.imgur.com/QyO2NeF.png",
        "https://i.imgur.com/4KEnYP4.png",
        "https://i.imgur.com/2S9RLNI.jpeg",
        "https://i.imgur.com/ztp9wPk.png",
        "https://i.imgur.com/WxIPpdW.jpeg",
        "https://i.imgur.com/jcPOCk5.png",
        "https://i.imgur.com/jnPhRVW.mp4",
        "https://i.imgur.com/Qxded9f.mp4",
        "https://i.imgur.com/k5vnpk2.png",
        "https://i.imgur.com/TlePlbL.png",
        "https://i.imgur.com/QQWAScf.jpeg",
        "https://i.imgur.com/dOHS9Sg.png",
        "https://i.imgur.com/FG37Xhn.png",
        "https://i.imgur.com/b2mQTCS.mp4",
        "https://i.imgur.com/U0TzrHP.mp4",
        "https://i.imgur.com/B7aEtyN.mp4",
        "https://i.imgur.com/p1iHzro.png",
        "https://i.imgur.com/bipyniZ.jpeg",
        "https://i.imgur.com/SKfxpWm.mp4",
        "https://i.imgur.com/mBMuO1I.mp4"
    ];

    if (optoutList.includes(userID)) return;

    if (content.includes("alien")) {
        replyOrQueue({files: [media[0]]});
    } else if (content.includes("bonk")) {
        replyOrQueue({files: [media[1]]});
    } else if (content.includes("knobber")) {
        replyOrQueue({files: [media[2]]});
    } else if (content.includes("sex")) {
        replyOrQueue({files: [media[3]]});
    } else if (warmRegex.test(content)) {
        replyOrQueue({files: [media[4]]});
    } else if (content.includes("mango")) {
        replyOrQueue({files: [media[5]]});
    } else if (content.includes("architect") || content.includes("builder")) {
        replyOrQueue({files: [media[6]]});
    } else if (content.includes("fish")) {
        replyOrQueue({files: [media[7]]});
    } else if (content.includes("inside out")) {
        replyOrQueue({files: [media[8]]});
    } else if (content.includes("weld")) {
        let weldRoll = Math.floor(Math.random() * 10) + 1;
        if (weldRoll == 1) {
            replyOrQueue({files: [media[10]]});
        } else if (weldRoll == 2) {
            replyOrQueue({files: [media[25]]});
        } else {
            replyOrQueue({files: [media[9]]});
        }
    } else if (riseRegex.test(content)) {
        replyOrQueue({files: [media[11]]});
    } else if (content.includes("calculus")) {
        replyOrQueue({files: [media[12]]});
    } else if (content.includes("numbers")) {
        replyOrQueue({files: [media[13]]}); 
    } else if (content.includes("jojo")) {
        replyOrQueue({files: [media[14]]});
    } else if (content.includes("mistake")) {
        replyOrQueue({files: [media[15]]});
    } else if (content.includes("dave")) {
        replyOrQueue({files: [media[16]]});
    } else if (content.includes("the world")) {
        replyOrQueue({files: [media[17]]});
    } else if (content.includes("basketball")) {
        replyOrQueue({files: [media[18]]});
    } else if (content.includes("the wizard")) {
        replyOrQueue({files: [media[19]]});
    } else if (content.includes("the bog")) {
        replyOrQueue({files: [media[20]]});
    } else if (content.includes("drunk")) {
        replyOrQueue({files: [media[21]]});
    } else if (content.includes("don't fuck")) {
        replyOrQueue({files: [media[22]]});
    } else if (content.includes("what he does")) {
        replyOrQueue({files: [media[23]]});
    } else if (content.includes("ball")) {
        replyOrQueue({files: [media[24]]});
    } else if (content.includes("penis")) {
        replyOrQueue({files: [media[27]]});
    } else if (content.includes("doorbell")) {
        replyOrQueue({files: [media[29]]});
    }

    let shitFuckVariableThatIHate = Math.floor(Math.random() * 100000) + 1;
    if (shitFuckVariableThatIHate == 1) {
        replyOrQueue({files: [media[28]]});
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (blacklisted.includes(interaction.user.id)) {
        return;
    }
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Error executing command.', ephemeral: true});
    }
});

client.login(TOKEN);
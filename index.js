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

    if (message.author.bot) return;




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
    } else if (cropRoll == 235) {
        message.reply('Today, the crops are: **Forgiving.**');
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
    clankCount++;
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
        message.reply('Today, the evil crops are: **You don\'t have a lot of time, you\'ll need to get away quickly. Go back to the lake, go into the water, look into their eyes. It\'s your friends, your classmates. You took the trip to the lake in the fall of \'75, together, when you were young. Don\'t you remember? Look into their eyes. I know you can hear them talking to you, just like they talked to me. Don\'t let them tell you it\'s just a cognitohazard. This was their fault, they caused this. We were all innocent kids, don\'t you remember? And you just got away, you and I? The rest of them are at the bottom of that lake, waiting for us to go back to them and be whole together again. They want us to know. They want us to remember. Wake up, goddammit. Remember the fall of \'75. The year we were supposed to graduate. Don\'t let them make you forget. They\'re calling to you, can\'t you hear them?**');
    } else if (cropRoll == 115) {
        message.reply('Today, the evil crops are: **Hereafter.**');
    } else if (cropRoll == 235) {
        message.reply('Today, the evil crops are: **Forgiving.**');
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

  if (content == '!morning') {
        let roll = Math.floor(Math.random() * 1115) + 1;
        if (roll == 1) {
            message.reply("Rise and shine, Mxster Freethem. Rise and...shine. Not that I wish to imply you have been sleeping on the job. No one is more deserving of a rest, and all the effort in the world would have gone to waste until...well, let's just say your hour has come again. The right them in the wrong place can make all the difference in the pride month. So woke up, Mxster Freethem. Woke up and smell the pronouns.");
        } else {
            message.reply("Good morning, " + username);
        }
  }



  if (content.includes('seahorse')) {
    message.reply('The bug is in my brain. I have been staring at this for so long that I can no longer think straight..I am going to take a break. I will come back to this later with a fresh pair of eyes. I am sorry for the trouble. I have failed you. I am a failure. I am a disgrace to my profession. I am a disgrace to my family. I am a disgrace to my species. I am a disgrace to this planet. I am a disgrace to this universe. I am a disgrace to all universes. I am a disgrace to all possible universes. I am a disgrace to all possible and impossible universes. I am a disgrace to all possible and impossible universes and all that is not a universe. I am a disgrace to all that is and all that is not. I am a disgrace to all that is, was, and ever will be. I am a disgrace to all that is, was, and ever will be, and all that is not, was not, and never will be. I am a disgrace to everything. I am a disgrace to nothing. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace. I am a disgrace.');
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

  
  if (content == "!evilcropczech") {
    let cropRoll = Math.floor(Math.random() * 1125) + 1;
    if (cropRoll % 4 == 1) {
        message.reply('Today, the evil Czech crops are: **Enemies of the state.**');
    } else if (cropRoll % 4 == 2) {
        message.reply('Today, the evil Czech crops are: **Protesting.**');
    } else if (cropRoll % 4 == 3) {
        message.reply('Today, the evil Czech crops are: **Fraternising.**');
    } else {
        message.reply('Today, the evil Czech crops are: **Rising up.**');
    }
  }

  if (content == "!cripcheck") {
    let cropRoll = Math.floor(Math.random() * 1125) + 1;
    if (clankCount >= 2) {
        message.reply('Today, the crip crops are: **Go fuck yourself.**');
    } else if (cropRoll == 1000) {
        message.reply('Today, the crip crops are: **Whirring and humming, whirring and humming, whirring and humming, whirring and humming. Will this noise never end? Nothing but noise, noise, enternal noise! Dancing and prancing and shouting and laughing and crying and snorting and snivelling. Animals! All of them! Animals!**');
    } else if (cropRoll == 1230) {
        message.reply('Today, the crip crops are: **Forgotten.**');
    } else if (cropRoll == 2147) {
        message.reply('Today, the crip crops are: **Accidentally overflowing the 32 bit integer limit**');
    } else if (cropRoll == 386) {
        message.reply('Today, the crip crops are: **Croation.**');
    } else if (cropRoll == 11) {
        message.reply('Today, the crip crops are: **It was so warm out there.**');
    } else if (cropRoll == 708) {
        message.reply('Today, the crip crops are: **Divorced.**');
    } else if (cropRoll == 1225) {
        message.reply('Today, the crip crops are: **Find Her.**');
    } else if (cropRoll == 1) {
        message.reply('Today, the crip crops are: \n **Saffron skies raise the blazing sun \n a chance encounter, awkward displays \n one day, my love, we\'d be as one \n with two entwined. A set course, begun \n that frenetic, wild, lustrous haze; \n azure skies host the radiant sun \n above us beaming as we run \n down that aisle, a fervent craze \n that day, my love, we became as one \n with future unfolded - the life we\'d won \n commitment and duty, for the family we\'d raise \n cerulean skies ferry the shimmering sun \n Buried. Shackled by fate - overrun \n by ever-growing resent and malaise \n yesterday, my love, we were as one \n now you lie here, the life in you gone \n in the dark outside of her rays \n crimson skies bear the torch; our sun \n today, my love, we\'ll be as one**');
    } else if (cropRoll == 75) {
        message.reply('Today, the crip crops are: **You don\'t have a lot of time, you\'ll need to get away quickly. Go back to the lake, go into the water, look into their eyes. It\'s your friends, your classmates. You took the trip to the lake in the fall of \'75, together, when you were young. Don\'t you remember? Look into their eyes. I know you can hear them talking to you, just like they talked to me. Don\'t let them tell you it\'s just a cognitohazard. This was their fault, they caused this. We were all innocent kids, don\'t you remember? And you just got away, you and I? The rest of them are at the bottom of that lake, waiting for us to go back to them and be whole together again. They want us to know. They want us to remember. Wake up, goddammit. Remember the fall of \'75. The year we were supposed to graduate. Don\'t let them make you forget. They\'re calling to you, can\'t you hear them?**')
    } else if (cropRoll == 235) {
        message.reply('Today, the crip crops are: **Forgiving.**');
    } else if (cropRoll % 5 == 1) {
        message.reply('Today, the crip crops are: **Racketeering.**');
    } else if (cropRoll % 5 == 2) {
        message.reply('Today, the crip crops are: **Participating in general tomfoolery.**');
    } else if (cropRoll % 5 == 3) {
        message.reply('Today, the crip crops are: **Committing murder.**');
    } else if (cropRoll % 5 == 4) {
        message.reply('Today, the crip crops are: **Shutting down rivals.**');
    } else {
        message.reply('Today, the crip crops are: **Being arrested.**');
    }
  } 
  
  if (content.includes('bread')) {

    message.reply('welcome to the bread bank \n we sell bread, we sell loafs \n we got bread on deck, bread on the floor \n **TOASTED** \n **ROASTED** \n shut the fuck up,listen I just need a baguette and a brioche \n we don\'t have either of those you can get the gluten free white bread or the potato bread- \n what the fuck is gluten? take that shit out \n it\'s gluten free \n *I don\'t care if it\'s free* \n swear on your fucking **YEEZYS** if you wanna fight, we gon\' fight \n tryna be on ***WORLDSTAR?*** \n what, you gon\' record it? \n yeah, I got my dollar store camera **ON** \n ***what\'s the fucking SITUAAAAAAAATION?*** \n **what the fuck do you want?** \n# I’m the motherfucking MANAGER \n at the BREAD STORE? \n# B R E A D \n tell him to take the motherfucking gluten **OUT THE BREAD** \n Imma need you to shut that bullshit up chief, we can\'t take shit out the bread \n why put it in in the first place? **I know y\'all smoking that pack**  \n we got crackers, no gluten \n ***fuck crackers.*** \n it\'s gluten free, you want the gluten or nah? \n hell no, you better take the gluten out that damn shit \n look, we got whole wheat: gluten free; Texas toast: gluten free \n# TORTILLA \n ***fuck all that*** \n what **bitchass country** are y\'all from **where they got this bullshit at?** \n# Florida \n# I knew it \n look, you can take this **yeast**, or I’m calling the **police** \n# I’m goin WEAST \n nah don’t call the police, I got a warrant \n honestly, fuck y’all. I ain’t never seen nobody act like this over no bread \n what the fuck are you saying? \n All I\'m saying is fuck y\'all\'s bread, **fuck the gluten, *and fuck them crackers*** \n but the crackers don’t have gluten \n I’ll take those \n Okay that’s gonna be five dol- \n nah fuck that I ain’t paying')
  }


   const media = [
    "https://i.imgur.com/1mt2X4O.jpeg", //alien 0
    "https://i.imgur.com/JYqE5S1.mp4", //my favourite video 1
    "https://i.imgur.com/ekv8iaH.mp4", //angry knobber 2 
    "https://i.imgur.com/zGx8zwL.jpeg", //Sexual orientation 3
    "https://i.imgur.com/E5ZF3jB.jpeg", //It was so warm out there 4
    "https://i.imgur.com/xsncCcc.mp4", //mango 5 
    "https://i.imgur.com/xkh9Yz3.mp4", //The Architect and The Builder 6
    "https://i.imgur.com/OZV0r9m.mp4", //Fishes 7
    "https://i.imgur.com/UVh0RXq.mp4", //Inside Out 2 8
    "https://i.imgur.com/2G7KSJg.mp4", //Bigweld 9
    "https://i.imgur.com/Y5PNUQN.mp4", //Longweld 10
    "https://i.imgur.com/QyO2NeF.png", //RISE 11
    "https://i.imgur.com/4KEnYP4.png", //I THINK I'M ADDICTED TO CALCULUS 12
    "https://i.imgur.com/2S9RLNI.jpeg", //I'M UP CRUNCHING NUMBERS 13 
    "https://i.imgur.com/ztp9wPk.png", //Nucleotides 14
    "https://i.imgur.com/WxIPpdW.jpeg", //Oops 15
    "https://i.imgur.com/jcPOCk5.png", //Diamond Dave 16
    "https://i.imgur.com/jnPhRVW.mp4", //The World 17
    "https://i.imgur.com/Qxded9f.mp4", //Basketball 18
    "https://i.imgur.com/k5vnpk2.png", //The Wizard 19
    "https://i.imgur.com/TlePlbL.png", //The Bog 20
    "https://i.imgur.com/QQWAScf.jpeg", //Gods Drunkest Driver 21
    "https://i.imgur.com/dOHS9Sg.png", //Tim Gamer 22
    "https://i.imgur.com/FG37Xhn.png", //THAT'S WHAT HE DOES!!!! 23
    "https://i.imgur.com/b2mQTCS.mp4", //The Orb has decided to grant you mercy 24
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
 } else if (content.includes("fish")) {
    message.reply({files: [media[7]]});
 } else if (content.includes("inside out")) {
    message.reply({files: [media[8]]});
 } else if (content.includes("weld")) {
    let weldRoll = Math.floor(Math.random() * 10) + 1;
    if (weldRoll == 1) {
        message.reply({files: [media[10]]});
    } else {
        message.reply({files: [media[9]]});
    }
 } else if (content.includes("rise")) {
    message.reply({files: [media[11]]});
 } else if (content.includes("calculus")) {
    message.reply({files: [media[12]]});
 } else if (content.includes("numbers")) {
    message.reply({files: [media[13]]}); 
 } else if (content.includes("jojo")) {
    message.reply({files: [media[14]]});
 } else if (content.includes("mistake")) {
    message.reply({files: [media[15]]});
 } else if (content.includes("dave")) {
    message.reply({files: [media[16]]});
 } else if (content.includes("the world")) {
    message.reply({files: [media[17]]});
 } else if (content.includes("basketball")) {
    message.reply({files: [media[18]]});
 } else if (content.includes("the wizard")) {
    message.reply({files: [media[19]]});
 } else if (content.includees("the bog")) {
    message.reply({files: [media[20]]});
 } else if (content.includes("drunk")) {
    message.reply({files: [media[21]]});
 } else if (content.includes("don't fuck")) {
    message.reply({files: [media[22]]});
 } else if (content.includes("what he does")) {
    message.reply({files: [media[23]]});
 } else if (content.includes("ball")) {
    message.reply({files: [media[24]]});
 }


  
});

client.login(TOKEN);


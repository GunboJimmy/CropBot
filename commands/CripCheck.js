const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('cripcheck').setDescription('Checks The Crip Crops.'),

    async execute(interaction) {
        let cropRoll = Math.floor(Math.random() * 11226) + 1;
        let response;
     if (cropRoll == 1000) {
        response = 'Today, the crip crops are: **Whirring and humming, whirring and humming, whirring and humming, whirring and humming. Will this noise never end? Nothing but noise, noise, enternal noise! Dancing and prancing and shouting and laughing and crying and snorting and snivelling. Animals! All of them! Animals!**';
    } else if (cropRoll == 1230) {
        response = 'Today, the crip crops are: **Forgotten.**';
    } else if (cropRoll == 2147) {
        response = 'Today, the crip crops are: **Accidentally overflowing the 32 bit integer limit**';
    } else if (cropRoll == 386) {
        response = 'Today, the crip crops are: **Croation.**';
    } else if (cropRoll == 11) {
        response = 'Today, the crip crops are: **It was so warm out there.**';
    } else if (cropRoll == 708) {
        response = 'Today, the crip crops are: **Divorced.**';
    } else if (cropRoll == 1225) {
        response = 'Today, the crip crops are: **Find Her.**';
    } else if (cropRoll == 1) {
        response = 'Today, the crip crops are: \n **Saffron skies raise the blazing sun \n a chance encounter, awkward displays \n one day, my love, we\'d be as one \n with two entwined. A set course, begun \n that frenetic, wild, lustrous haze; \n azure skies host the radiant sun \n above us beaming as we run \n down that aisle, a fervent craze \n that day, my love, we became as one \n with future unfolded - the life we\'d won \n commitment and duty, for the family we\'d raise \n cerulean skies ferry the shimmering sun \n Buried. Shackled by fate - overrun \n by ever-growing resent and malaise \n yesterday, my love, we were as one \n now you lie here, the life in you gone \n in the dark outside of her rays \n crimson skies bear the torch; our sun \n today, my love, we\'ll be as one**';
    } else if (cropRoll == 75) {
        response = 'Today, the crip crops are: **You don\'t have a lot of time, you\'ll need to get away quickly. Go back to the lake, go into the water, look into their eyes. It\'s your friends, your classmates. You took the trip to the lake in the fall of \'75, together, when you were young. Don\'t you remember? Look into their eyes. I know you can hear them talking to you, just like they talked to me. Don\'t let them tell you it\'s just a cognitohazard. This was their fault, they caused this. We were all innocent kids, don\'t you remember? And you just got away, you and I? The rest of them are at the bottom of that lake, waiting for us to go back to them and be whole together again. They want us to know. They want us to remember. Wake up, goddammit. Remember the fall of \'75. The year we were supposed to graduate. Don\'t let them make you forget. They\'re calling to you, can\'t you hear them?**';
    } else if (cropRoll == 527) {
        response = 'Today, the crip crops are: **The Chosen Sailors.**';
    } else if (cropRoll == 235) {
        response = 'Today, the crip crops are: **Forgiving.**';
    } else if (cropRoll % 6 == 1) {
        response = 'Today, the crip crops are: **Racketeering.**';
    } else if (cropRoll % 6 == 2) {
        response = 'Today, the crip crops are: **Participating in general tomfoolery.**';
    } else if (cropRoll % 6 == 3) {
        response = 'Today, the crip crops are: **Committing murder.**';
    } else if (cropRoll % 6 == 4) {
        response = 'Today, the crip crops are: **Shutting down rivals.**';
    } else if (cropRoll % 6 == 5) {
        response = 'Today, the crip crops are: **Stealing shoes.**';
    } else {
        response = 'Today, the crip crops are: **Being arrested.**';
    }

    await interaction.deferReply();
    await interaction.editReply(response);
  }, 
    }

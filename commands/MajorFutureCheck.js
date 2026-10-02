const { SlashCommandBuilder } = require('discord.js');

const majorArcana = [
    "0 - The Fool", "1 - The Magician", "2 - The High Priestess", "3 - The Empress",
    "4 - The Emperor", "5 - The Hierophant", "6 - The Lovers", "7 - The Chariot",
    "8 - Strength", "9 - The Hermit", "10 - Wheel of Fortune", "11 - Justice",
    "12 - The Hanged Man", "13 - Death", "14 - Temperance", "15 - The Devil",
    "16 - The Tower", "17 - The Star", "18 - The Moon", "19 - The Sun",
    "20 - Judgement", "21 - The World"
];

const minorArcana = [];
const suits = ['Wands', 'Cups', 'Swords', 'Pentacles'];
const ranks = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Page', 'Knight', 'Queen', 'King'];

for (const suit of suits) {
    for (const rank of ranks) {
        minorArcana.push(`${rank} of ${suit}`);
    }
}

//Full Deck of all cards
const fullDeck = [...majorArcana, ...minorArcana];

//Draws any tarot card (including minor)
function drawAnyTarotCard() {
    const card = fullDeck[Math.floor(Math.random() * fullDeck.length)];
    const isReversed = Math.random() >= 0.5;
    return `**${card}${isReversed ? ' Reversed' : ''}**`;
}

//Draws any minor arcana
function drawMinorArcanaCard() {
    const card = minorArcana[Math.floor(Math.random() * minorArcana.length)];
    const isReversed = Math.random() >= 0.5;
    return `**${card}${isReversed ? ' Reversed' : ''}**`;
}

// 3. Draws 3 random Major or Minor Arcana cards (Past, Present, Future without duplicates)
function drawThreeAnyTarotCards() {
    return drawSpreadCards(fullDeck, 3);
}

// Helper to draw N unique cards from a given deck array
function drawSpreadCards(deck, count) {
    let tempDeck = [...deck];
    let drawn = [];
    for (let i = 0; i < count; i++) {
        const index = Math.floor(Math.random() * tempDeck.length);
        const card = tempDeck.splice(index, 1)[0];
        const isReversed = Math.random() >= 0.5;
        drawn.push(`**${card}${isReversed ? ' Reversed' : ''}**`);
    }
    return drawn;
}

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


module.exports = {
    data: new SlashCommandBuilder().setName('majorfuturecheck').setDescription('Draws three major arcana cards to represent the past, present, and future.'),

    async execute(interaction) {
        let response;
        

        response = (`Today, the tarot crops are: ${drawTarotCard()}`);

    await interaction.deferReply();
    await interaction.editReply(response);
  }, 
    }  

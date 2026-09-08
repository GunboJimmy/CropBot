const { SlashCommandBuilder } = require('discord.js');

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
    // Strict comparison guarantees a 50/50 boolean split
    const isReversed = Math.random() >= 0.5; 
    return `**${card}${isReversed ? ' Reversed' : ''}**`;
}

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
    data: new SlashCommandBuilder().setName('futurecheck').setDescription('Draws three major arcana cards to represent the past, present, and future.'),

    async execute(interaction) {
        let response;

        const cards = drawThreeTarotCards();
        
        response = `Today, the past crops are: ${cards[0]}\n` +
            `Today, the present crops are: ${cards[1]}\n` +
            `Today, the future crops are: ${cards[2]}`

    await interaction.deferReply();
    await interaction.editReply(response);
  }, 
    }

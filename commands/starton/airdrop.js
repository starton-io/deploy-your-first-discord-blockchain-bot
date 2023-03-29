const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('airdrop')
        .setDescription('Get your NFT by passing your wallet as parameter of this function.'),
    async execute(interaction) {
        return interaction.reply('Command received');
    },
};

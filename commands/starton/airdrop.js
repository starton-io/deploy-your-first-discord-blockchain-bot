const { SlashCommandBuilder } = require('discord.js');
const mintNft = require("../../starton");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('airdrop')
        .setDescription('Get your NFT by passing your wallet as parameter of this function.')
        .addStringOption(option =>
            option
                .setName('wallet')
                .setDescription('Put your Ethereum wallet to get your Starton x Epitech NFT')
                .setRequired(true)),
    async execute(interaction) {
        const wallet = interaction.options.getString('wallet');

        if (!wallet) {
            return interaction.reply('No wallet provided.');
        }

        try {
            await mintNft(wallet)
        } catch (e) {
            console.error(e)
            return interaction.reply(`Error while minting NFT on \`${wallet}\` address`)
        }

        return interaction.reply(`Starton x Epitech NFT successfully minted on \`${wallet}\` address`);
    },
};

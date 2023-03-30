const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()

const STARTON_API_KEY = process.env.STARTON_API_KEY
console.log('STARTON_API_KEY: ', STARTON_API_KEY)

const axiosInstance = axios.create({
    baseURL: "https://api.starton.io",
    headers: {
        "x-api-key": `${process.env.STARTON_API_KEY}`,
    },
})

module.exports = async function mintNft(wallet) {
    axiosInstance.post(
        "/v3/smart-contract/polygon-mumbai/CONTRACT_ADDRESS/call",
        {
            functionName: "mint(address,string)",
            params: [
                wallet,
                "YOUR METADATA CID"
            ],
            signerWallet: "DEFAULT STARTON WALLET",
            speed: "average"
        }
    ).then((response) => {
        console.log(response.data)
    })
}
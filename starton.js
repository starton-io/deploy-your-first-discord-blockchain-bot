const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()

const STARTON_API_KEY = process.env.STARTON_API_KEY
console.log(STARTON_API_KEY)

const axiosInstance = axios.create({
    baseURL: "https://api.starton.io",
    headers: {
        "x-api-key": `${process.env.STARTON_API_KEY}`,
    },
})

axiosInstance.post(
    "/v3/smart-contract/polygon-mumbai/0x281B6De8E5573a0E8438602f53D32Cde4D0026e7/call",
    {
        functionName: "mint(address,string)",
        params: [
            "YOUR WALLET",
            "YOUR METADATA CID"
        ],
        signerWallet: "DEFAULT STARTON WALLET",
        speed: "average"
    }
).then((response) => {
    console.log(response.data)
})
require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    defaultNetwork: "hardhat",

    networks: {
        sepolia: {
            url: process.env.ALCHEMY_URL,
            chainId: 11155111,
            accounts: [process.env.PRIVATE_KEY_ACCOUNTS],
        },
        hardhat: {
            chainId: 31337,
        },
    },

    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },

    namedAccounts: {
        deployer: {
            default: 0,
        },
    },

    solidity: "0.8.17",
};

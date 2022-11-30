require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      hardfork: "london", // default "arrowGlacier" in mainnet
      throwOnTransactionFailures: true, //  controls if Hardhat Network throws on transaction failures
      throwOnCallFailures: true, // controls if Hardhat Network throws on call failures
      forking: {
        url: process.env.INFURA_URL_API_KEY,
        enabled: true
      },
      accounts: {
        mnemonic: process.env.MNEMONIC,
        path: "m/44'/60'/0'/0", // HD parent of all the derived keys. Default value: "m/44'/60'/0'/0"
        initialIndex: 0, // The initial index to derive. Default value: 0.
        count: 20, // The number of accounts to derive. Default value: 20.
        passphrase: "" // The passphrase for the wallet. Default value: empty string.
      }
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.8.1"
      }
    ],
    settings: {
      optimizer: {
        enabled: false
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 100000000
  }
};

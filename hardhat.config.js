require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("funds", "Transfers 1000 ETH into MetaMask account", async () => {
  await network.provider.send("hardhat_setBalance", [
    process.env.METAMASK_ACCOUNT,
    "0x3635C9ADC5DEA00000"
  ]);
  console.log("Funds transferred to MetaMask account");
  // now MetaMask account has 1 ETH after this
});

const FORK_MAINNET = true;
const FORK_POLYGON = false;
const FORK_AVALANCHE = false;
const FORK_ARBITRUM = false;
const FORK_BSC = false;

const MAINNET = false;
const POLYGON = false;
const AVALANCHE = false;
const ARBITRUM = false;
const BSC = false;

const forkingData = FORK_MAINNET
    ? {
        url: process.env.INFURA_URL_API_KEY,
        enabled: true
      }
    : FORK_POLYGON
    ? {
        url: process.env.ALCHEMY_URL_API_KEY,
        enabled: true
      }
    : FORK_AVALANCHE
    ? {
        url: process.env.QUICKNODE_URL,
        enabled: true
      }
    : FORK_ARBITRUM
    ? {
        url: process.env.CHAINSTACK_URL_API_KEY,
        enabled: true
      }
    : FORK_BSC
    ? {
        url: process.env.QUICKNODE_URL,
        enabled: true
      }
    : undefined;

const urlData = MAINNET
    ? process.env.INFURA_URL_API_KEY
    : POLYGON
    ? process.env.ALCHEMY_URL_API_KEY
    : AVALANCHE
    ? process.env.QUICKNODE_URL
    : ARBITRUM
    ? process.env.CHAINSTACK_URL_API_KEY
    : BSC
    ? process.env.QUICKNODE_URL
    : "http://127.0.0.1:8545";
const chainData = MAINNET
    ? 1
    : POLYGON
    ? 137
    : AVALANCHE
    ? 43114
    : ARBITRUM
    ? 42161
    : BSC
    ? 56
    : FORK_MAINNET
    ? 1 // TODO change value
    : FORK_POLYGON
    ? 137 // TODO change value
    : FORK_AVALANCHE
    ? 43114 // TODO change value
    : FORK_ARBITRUM
    ? 42161 // TODO change value
    : FORK_BSC
    ? 56 // TODO change value
    : 31337; // default to Mainnet chainId
// npx hardhat node --fork https://mainnet.infura.io/v3/6021b8788d0648c285535dc157a95e6f                      - Ethereum
// npx hardhat node --fork https://polygon-mainnet.g.alchemy.com/v2/6PIuO6E27kV4Lsq-eeQmytlvxdRmQf-U          - Polygon
// npx hardhat node --fork https://cosmological-frequent-grass.avalanche-mainnet.discover.quiknode.pro/3827e11cf6eec13d5375632dc58aa9e8510ebf75/ext/bc/C/rpc/ - Avalanche
// npx hardhat node --fork https://nd-968-304-028.p2pify.com/e7349277152e973a90aa8df336bd773b                 - Arbitrum
// npx hardhat node --fork https://quiet-sparkling-lambo.bsc.discover.quiknode.pro/d1f2eda2f4cfa3bb9e929c1096d4f424ba7e570b - BSC
// npx hardhat funds --network localhost
// npx hardhat run --network localhost scripts/deploy.js
// npx hardhat run --network localhost runarb.js
//
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {},
    localhost: {
      url: urlData,
      //chainId: chainData,
      throwOnTransactionFailures: true, //  controls if Hardhat Network throws on transaction failures
      throwOnCallFailures: true, // controls if Hardhat Network throws on call failures
      forking: forkingData,
      accounts: {
        mnemonic: process.env.MNEMONIC,
        path: "",
        initialIndex: 0, // The initial index to derive. Default value: 0.
        count: 20, // The number of accounts to derive. Default value: 20.
        passphrase: "" // The passphrase for the wallet. Default value: empty string.
      }
    },
    mainnet: {
      url: urlData,
      chainId: chainData, // Only specify a chainId if we are not forking
      accounts: {
        mnemonic: process.env.MNEMONIC,
        path: "",
        initialIndex: 0, // The initial index to derive. Default value: 0.
        count: 20, // The number of accounts to derive. Default value: 20.
        passphrase: "" // The passphrase for the wallet. Default value: empty string.
      }
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.8.10"
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

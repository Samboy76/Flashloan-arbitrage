require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
/*let accounts;
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  accounts = await hre.ethers.getSigners()

  list of local accounts (by setting it to an array of hex-encoded private keys)

  for (const account of accounts) {
    console.log(account.address)
  }
})*/
task("funds", "Transfers 1000 ETH into MetaMask account", async () => {
  await network.provider.send("hardhat_setBalance", [
    process.env.METAMASK_ACCOUNT,
    //"0xDE0B6B3A7640000"
    "0x3635C9ADC5DEA00000"
  ]);
  console.log("Funds transferred to MetaMask account");
  // now MetaMask account has 1 ETH after this
});

// https://docs.avax.network/community/tutorials-contest/2022/local-subnet-development/hardhat.config.ts
// https://chainid.network/
// 2.12.2 hardhat installed version
//Add --chain-id param to node task https://github.com/NomicFoundation/hardhat/issues/2305
//chainId returns 31337 instead of '1' while forking mainnet https://github.com/NomicFoundation/hardhat/issues/2892
//Hardhat network always uses the chain id from your config, which defaults to 31337.
//We decided to do this, including when forking a network, as signing txs with another network's id is a security risk. 
//For example, a malicious test could steal your funds.
//If you really need to use the remote network's id, you should set it in your config.
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
//TODO - readup https://hardhat.org/hardhat-network/docs/guides/forking-other-networks
//TODO - readup https://ethereum.stackexchange.com/questions/112946/how-to-get-chainid-network-name-network-id-etc-in-hardhat
//ONGOING TODO switch to other node provider than getblock.io!
// Lookup https://www.alchemy.com/overviews/blockchain-node-providers
//
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
  //defaultNetwork: "localhost",
  networks: {
    hardhat: {},
    localhost: {
      url: urlData,
      //chainId: chainData,
      throwOnTransactionFailures: true, //  controls if Hardhat Network throws on transaction failures
      throwOnCallFailures: true, // controls if Hardhat Network throws on call failures
      forking: forkingData,
      //accounts: [`0x${process.env.HARDHAT_ACCOUNT0_PRIVATE_KEY}`]
      //accounts: [process.env.PRIVATE_KEY]
      accounts: {
        mnemonic: process.env.MNEMONIC,
        path: "m/44'/60'/0'/0", // HD parent of all the derived keys. Default value: "m/44'/60'/0'/0"
        initialIndex: 0, // The initial index to derive. Default value: 0.
        count: 20, // The number of accounts to derive. Default value: 20.
        passphrase: "" // The passphrase for the wallet. Default value: empty string.
      }
    },
    mainnet: {
      url: urlData,
      chainId: chainData, // Only specify a chainId if we are not forking
      //accounts: [`0x${process.env.HARDHAT_ACCOUNT0_PRIVATE_KEY}`]
      //accounts: [process.env.PRIVATE_KEY]
      accounts: {
        mnemonic: process.env.MNEMONIC,
        path: "m/44'/60'/0'/0", // HD parent of all the derived keys. Default value: "m/44'/60'/0'/0"
        initialIndex: 0, // The initial index to derive. Default value: 0.
        count: 20, // The number of accounts to derive. Default value: 20.
        passphrase: "" // The passphrase for the wallet. Default value: empty string.
      }
    }
  },
  //solidity: "0.8.17",
  solidity: {
    compilers: [
      {
        version: "0.8.10"
      }
      /*{
        version: "0.6.12"
      }*//*,
      {
        version: "0.7.0"
      },
      {
        version: "0.7.5"
      },
      {
        version: "0.7.6",
        settings: {}
      }*/
    ],
    /*overrides: {
      "contracts/IUniswapV2Router01.sol": {
        version: "0.5.0",
        settings: { }
      },
      "contracts/IUniswapV2Router02.sol": {
        version: "0.5.0",
        settings: { }
      },
      "contracts/IWeth.sol": {
        version: "0.5.0",
        settings: { }
      },
      "contracts/ISoloMargin.sol": {
        version: "0.5.7",
        settings: { }
      },
      "contracts/ICallee.sol": {
        version: "0.5.7",
        settings: { }
      },
      "contracts/Flashloan.sol": {
        version: "0.5.0",
        version: "0.6.6",
        version: "0.8.0",
        settings: { }
      },
      //"@studydefi/money-legos/src/dydx/contracts/DydxFlashloanBase.sol": {
      "contracts/DydxFlashloanBase.sol": {
          version: "0.5.7",
          version: "0.8.0",
        settings: { }
      }
    },*/
    settings: {
      optimizer: {
        /*enabled: true,
        runs: 200*/
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

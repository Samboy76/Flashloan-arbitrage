/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation, and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * https://trufflesuite.com/docs/truffle/reference/configuration
 * 
 * Hands-off deployment with Infura
 * --------------------------------
 *
 * Do you have a complex application that requires lots of transactions to deploy?
 * Use this appproach to make deployment a breeze 🏖️:
 *
 * Infura deployment needs a wallet provider (like @truffle/hdwallet-provider)
 * to sign transactions before they're sent to a remote public node. 
 * Infura accounts are available for free at 🔍: https://infura.io/register
 *
 * You'll need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. You can store your secrets 🤐 in a .env file. 
 * In your project root, run `$ npm install dotenv`. 
 * Create .env (which should be .gitignored) and declare your MNEMONIC 
 * and Infura PROJECT_ID variables inside.
 * For example, your .env file will have the following structure:
 * 
 * MNEMONIC = <Your 12 phrase mnemonic>
 * PROJECT_ID = <Your Infura project id>
 * 
 * Deployment with Truffle Dashboard (Recommended for best security practice)
 * --------------------------------------------------------------------------
 * 
 * Are you concerned about security and minimizing rekt status 🤔?
 * Use this method for best security:
 * 
 * Truffle Dashboard lets you review transactions in detail, and leverages 
 * MetaMask for signing, so there's no need to copy-paste your mnemonic. 
 * More details can be found at 🔎: 
 * 
 * https://trufflesuite.com/docs/truffle/getting-started/using-the-truffle-dashboard/
 */
/*require("ts-node").register({
  files: true,
});*/

require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
//const { INFURA_RINKEBY_KEY, INFURA_MAINNET_KEY, MNEMONIC, PRIVATE_KEY } = process.env;

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a managed Ganache instance for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache, geth, or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    // development: {
    //  host: "127.0.0.1",     // Localhost (default: none)
    //  port: 8545,            // Standard Ethereum port (default: none)
    //  network_id: "*",       // Any network (default: none)
    // },
    //
    // An additional network, but with some advanced options…
    // advanced: {
    //   port: 8777,             // Custom port
    //   network_id: 1342,       // Custom network
    //   gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
    //   gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
    //   from: <address>,        // Account to send transactions from (default: accounts[0])
    //   websocket: true         // Enable EventEmitter interface for web3 (default: false)
    // },
    //
    // Useful for deploying to a public network.
    // Note: It's important to wrap the provider as a function to ensure truffle uses a new provider every time.
    // goerli: {
    //   provider: () => new HDWalletProvider(MNEMONIC, `https://goerli.infura.io/v3/${PROJECT_ID}`),
    //   network_id: 5,       // Goerli's id
    //   confirmations: 2,    // # of confirmations to wait between deployments. (default: 0)
    //   timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    //   skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    // },
    //
    // Useful for private networks
    // private: {
    //   provider: () => new HDWalletProvider(MNEMONIC, `https://network.io`),
    //   network_id: 2111,   // This network is yours, in the cloud.
    //   production: true    // Treats this network as if it was a public net. (default: false)
    // }
    development: {
      host: "127.0.0.1",
      port: 7545, // connect with Ganache Ether client
      network_id: "*",
      //accounts: 5,
      //defaultEtherBalance: 500,
      //blockTime: 3
    },
    mainnet_fork: {
      host: "127.0.0.1",
      port: 8545, // connect with Ganache Ether client
      network_id: "*",
      gas: "6721975",           // Gas sent with each transaction (default: ~6700000)
      //gasPrice: 8000000000  // 20 gwei (in wei) (default: 100 gwei)
      //accounts: 5,
      //defaultEtherBalance: 500,
      //blockTime: 3
    },
    rinkeby: {
      provider: () => new HDWalletProvider(MNEMONIC, INFURA_API_KEY),
      network_id: 4,
      gas: 5500000 //make sure this gas allocation isn't over 4M, which is the max
    }
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: ">=0.5.0 <0.9.0",
      //version: "0.6.6",
      //"0.6.6",      // Fetch exact version from solc-bin (default: truffle's version)
      //version: "0.8.16",      // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium",
      // Optional: Debugging settings
      "debug": {
        // How to treat revert (and require) reason strings. Settings are
        // "default", "strip", "debug" and "verboseDebug".
        // "default" does not inject compiler-generated revert strings and keeps user-supplied ones.
        // "strip" removes all revert strings (if possible, i.e. if literals are used) keeping side-effects
        // "debug" injects strings for compiler-generated internal reverts, implemented for ABI encoders V1 and V2 for now.
        // "verboseDebug" even appends further information to user-supplied revert strings (not yet implemented)
        "revertStrings": "default",
        // Optional: How much extra debug information to include in comments in the produced EVM
        // assembly and Yul code. Available components are:
        // - `location`: Annotations of the form `@src <index>:<start>:<end>` indicating the
        //    location of the corresponding element in the original Solidity file, where:
        //     - `<index>` is the file index matching the `@use-src` annotation,
        //     - `<start>` is the index of the first byte at that location,
        //     - `<end>` is the index of the first byte after that location.
        // - `snippet`: A single-line code snippet from the location indicated by `@src`.
        //     The snippet is quoted and follows the corresponding `@src` annotation.
        // - `*`: Wildcard value that can be used to request everything.
        "debugInfo": ["location", "snippet"]
      },
      // }
    }
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows:
  // $ truffle migrate --reset --compile-all
  //
  // db: {
  //   enabled: false,
  //   host: "127.0.0.1",
  //   adapter: {
  //     name: "sqlite",
  //     settings: {
  //       directory: ".db"
  //     }
  //   }
  // }
};

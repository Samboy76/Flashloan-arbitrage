require("dotenv").config();
const { ethers, utils } = require('ethers');
const hre = require("hardhat");
const web3 = require('web3');
const fs = require('fs');
const path = require('path');
let { ChainId, TokenAmount, Fetcher } = require('@uniswap/sdk');
const { mainnet: addresses } = require('./addresses');
const fetch = require('cross-fetch');

const cryptoAccount = "0xCa5A01f83Cc8Ff9769416dcBE1E642d0044b5029";

const UniswapV2Factory = require("@uniswap/v2-core/build/IUniswapV2Factory.json");
const UniswapV2Pair = require("@uniswap/v2-core/build/IUniswapV2Pair.json");
const UniswapV2Router02 = require("@uniswap/v2-periphery/build/IUniswapV2Router02.json");
const Quoter = require("@uniswap/v3-periphery/artifacts/contracts/interfaces/IQuoter.sol/IQuoter.json");
const UniswapV3Factory = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Factory.sol/IUniswapV3Factory.json");
let poolFee;
const { hours } = require("@nomicfoundation/hardhat-network-helpers/dist/src/helpers/time/duration");

const Mutex = require('async-mutex').Mutex;
const Semaphore = require('async-mutex').Semaphore;
const withTimeout = require('async-mutex').withTimeout;

const mutex = new Mutex();
const delay = t => new Promise(resolve => setTimeout(resolve, t));

// MetaMask account address
const metaMaskAccount = web3.utils.toChecksumAddress(process.env.METAMASK_ACCOUNT);

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const ZERO_DATA = '0x';

// flag toggling between the various Chain networks
// 1 = Ethereum                 // ETH
// 2 = Polygon                  // POLY
// 3 = Avalanche                // AVAX (***NOT SUPPORTED BY UNISWAP V3***)
// 4 = Arbitrum (L2 Ethereum)   // ARB
// 5 = BSC                      // BSC (***NOT SUPPORTED BY AAVE V3 AND UNISWAP V3***)
const chainNetwork = 1; // IMPORTANT: align same chainNetwork/boolean values in scripts/deploy.js and hardhat.config.js!
//
//TODO - look into below EIP for simple replay attack protection for signed trx
//https://eips.ethereum.org/EIPS/eip-155
//
// Flashloan address
let flashLoanAddress;
let flashloanV2LibraryAddress;
if (chainNetwork == 1) { // Ethereum
  flashloanV2LibraryAddress = web3.utils.toChecksumAddress(process.env.FLASHLOANV2LIB_ETHEREUM);
  flashLoanAddress = web3.utils.toChecksumAddress(process.env.FLASHLOAN_ETHEREUM);
}
if (chainNetwork == 2) { // Polygon
  flashloanV2LibraryAddress = web3.utils.toChecksumAddress(process.env.FLASHLOANV2LIB_POLYGON);
  flashLoanAddress = web3.utils.toChecksumAddress(process.env.FLASHLOAN_POLYGON);
}
if (chainNetwork == 3) { // Avalanche
  flashloanV2LibraryAddress = web3.utils.toChecksumAddress(process.env.FLASHLOANV2LIB_AVALANCHE);
  flashLoanAddress = web3.utils.toChecksumAddress(process.env.FLASHLOAN_AVALANCHE);
}
if (chainNetwork == 4) { // Arbitrum
  flashloanV2LibraryAddress = web3.utils.toChecksumAddress(process.env.FLASHLOANV2LIB_ARBITRUM);
  flashLoanAddress = web3.utils.toChecksumAddress(process.env.FLASHLOAN_ARBITRUM);
}
if (chainNetwork == 5) { // BSC
  flashloanV2LibraryAddress = web3.utils.toChecksumAddress(process.env.FLASHLOANV2LIB_BSC);
  flashLoanAddress = web3.utils.toChecksumAddress(process.env.FLASHLOAN_BSC);
}

let provider;
let walletWithProvider;

// use your own Infura node in production
if (chainNetwork == 1) { // Ethereum - INFURA ENDPOINT
  //provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL_API_KEY);
  provider = new ethers.providers.InfuraProvider('homestead', process.env.INFURA_API_KEY);
  walletWithProvider = new ethers.Wallet(`0x${process.env.PRIVATE_KEY}`, provider);
}
if (chainNetwork == 2) { // Polygon
  //provider = new ethers.providers.InfuraProvider('matic', process.env.INFURA_API_KEY);
  provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_URL_API_KEY);
  walletWithProvider = new ethers.Wallet(`0x${process.env.PRIVATE_KEY}`, provider);
}
if (chainNetwork == 3) { // Avalanche
  provider = new ethers.providers.JsonRpcProvider(process.env.QUICKNODE_URL);
  walletWithProvider = new ethers.Wallet(`0x${process.env.PRIVATE_KEY}`, provider);
}
if (chainNetwork == 4) { // Arbitrum
  //provider = new ethers.providers.InfuraProvider('arbitrum', process.env.INFURA_API_KEY);
  provider = new ethers.providers.JsonRpcProvider(process.env.CHAINSTACK_URL_API_KEY);
  walletWithProvider = new ethers.Wallet(`0x${process.env.PRIVATE_KEY}`, provider);
}
if (chainNetwork == 5) { // BSC - QUICKNODE ENDPOINT
  provider = new ethers.providers.JsonRpcProvider(process.env.QUICKNODE_URL);
  walletWithProvider = new ethers.Wallet(`0x${process.env.PRIVATE_KEY}`, provider);
}
//console.log(provider);
//console.log(walletWithProvider);
// use your own QuickNode in production
/*const provider = new ethers.providers.JsonRpcProvider(process.env.QUICKNODE_URL);
const walletWithProvider = new ethers.Wallet(`0x${process.env.PRIVATE_KEY}`, provider);*/
/*provider.on('block', async (blockNumber) => {
  console.log(`New block received. Block # ${blockNumber}`);
});
return;*/
// ethers
//const signer = provider.getSigner();
const walletAddress = metaMaskAccount;
//const privateKey = process.env.PRIVATE_KEY;
const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC);
const signer = wallet.connect(provider); // Set the provider for the wallet
///
//console.log("provider           ", provider);
//console.log("walletWithProvider ", walletWithProvider);
///

const { hotTokensETH, selectedTokensETH, stablecoinsETH, tokensETH } = require('./utils/ethereum.js');
const { hotTokensPOLY, selectedTokensPOLY, stablecoinsPOLY, tokensPOLY } = require('./utils/polygon.js');
const { hotTokensBSC, selectedTokensBSC, stablecoinsBSC, tokensBSC } = require('./utils/BSC.js');
const { hotTokensAVAX, selectedTokensAVAX, stablecoinsAVAX, tokensAVAX } = require('./utils/avalanche.js');
const { hotTokensARB, selectedTokensARB, stablecoinsARB, tokensARB } = require('./utils/arbitrum.js');

//const spread = 25; // 0.25% min spread to yield a profit on a swap token pair
//It looks like any token that has a burning component to the transfer will require you 
//to increase your slippage percentage
//https://www.reddit.com/r/UniSwap/comments/ihtr6i/comment/gh4rvig/?utm_source=share&utm_medium=web2x&context=3
//
//Adjust slippage tolerance in Uniswap programatically
//https://ethereum.stackexchange.com/questions/93273/adjust-slippage-tolerance-in-uniswap-programatically
//const slippage = 1; // accepts min 1% slippage
// Function
const milliseconds = (h, m, s) => ((h*60*60+m*60+s)*1000);
// Usage
//TODO reinstate 3mins refresh in PROD
const TIME_REFRESH = milliseconds(0, 3, 0);
//const TIME_REFRESH = milliseconds(0, 0, 1);
const AMT_WEI = ethers.BigNumber.from(ethers.utils.parseUnits("1", 18)); // 1e18

//Top-10 Important Cryptocurrencies Other Than Bitcoin
//1. ETH
//2. USDT
//3. USDC
//4. BNB
//5. BUSD
//6. XRP
//7. ADA
//8. SOL
//9. DOGE
//10. Polkadot (DOT)
//const wethAddress = addresses.tokens.WETH;
let wethAddress;
( chainNetwork == 1 ? wethAddress = web3.utils.toChecksumAddress(addresses.ethereum.tokens.WETH) :
  chainNetwork == 2 ? wethAddress = web3.utils.toChecksumAddress(addresses.polygon.tokens.WETH) :
  chainNetwork == 3 ? wethAddress = web3.utils.toChecksumAddress(addresses.avalanche.tokens.WETH) :
  chainNetwork == 4 ? wethAddress = web3.utils.toChecksumAddress(addresses.arbitrum.tokens.WETH) :
  wethAddress = web3.utils.toChecksumAddress(addresses.BSC.tokens.WETH) );
//const AMT_WEI = ethers.BigNumber.from(ethers.utils.parseUnits("1", 10)); // $10k USDT
// "hot" will randomly pick out tokens from "hotTokens" array
// "stable" will randomly pick out tokens from "stablecoins" array
// "selected" will randomly pick out tokens from "selectedTokens" array
// "other" will randomly pick out tokens from "tokens" array
const tokenType = "selected";
const nearMiss = AMT_WEI.mul(999).div(1000); // -0.1% AMT_WEI

//  CHAIN NETWORKS
//
// Polygon DEX replacements:
//  Pancakeswap -> QuickSwap
//  Shibaswap -> DFYN Network
//  Sumswap -> MeerkatRouter (MM Finance Polygon)
//  Swapr -> Polycat
//  Swapsicle -> Jetswap
//  Unicly -> TetuSwap
//  Uniswap -> Gravity Finance
//  
// Avalanche DEX replacements:
//  Apeswap -> Trader Joe
//  Unicly -> Pangolin
//  Kwikswap -> Lydia
//  Oneinch -> HurricaneSwap
//  Orionprotocol -> HakuSwap
//  Pancakeswap -> Baguette
//  Safeswap -> YetiSwap
//  Sashimiswap -> Whaleswap
//  Shibaswap -> PartySwap
//  Sumswap -> Alligator
//
// BSC DEX replacements (use Uniswap flashloan provider):
// UniswapV2Factory 0x1EbE7dE4Ed27Bf6100286f7101A0f6F7084Dd59f
// UniswapV2Router02 0x8547e2E16783Fdc559C435fDc158d572D1bD0970
//  Elk -> Biswap
//  EmpireDEX -> MDEX
//  Kwikswap -> BabyDoge
//  Oneinch -> Nomiswap
//  Sashiswap -> Babyswap
//  Shibaswap -> SwapFish
//  Sumswap -> KnightSwap
//  Safeswap -> BakerySwap
//  Swapr -> Titano Swych
//  Swapsicle -> Fstswap
//  Unicly -> BSCswap
//  Yapeswap -> SoyFinance
//  Youswap -> Alita Finance
//
// Arbitrum DEX replacements (use Uniswap flashloan provider):
//  Uniswap V3 router 0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45 since V2 not existent in the chain
//  Apeswap -> SwapFish
//  Empire -> OreoSwap
//  Kwikswap -> WhaleSwap
//

var loadedPrices = [];

const DIRECTION = {
  "UNISWAP_TO_ONEINCH": 0,
  "ONEINCH_TO_UNISWAP": 1,
  "UNISWAP_TO_UNISWAP": 2,
  "UNISWAP_TO_0X": 3,
  "0X_TO_UNISWAP": 4
};

const { abi: IUniswapV3PoolABI } = require('@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json');
const { abi: QuoterABI } = require('@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json');
const { getAbi, getPoolImmutables } = require('./utils/helpers.js');

const { highTVLUniswapPoolAddresses } = require('./utils/uniswapV3pools.js');

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

// valid quoter for Ethereum, Polygon and Arbitrum
const quoterAddress = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6';

// getPrice fro UniswapV3Pool only works for below Blockchain Networks:
// 1 = Ethereum
// 2 = Polygon
// 4 = Arbitrum (L2 Ethereum)
const getUniswapPrice = async(inputAmount, tokenName, tokenAddress, tokenDecimals, logging) => {
  // https://info.uniswap.org/#/pools Home > Pools
  //const poolAddress = '0xCBCdF9626bC03E24f779434178A73a0B4bad62eD'; // WBTC/WETH 0.3% uniswapV3pool address on Ethereum
  let poolAddress;// https://info.uniswap.org/#/pools Home > Pools > WBTC/ETH 0.3%
  //const poolAddress = '0xCBCdF9626bC03E24f779434178A73a0B4bad62eD'; // WBTC/WETH 0.3% uniswapV3pool address on Ethereum
  const lookupAddress = highTVLUniswapPoolAddresses.filter(
                token => token.tokenpair.slice( 0, (token.tokenpair.indexOf("ETHxxx") + 6) ) == "ETHxxx" &&
                token.tokenpair.slice( (token.tokenpair.indexOf("ETHxxx") + 6), token.tokenpair.length ) == tokenName
  );

  let price = -1;
  if (lookupAddress.length > 0) {
    if (chainNetwork == 1 && (lookupAddress[0].network[0].ethereum === undefined || lookupAddress[0].network[0].ethereum === null))
      poolAddress = ZERO_ADDRESS;
    else if (chainNetwork == 2 && (lookupAddress[0].network[0].polygon === undefined || lookupAddress[0].network[0].polygon === null))
      poolAddress = ZERO_ADDRESS;
    else if (chainNetwork == 4 && (lookupAddress[0].network[0].arbitrum === undefined || lookupAddress[0].network[0].arbitrum === null))
      poolAddress = ZERO_ADDRESS;
    else if (chainNetwork == 1)
      poolAddress = lookupAddress[0].network[0].ethereum;
    else if (chainNetwork == 2)
      poolAddress = lookupAddress[0].network[0].polygon;
    else if (chainNetwork == 4)
      poolAddress = lookupAddress[0].network[0].arbitrum;
    else
      poolAddress = ZERO_ADDRESS;

    try {
      //console.log("s1");
      const poolContract = new ethers.Contract(
        poolAddress,
        IUniswapV3PoolABI,
        walletWithProvider
      );
      //console.log("s2");
      const tokenAddress0 = await poolContract.token0(); // OTHER
      const tokenAddress1 = await poolContract.token1(); // WETH
      /*
      console.log("tokenAddress0 ", tokenAddress0);
      console.log("tokenAddress1 ", tokenAddress1);
      console.log("s3");
      const network = (chainNetwork == 1 ? "etherscan" : 
                      chainNetwork == 2 ? "polygonscan" : 
                      chainNetwork == 3 ? "snowtrace" : 
                      chainNetwork == 4 ? "arbiscan" : 
                      "bscscan") ;
      const apiKey = (chainNetwork == 1 ? process.env.ETHERSCAN_API_KEY : 
                      chainNetwork == 2 ? process.env.POLYGONSCAN_API_KEY : 
                      chainNetwork == 3 ? "0x" : 
                      chainNetwork == 4 ? process.env.ARBISCAN_API_KEY : 
                      "0x") ;
      const extension = (chainNetwork == 1 ? "io" : 
                      chainNetwork == 2 ? "com" : 
                      chainNetwork == 3 ? "io" : 
                      chainNetwork == 4 ? "io" : 
                      "io") ;
      const tokenAbi0 = await getAbi(network, apiKey, extension, tokenAddress0);
      const tokenAbi1 = await getAbi(network, apiKey, extension, tokenAddress1);
      console.log("==================================================");
      console.log("tokenAbi0 ", tokenAbi0);
      console.log("==================================================");
      console.log("tokenAbi1 ", tokenAbi1);
      console.log("==================================================");
      console.log("s4");
      const tokenContract0 = new ethers.Contract(
        tokenAddress0,
        tokenAbi0,
        walletWithProvider
      );
      console.log("s5");
      const tokenContract1 = new ethers.Contract(
        tokenAddress1,
        tokenAbi1,
        walletWithProvider
      );
      console.log("s6");
      console.log("tokenName      ", tokenName);
      console.log("inputAmount    ", inputAmount);
      console.log("tokenContract1 ", tokenContract1.functions);
      */
      //Doesn´t retrieve the symbol nor decimals - revert to tokenarray instead!
      //
      const tokenSymbol0 = tokenName;//await tokenContract0.symbol();
      //console.log("s7");
      const tokenSymbol1 = "ETH";//await tokenContract1.symbol();
      //console.log("s8");
      const tokenDecimals0 = tokenDecimals;//await tokenContract0.decimals();
      //console.log("s9");
      const tokenDecimals1 = 18;//await tokenContract1.decimals();  // WETH
      /*console.log("s10");
      console.log("inputAmount    ", ethers.utils.parseUnits(
        1,
        tokenDecimals1
      ));*/
      const quoterContract = new ethers.Contract(
        quoterAddress,
        QuoterABI,
        walletWithProvider
      );
      //console.log("s11");
      const immutables = await getPoolImmutables(poolContract);
      //console.log("s12");
      const amountIn = inputAmount.toString();/*ethers.utils.parseUnits(
        inputAmount.toString(),
        //tokenDecimals0
        tokenDecimals1
      );*/
      //console.log("s13");
      const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
        immutables.token1,    // WETH
        immutables.token0,    // OTHER
        /*immutables.token0,
        immutables.token1,*/
        immutables.fee,
        amountIn,
        0
      );
      //console.log("s14");
      const amountOut = ethers.utils.formatUnits(
        quotedAmountOut.toString(),
        //tokenDecimals1
        tokenDecimals0
      );
      const inputAmountFormatted = ethers.utils.formatUnits(
        inputAmount.toString(),
        tokenDecimals1
      );
      //console.log("s15");
      if (logging) {
        console.log("=====================================================================");
        console.log(`${inputAmountFormatted} ${tokenSymbol1} can be swapped for ${amountOut} ${tokenSymbol0}`);
        console.log(`${amountIn} ${tokenSymbol1} can be swapped for ${quotedAmountOut} ${tokenSymbol0}`);
        console.log("=====================================================================");
      }
      price = quotedAmountOut;
      poolFee = immutables.fee;
    } catch (error) {
      //console.log(error);
      //price = 0;
    }
  } // if (lookupAddress.length > 0)

  //console.log(price);
  return price;
  //} // if (poolAddress != ZERO_ADDRESS)
}

//async () => {
//const uniswapV3Price = getUniswapPrice(1, "UNI"); // yields WETH amount based on 1 WBTC input amount
//console.log(uniswapV3Price);
//};
//return;
// chainId = 1; // Ethereum
// chainId = 56; // BSC
// chainId = 137; // Polygon
// chainId = 42161; // Arbitrum
// chainId = 43114; // Avalanche
let chainId;
//const chainId = 1; // Ethereum

// 1 = Ethereum                 // ETH
// 2 = Polygon                  // POLY
// 3 = Avalanche                // AVAX
// 4 = Arbitrum (L2 Ethereum)   // ARB
// 5 = BSC                      // BSC

(chainNetwork == 1 ? chainId = 1 : 
 chainNetwork == 2 ? chainId = 137 : 
 chainNetwork == 3 ? chainId = 43114: 
 chainNetwork == 4 ? chainId = 42161 : 
 chainId = 56);

const apiBaseUrl = 'https://api.1inch.io/v5.0/' + chainId;

function apiRequestUrl(methodName, queryParams) {
  return apiBaseUrl + methodName + '?' + (new URLSearchParams(queryParams)).toString();
}

async function buildTxForQuote(method, queryParams) {
  const url = apiRequestUrl(method, queryParams);
  return fetch(url).then(res => res.json()).then(res => res);
}

async function buildTxForSwap(method, queryParams) {
  const url = apiRequestUrl(method, queryParams);
  return fetch(url).then(res => res.json()).then(res => res.tx);
}

async function decodeSignature(baseURL, hash) {
  return await fetch(baseURL + hash)
      .then(res => res.json())
      .then(json => {
          return json.result.function[`${hash}`][0].name;
      });
}

const MultiCallAbi = '[{"inputs":[{"components":[{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct MultiCall.Call[]","name":"calls","type":"tuple[]"}],"name":"multicall","outputs":[{"internalType":"bytes[]","name":"results","type":"bytes[]"},{"internalType":"bool[]","name":"success","type":"bool[]"}],"stateMutability":"view","type":"function"}]';
const OffChainOracleAbi = '[{"inputs":[{"internalType":"contract MultiWrapper","name":"_multiWrapper","type":"address"},{"internalType":"contract IOracle[]","name":"existingOracles","type":"address[]"},{"internalType":"enum OffchainOracle.OracleType[]","name":"oracleTypes","type":"uint8[]"},{"internalType":"contract IERC20[]","name":"existingConnectors","type":"address[]"},{"internalType":"contract IERC20","name":"wBase","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract IERC20","name":"connector","type":"address"}],"name":"ConnectorAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract IERC20","name":"connector","type":"address"}],"name":"ConnectorRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract MultiWrapper","name":"multiWrapper","type":"address"}],"name":"MultiWrapperUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract IOracle","name":"oracle","type":"address"},{"indexed":false,"internalType":"enum OffchainOracle.OracleType","name":"oracleType","type":"uint8"}],"name":"OracleAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract IOracle","name":"oracle","type":"address"},{"indexed":false,"internalType":"enum OffchainOracle.OracleType","name":"oracleType","type":"uint8"}],"name":"OracleRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"contract IERC20","name":"connector","type":"address"}],"name":"addConnector","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IOracle","name":"oracle","type":"address"},{"internalType":"enum OffchainOracle.OracleType","name":"oracleKind","type":"uint8"}],"name":"addOracle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"connectors","outputs":[{"internalType":"contract IERC20[]","name":"allConnectors","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"srcToken","type":"address"},{"internalType":"contract IERC20","name":"dstToken","type":"address"},{"internalType":"bool","name":"useWrappers","type":"bool"}],"name":"getRate","outputs":[{"internalType":"uint256","name":"weightedRate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"srcToken","type":"address"},{"internalType":"bool","name":"useSrcWrappers","type":"bool"}],"name":"getRateToEth","outputs":[{"internalType":"uint256","name":"weightedRate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"multiWrapper","outputs":[{"internalType":"contract MultiWrapper","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"oracles","outputs":[{"internalType":"contract IOracle[]","name":"allOracles","type":"address[]"},{"internalType":"enum OffchainOracle.OracleType[]","name":"oracleTypes","type":"uint8[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"connector","type":"address"}],"name":"removeConnector","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IOracle","name":"oracle","type":"address"},{"internalType":"enum OffchainOracle.OracleType","name":"oracleKind","type":"uint8"}],"name":"removeOracle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract MultiWrapper","name":"_multiWrapper","type":"address"}],"name":"setMultiWrapper","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]';
const offChainOracleAddress = '0x07D91f5fb9Bf7798734C3f606dB065549F6893bb';
let offChainOracleContract;

let flashLoan;
let multiCallContract;
let offchainPrice;
let uniRouter;
let uniswapFactory;
let uniswapEthOther;
let sushiRouter;
let sushiFactory;
let sushiEthOther;
let pancakeRouter;
let pancakeFactory;
let pancakeEthOther;
let apeRouter;
let apeFactory;
let apeEthOther;
let fraxRouter;
let fraxFactory;
let fraxEthOther;
let shibaRouter;
let shibaFactory;
let shibaEthOther;
let swaprRouter;
let swaprFactory;
let swaprEthOther;
let radioShackRouter;
let radioShackFactory;
let radioShackEthOther;
let uniclyRouter;
let uniclyFactory;
let uniclyEthOther;
let sashimiRouter;
let sashimiFactory;
let sashimiEthOther;
let orionRouter;
let orionFactory;
let orionEthOther;
let elkRouter;
let elkFactory;
let elkEthOther;
/*let defiRouter;
let defiFactory;
let defiEthOther;*/
let empireRouter;
let empireFactory;
let empireEthOther;
let sicleRouter;
let sicleFactory;
let sicleEthOther;
let youRouter;
let youFactory;
let youEthOther;
let sumRouter;
let sumFactory;
let sumEthOther;
let kwikRouter;
let kwikFactory;
let kwikEthOther;
let safeRouter;
let safeFactory;
let safeEthOther;
let yapeRouter;
let yapeFactory;
let yapeEthOther;
let uniswapV3Router;
let uniswapV3Factory;
let uniswapV3EthOther;

async function loadContracts() {
  //const Flashloan = await hre.ethers.getContractFactory("Flashloan");
  const Flashloan = await hre.ethers.getContractFactory("Flashloan", {
    libraries: {
      FlashloanV2Library: flashloanV2LibraryAddress
    },
  });
  flashLoan = Flashloan.attach(flashLoanAddress);

  // 1inch spotprice aggregator contract
  multiCallContract = new ethers.Contract(
    web3.utils.toChecksumAddress('0xda3c19c6fe954576707fa24695efb830d9cca1ca'),
    MultiCallAbi,
    walletWithProvider
  );

  if (chainNetwork == 1 || chainNetwork == 2 || chainNetwork == 4) {
    uniswapV3Router = new ethers.Contract(
      //web3.utils.toChecksumAddress(addresses.uniswap.router), //uniswap v2 router
      ( chainNetwork == 1 ? web3.utils.toChecksumAddress(addresses.ethereum.routers.uniswapv3.quoter) :
        chainNetwork == 2 ? web3.utils.toChecksumAddress(addresses.polygon.routers.uniswapv3.quoter) :
        chainNetwork == 4 ? web3.utils.toChecksumAddress(addresses.arbitrum.routers.uniswapv3.quoter) :
        ZERO_ADDRESS ),
      Quoter.abi,
      walletWithProvider
    );
  }

  uniRouter = new ethers.Contract(
    //web3.utils.toChecksumAddress(addresses.uniswap.router), //uniswap v2 router
    ( chainNetwork == 1 ? web3.utils.toChecksumAddress(addresses.ethereum.routers.uniswap.router) :
      chainNetwork == 2 ? web3.utils.toChecksumAddress(addresses.polygon.routers.uniswap.router) :
      chainNetwork == 3 ? web3.utils.toChecksumAddress(addresses.avalanche.routers.uniswap.router) :
      chainNetwork == 4 ? web3.utils.toChecksumAddress(addresses.arbitrum.routers.uniswap.router) :
      web3.utils.toChecksumAddress(addresses.BSC.routers.uniswap.router) ),
		UniswapV2Router02.abi,
		walletWithProvider
	);

  sushiRouter = new ethers.Contract(
    //web3.utils.toChecksumAddress(addresses.sushiswap.router), //sushiswap v2 router (TVL $404.85m)
    ( chainNetwork == 1 ? web3.utils.toChecksumAddress(addresses.ethereum.routers.sushiswap.router) :
      chainNetwork == 2 ? web3.utils.toChecksumAddress(addresses.polygon.routers.sushiswap.router) :
      chainNetwork == 3 ? web3.utils.toChecksumAddress(addresses.avalanche.routers.sushiswap.router) :
      chainNetwork == 4 ? web3.utils.toChecksumAddress(addresses.arbitrum.routers.sushiswap.router) :
      web3.utils.toChecksumAddress(addresses.BSC.routers.sushiswap.router) ),
		UniswapV2Router02.abi,
		walletWithProvider
	);

  pancakeRouter = new ethers.Contract(
    //web3.utils.toChecksumAddress(addresses.pancakeswap.router), //pancakeswap v2 router (TVL $2.76b)
    ( chainNetwork == 1 ? web3.utils.toChecksumAddress(addresses.ethereum.routers.pancakeswap.router) :
      chainNetwork == 2 ? web3.utils.toChecksumAddress(addresses.polygon.routers.pancakeswap.router) :
      chainNetwork == 3 ? web3.utils.toChecksumAddress(addresses.avalanche.routers.pancakeswap.router) :
      chainNetwork == 4 ? web3.utils.toChecksumAddress(addresses.arbitrum.routers.pancakeswap.router) :
      web3.utils.toChecksumAddress(addresses.BSC.routers.pancakeswap.router) ),
		UniswapV2Router02.abi,
		walletWithProvider
	);

  fraxRouter = new ethers.Contract(
    //web3.utils.toChecksumAddress(addresses.fraxswap.router), //fraxswap v2 router (TVL $60.47m)
    ( chainNetwork == 1 ? web3.utils.toChecksumAddress(addresses.ethereum.routers.fraxswap.router) :
      chainNetwork == 2 ? web3.utils.toChecksumAddress(addresses.polygon.routers.fraxswap.router) :
      chainNetwork == 3 ? web3.utils.toChecksumAddress(addresses.avalanche.routers.fraxswap.router) :
      chainNetwork == 4 ? web3.utils.toChecksumAddress(addresses.arbitrum.routers.fraxswap.router) :
      web3.utils.toChecksumAddress(addresses.BSC.routers.fraxswap.router) ),
		UniswapV2Router02.abi,
		walletWithProvider
	);

  apeRouter = new ethers.Contract(
    //web3.utils.toChecksumAddress(addresses.apeswap.router), //apeswap v2 router (TVL $46.81m)
    ( chainNetwork == 1 ? web3.utils.toChecksumAddress(addresses.ethereum.routers.apeswap.router) :
      chainNetwork == 2 ? web3.utils.toChecksumAddress(addresses.polygon.routers.apeswap.router) :
      chainNetwork == 3 ? web3.utils.toChecksumAddress(addresses.avalanche.routers.apeswap.router) :
      chainNetwork == 4 ? web3.utils.toChecksumAddress(addresses.arbitrum.routers.apeswap.router) :
      web3.utils.toChecksumAddress(addresses.BSC.routers.apeswap.router) ),
		UniswapV2Router02.abi,
		walletWithProvider
	);

  shibaRouter = new ethers.Contract(
    //web3.utils.toChecksumAddress(addresses.shibaswap.router), //shibaswap v2 router (TVL $26.83m)
    ( chainNetwork == 1 ? web3.utils.toChecksumAddress(addresses.ethereum.routers.shibaswap.router) :
      chainNetwork == 2 ? web3.utils.toChecksumAddress(addresses.polygon.routers.shibaswap.router) :
      chainNetwork == 3 ? web3.utils.toChecksumAddress(addresses.avalanche.routers.shibaswap.router) :
      chainNetwork == 4 ? web3.utils.toChecksumAddress(addresses.arbitrum.routers.shibaswap.router) :
      web3.utils.toChecksumAddress(addresses.BSC.routers.shibaswap.router) ),
		UniswapV2Router02.abi,
		walletWithProvider
	);

  swaprRouter = new ethers.Contract(
    //web3.utils.toChecksumAddress(addresses.swapr.router), //swapr v2 router (TVL $10.77m)
    ( chainNetwork == 1 ? web3.utils.toChecksumAddress(addresses.ethereum.routers.swapr.router) :
      chainNetwork == 2 ? web3.utils.toChecksumAddress(addresses.polygon.routers.swapr.router) :
      chainNetwork == 3 ? web3.utils.toChecksumAddress(addresses.avalanche.routers.swapr.router) :
      chainNetwork == 4 ? web3.utils.toChecksumAddress(addresses.arbitrum.routers.swapr.router) :
      web3.utils.toChecksumAddress(addresses.BSC.routers.swapr.router) ),
		UniswapV2Router02.abi,
		walletWithProvider
	);

  radioShackRouter = new ethers.Contract(
    //web3.utils.toChecksumAddress(addresses.radioshack.router), //radioShack v2 router (TVL $6.2m)
    ( chainNetwork == 1 ? web3.utils.toChecksumAddress(addresses.ethereum.routers.radioshack.router) :
      chainNetwork == 2 ? web3.utils.toChecksumAddress(addresses.polygon.routers.radioshack.router) :
      chainNetwork == 3 ? web3.utils.toChecksumAddress(addresses.avalanche.routers.radioshack.router) :
      chainNetwork == 4 ? web3.utils.toChecksumAddress(addresses.arbitrum.routers.radioshack.router) :
      web3.utils.toChecksumAddress(addresses.BSC.routers.radioshack.router) ),
		UniswapV2Router02.abi,
		walletWithProvider
	);

  uniclyRouter = new ethers.Contract(
    //web3.utils.toChecksumAddress(addresses.unicly.router), //unicly v2 router (TVL $1.3m)
    ( chainNetwork == 1 ? web3.utils.toChecksumAddress(addresses.ethereum.routers.unicly.router) :
      chainNetwork == 2 ? web3.utils.toChecksumAddress(addresses.polygon.routers.unicly.router) :
      chainNetwork == 3 ? web3.utils.toChecksumAddress(addresses.avalanche.routers.unicly.router) :
      chainNetwork == 4 ? web3.utils.toChecksumAddress(addresses.arbitrum.routers.unicly.router) :
      web3.utils.toChecksumAddress(addresses.BSC.routers.unicly.router) ),
		UniswapV2Router02.abi,
		walletWithProvider
	);

  sashimiRouter = new ethers.Contract(
    //web3.utils.toChecksumAddress(addresses.sashimi.router), //sashimiswap v2 router
    ( chainNetwork == 1 ? web3.utils.toChecksumAddress(addresses.ethereum.routers.sashimiswap.router) :
      chainNetwork == 2 ? web3.utils.toChecksumAddress(addresses.polygon.routers.sashimiswap.router) :
      chainNetwork == 3 ? web3.utils.toChecksumAddress(addresses.avalanche.routers.sashimiswap.router) :
      chainNetwork == 4 ? web3.utils.toChecksumAddress(addresses.arbitrum.routers.sashimiswap.router) :
      web3.utils.toChecksumAddress(addresses.BSC.routers.sashimiswap.router) ),
		UniswapV2Router02.abi,
		walletWithProvider
	);

  orionRouter = new ethers.Contract(
    //web3.utils.toChecksumAddress(addresses.orion.router), //orionprotocol v2 router
    ( chainNetwork == 1 ? web3.utils.toChecksumAddress(addresses.ethereum.routers.orionprotocol.router) :
      chainNetwork == 2 ? web3.utils.toChecksumAddress(addresses.polygon.routers.orionprotocol.router) :
      chainNetwork == 3 ? web3.utils.toChecksumAddress(addresses.avalanche.routers.orionprotocol.router) :
      chainNetwork == 4 ? web3.utils.toChecksumAddress(addresses.arbitrum.routers.orionprotocol.router) :
      web3.utils.toChecksumAddress(addresses.BSC.routers.orionprotocol.router) ),
		UniswapV2Router02.abi,
		walletWithProvider
	);

  elkRouter = new ethers.Contract(
    //web3.utils.toChecksumAddress(addresses.elk.router), //elk v2 router
    ( chainNetwork == 1 ? web3.utils.toChecksumAddress(addresses.ethereum.routers.elk.router) :
      chainNetwork == 2 ? web3.utils.toChecksumAddress(addresses.polygon.routers.elk.router) :
      chainNetwork == 3 ? web3.utils.toChecksumAddress(addresses.avalanche.routers.elk.router) :
      chainNetwork == 4 ? web3.utils.toChecksumAddress(addresses.arbitrum.routers.elk.router) :
      web3.utils.toChecksumAddress(addresses.BSC.routers.elk.router) ),
		UniswapV2Router02.abi,
		walletWithProvider
	);

  /*defiRouter = new ethers.Contract(
    //web3.utils.toChecksumAddress(addresses.defi.router), //defiswap v2 router
    ( chainNetwork == 1 ? web3.utils.toChecksumAddress(addresses.ethereum.routers.) :
      chainNetwork == 2 ? web3.utils.toChecksumAddress(addresses.polygon.routers.elk) :
      chainNetwork == 3 ? web3.utils.toChecksumAddress(addresses.avalanche.routers.elk) :
      chainNetwork == 4 ? web3.utils.toChecksumAddress(addresses.arbitrum.routers.elk) :
      web3.utils.toChecksumAddress(addresses.BSC.routers.elk) ),
		UniswapV2Router02.abi,
		walletWithProvider
	);*/

  empireRouter = new ethers.Contract(
    //web3.utils.toChecksumAddress(addresses.empire.router), //empire v2 router
    ( chainNetwork == 1 ? web3.utils.toChecksumAddress(addresses.ethereum.routers.empire.router) :
      chainNetwork == 2 ? web3.utils.toChecksumAddress(addresses.polygon.routers.empire.router) :
      chainNetwork == 3 ? web3.utils.toChecksumAddress(addresses.avalanche.routers.empire.router) :
      chainNetwork == 4 ? web3.utils.toChecksumAddress(addresses.arbitrum.routers.empire.router) :
      web3.utils.toChecksumAddress(addresses.BSC.routers.empire.router) ),
		UniswapV2Router02.abi,
		walletWithProvider
	);

  sicleRouter = new ethers.Contract(
    //web3.utils.toChecksumAddress(addresses.sicle.router), //swapsicle v2 router
    ( chainNetwork == 1 ? web3.utils.toChecksumAddress(addresses.ethereum.routers.swapsicle.router) :
      chainNetwork == 2 ? web3.utils.toChecksumAddress(addresses.polygon.routers.swapsicle.router) :
      chainNetwork == 3 ? web3.utils.toChecksumAddress(addresses.avalanche.routers.swapsicle.router) :
      chainNetwork == 4 ? web3.utils.toChecksumAddress(addresses.arbitrum.routers.swapsicle.router) :
      web3.utils.toChecksumAddress(addresses.BSC.routers.swapsicle.router) ),
		UniswapV2Router02.abi,
		walletWithProvider
	);

  youRouter = new ethers.Contract(
    //web3.utils.toChecksumAddress(addresses.you.router), //youswap v2 router
    ( chainNetwork == 1 ? web3.utils.toChecksumAddress(addresses.ethereum.routers.youswap.router) :
      chainNetwork == 2 ? web3.utils.toChecksumAddress(addresses.polygon.routers.youswap.router) :
      chainNetwork == 3 ? web3.utils.toChecksumAddress(addresses.avalanche.routers.youswap.router) :
      chainNetwork == 4 ? web3.utils.toChecksumAddress(addresses.arbitrum.routers.youswap.router) :
      web3.utils.toChecksumAddress(addresses.BSC.routers.youswap.router) ),
		UniswapV2Router02.abi,
		walletWithProvider
	);

  sumRouter = new ethers.Contract(
    //web3.utils.toChecksumAddress(addresses.sum.router), //sumswap v2 router
    ( chainNetwork == 1 ? web3.utils.toChecksumAddress(addresses.ethereum.routers.sumswap.router) :
      chainNetwork == 2 ? web3.utils.toChecksumAddress(addresses.polygon.routers.sumswap.router) :
      chainNetwork == 3 ? web3.utils.toChecksumAddress(addresses.avalanche.routers.sumswap.router) :
      chainNetwork == 4 ? web3.utils.toChecksumAddress(addresses.arbitrum.routers.sumswap.router) :
      web3.utils.toChecksumAddress(addresses.BSC.routers.sumswap.router) ),
		UniswapV2Router02.abi,
		walletWithProvider
	);

  kwikRouter = new ethers.Contract(
    //web3.utils.toChecksumAddress(addresses.kwik.router), //kwikswap v2 router
    ( chainNetwork == 1 ? web3.utils.toChecksumAddress(addresses.ethereum.routers.kwikswap.router) :
      chainNetwork == 2 ? web3.utils.toChecksumAddress(addresses.polygon.routers.kwikswap.router) :
      chainNetwork == 3 ? web3.utils.toChecksumAddress(addresses.avalanche.routers.kwikswap.router) :
      chainNetwork == 4 ? web3.utils.toChecksumAddress(addresses.arbitrum.routers.kwikswap.router) :
      web3.utils.toChecksumAddress(addresses.BSC.routers.kwikswap.router) ),
		UniswapV2Router02.abi,
		walletWithProvider
	);

  safeRouter = new ethers.Contract(
    //web3.utils.toChecksumAddress(addresses.safe.router), //safeswap v2 router
    ( chainNetwork == 1 ? web3.utils.toChecksumAddress(addresses.ethereum.routers.safeswap.router) :
      chainNetwork == 2 ? web3.utils.toChecksumAddress(addresses.polygon.routers.safeswap.router) :
      chainNetwork == 3 ? web3.utils.toChecksumAddress(addresses.avalanche.routers.safeswap.router) :
      chainNetwork == 4 ? web3.utils.toChecksumAddress(addresses.arbitrum.routers.safeswap.router) :
      web3.utils.toChecksumAddress(addresses.BSC.routers.safeswap.router) ),
		UniswapV2Router02.abi,
		walletWithProvider
	);

  yapeRouter = new ethers.Contract(
    //web3.utils.toChecksumAddress(addresses.yape.router), //yapeswap v2 router
    ( chainNetwork == 1 ? web3.utils.toChecksumAddress(addresses.ethereum.routers.yapeswap.router) :
      chainNetwork == 2 ? web3.utils.toChecksumAddress(addresses.polygon.routers.yapeswap.router) :
      chainNetwork == 3 ? web3.utils.toChecksumAddress(addresses.avalanche.routers.yapeswap.router) :
      chainNetwork == 4 ? web3.utils.toChecksumAddress(addresses.arbitrum.routers.yapeswap.router) :
      web3.utils.toChecksumAddress(addresses.BSC.routers.yapeswap.router) ),
		UniswapV2Router02.abi,
		walletWithProvider
	);

  try {
    if (uniswapV3Router.address != ZERO_ADDRESS) {
      uniswapV3Factory = new ethers.Contract(
        web3.utils.toChecksumAddress(await uniswapV3Router.factory()),
        UniswapV3Factory.abi,
        walletWithProvider
      );
    } else {
      uniswapV3Factory = null;
    }
  } catch (error) {
    uniswapV3Factory = null;
  }

  try {
    if (uniRouter.address != ZERO_ADDRESS) {
      uniswapFactory = new ethers.Contract(
        web3.utils.toChecksumAddress(await uniRouter.factory()), // uniswap v2 factory
        UniswapV2Factory.abi,
        walletWithProvider
      );  
    } else {
      uniswapFactory = null;
    }
  } catch (error) {
    uniswapFactory = null;
  }
  
  try {
    if (sushiRouter.address != ZERO_ADDRESS) {
      sushiFactory = new ethers.Contract(
        web3.utils.toChecksumAddress(await sushiRouter.factory()), // sushiswap v2 factory
        UniswapV2Factory.abi,
        walletWithProvider
      );
    } else {
      sushiFactory = null;
    }
  } catch (error) {
    sushiFactory = null;
  }
  
  try {
    if (pancakeRouter.address != ZERO_ADDRESS) {
      pancakeFactory = new ethers.Contract(
        web3.utils.toChecksumAddress(await pancakeRouter.factory()), // pancakeswap v2 factory
        UniswapV2Factory.abi,
        walletWithProvider
      );
    } else {
      pancakeFactory = null;
    }
  } catch (error) {
    pancakeFactory = null;
  }
  
  try {
    if (fraxRouter.address != ZERO_ADDRESS) {
      fraxFactory = new ethers.Contract(
        web3.utils.toChecksumAddress(await fraxRouter.factory()), // fraxswap v2 factory
        UniswapV2Factory.abi,
        walletWithProvider
      );
    } else {
      fraxFactory = null;
    }
  } catch (error) {
    fraxFactory = null;
  }
  
  try {
    if (apeRouter.address != ZERO_ADDRESS) {
      apeFactory = new ethers.Contract(
        web3.utils.toChecksumAddress(await apeRouter.factory()), // apeswap v2 factory
        UniswapV2Factory.abi,
        walletWithProvider
      );
    } else {
      apeFactory = null;
    }
  } catch (error) {
    apeFactory = null;
  }
  
  try {
    if (shibaRouter.address != ZERO_ADDRESS) {
      shibaFactory = new ethers.Contract(
        web3.utils.toChecksumAddress(await shibaRouter.factory()), // apeswap v2 factory
        UniswapV2Factory.abi,
        walletWithProvider
      );
    } else {
      shibaFactory = null;
    }
  } catch (error) {
    shibaFactory = null;
  }
  
  try {
    if (swaprRouter.address != ZERO_ADDRESS) {
      swaprFactory = new ethers.Contract(
        web3.utils.toChecksumAddress(await swaprRouter.factory()), // swapr v2 factory
        UniswapV2Factory.abi,
        walletWithProvider
      );
    } else {
      swaprFactory = null;
    }
  } catch (error) {
    swaprFactory = null;
  }
  
  try {
    if (radioShackRouter.address != ZERO_ADDRESS) {
      radioShackFactory = new ethers.Contract(
        web3.utils.toChecksumAddress(await radioShackRouter.factory()), // radioShack v2 factory
        UniswapV2Factory.abi,
        walletWithProvider
      );
    } else {
      radioShackFactory = null;
    }
  } catch (error) {
    radioShackFactory = null;
  }
  
  try {
    if (uniclyRouter.address != ZERO_ADDRESS) {
      uniclyFactory = new ethers.Contract(
        web3.utils.toChecksumAddress(await uniclyRouter.factory()), // unicly v2 factory
        UniswapV2Factory.abi,
        walletWithProvider
      );
    } else {
      uniclyFactory = null;
    }
  } catch (error) {
    uniclyFactory = null;
  }
  
  try {
    if (sashimiRouter.address != ZERO_ADDRESS) {
      sashimiFactory = new ethers.Contract(
        web3.utils.toChecksumAddress(await sashimiRouter.factory()), // sashimi v2 factory
        UniswapV2Factory.abi,
        walletWithProvider
      );
    } else {
      sashimiFactory = null;
    }
  } catch (error) {
    sashimiFactory = null;
  }
  
  try {
    if (orionRouter.address != ZERO_ADDRESS) {
      orionFactory = new ethers.Contract(
        web3.utils.toChecksumAddress(await orionRouter.factory()), // orion v2 factory
        UniswapV2Factory.abi,
        walletWithProvider
      );
    } else {
      orionFactory = null;
    }
  } catch (error) {
    orionFactory = null;
  }
  
  try {
    if (elkRouter.address != ZERO_ADDRESS) {
      elkFactory = new ethers.Contract(
        web3.utils.toChecksumAddress(await elkRouter.factory()), // elk v2 factory
        UniswapV2Factory.abi,
        walletWithProvider
      );
    } else {
      elkFactory = null;
    }
  } catch (error) {
    elkFactory = null;
  }
  
  /*defiFactory = new ethers.Contract(
    web3.utils.toChecksumAddress(await defiRouter.factory()), // defiswap v2 factory
    UniswapV2Factory.abi,
    walletWithProvider
  );*/
  try {
    if (empireRouter.address != ZERO_ADDRESS) {
      empireFactory = new ethers.Contract(
        web3.utils.toChecksumAddress(await empireRouter.factory()), // empire v2 factory
        UniswapV2Factory.abi,
        walletWithProvider
      );
    } else {
      empireFactory = null;
    }
  } catch (error) {
    empireFactory = null;
  }
  
  try {
    if (sicleRouter.address != ZERO_ADDRESS) {
      sicleFactory = new ethers.Contract(
        web3.utils.toChecksumAddress(await sicleRouter.factory()), // swapsicle v2 factory
        UniswapV2Factory.abi,
        walletWithProvider
      );
    } else {
      sicleFactory = null;
    }
  } catch (error) {
    sicleFactory = null;
  }
  
  try {
    if (youRouter.address != ZERO_ADDRESS) {
      youFactory = new ethers.Contract(
        web3.utils.toChecksumAddress(await youRouter.factory()), // youswap v2 factory
        UniswapV2Factory.abi,
        walletWithProvider
      );
    } else {
      youFactory = null;
    }
  } catch (error) {
    youFactory = null;
  }
  
  try {
    if (sumRouter.address != ZERO_ADDRESS) {
      sumFactory = new ethers.Contract(
        web3.utils.toChecksumAddress(await sumRouter.factory()), // sumswap v2 factory
        UniswapV2Factory.abi,
        walletWithProvider
      );
    } else {
      sumFactory = null;
    }
  } catch (error) {
    sumFactory = null;
  }
  
  try {
    if (kwikRouter.address != ZERO_ADDRESS) {
      kwikFactory = new ethers.Contract(
        web3.utils.toChecksumAddress(await kwikRouter.factory()), // kwikswap v2 factory
        UniswapV2Factory.abi,
        walletWithProvider
      );
    } else {
      kwikFactory = null;
    }
  } catch (error) {
    kwikFactory = null;
  }
  
  try {
    if (safeRouter.address != ZERO_ADDRESS) {
      safeFactory = new ethers.Contract(
        web3.utils.toChecksumAddress(await safeRouter.factory()), // safeswap v2 factory
        UniswapV2Factory.abi,
        walletWithProvider
      );
    } else {
      safeFactory = null;
    }
  } catch (error) {
    safeFactory = null;
  }
  
  try {
    if (yapeRouter.address != ZERO_ADDRESS) {
      yapeFactory = new ethers.Contract(
        web3.utils.toChecksumAddress(await yapeRouter.factory()), // yapeswap v2 factory
        UniswapV2Factory.abi,
        walletWithProvider
      );
    } else {
      yapeFactory = null;
    }
  } catch (error) {
    yapeFactory = null;
  }

  offChainOracleContract = new ethers.Contract(
    web3.utils.toChecksumAddress(offChainOracleAddress),
    OffChainOracleAbi,
    walletWithProvider
  );
}

async function getPrice(pair) {
  const reserves = await pair.functions.getReserves();
  const amountIn = ethers.BigNumber.from(AMT_WEI.toString());
  const amountInWithFee = amountIn.mul(997);
  const numerator = amountInWithFee.mul(reserves[0]);
  const denominator = reserves[1].mul(1000).add(amountInWithFee);
  const amountOut = numerator.div(denominator);

  return amountOut;
}

async function loadPrices(tokenName, tokenAddress, tokenDecimals) {
  // Search for token in "loadedPrices" array
  var prices = new Array(19).fill(-1);
  let uniPair;
  let sushiPair;
  let pancakePair;
  let fraxPair;
  let apePair;
  let shibaPair;
  let swaprPair;
  let radioPair;
  let uniclyPair;
  let sashimiPair;
  let orionPair;
  let elkPair;
  let defiPair;
  let empirePair;
  let siclePair;
  let youPair;
  let sumPair;
  let kwikPair;
  let safePair;
  let yapePair;

  let allFileContents;
  let inTokenSection = false;
  let readTokenName;
  let readExchangeName;
  
  await delay(Math.random() * 500);
  // First, load the prices from the FileSystem into the array if it´s empty...
  let fileName;
  ( chainNetwork == 1 ? fileName = 'marketPrices_Ethereum.txt' :
    chainNetwork == 2 ? fileName = 'marketPrices_Polygon.txt' :
    chainNetwork == 3 ? fileName = 'marketPrices_Avalanche.txt' :
    chainNetwork == 4 ? fileName = 'marketPrices_Arbitrum.txt' :
    fileName = 'marketPrices_BSC.txt' );

  allFileContents = fs.readFileSync(fileName, 'utf-8');
  if (allFileContents.length > 0) {
    loadedPrices = [];
    allFileContents.split(/\r?\n/).forEach(line =>  {
      if (line.includes("token=") || inTokenSection) {
        if (!inTokenSection) {
          readTokenName = line.slice( (line.indexOf("token=") + 6), line.length );
          inTokenSection = true;
        }
        if (line.includes("token=")) {
          loadedPrices.push(
            {
              token: readTokenName,
              exchange: [],
              lastUpdated: "-1"
            }
          );
        }
      }
      if (line.includes("swap=")) {
        readExchangeName = line.slice( 0, (line.indexOf("=")) );
        (((loadedPrices.filter(el => el.token == readTokenName))[0]).exchange).push(
          {
            name: line.slice( 0, (line.indexOf("=")) ),
            type: "FORK",
            router: ( (line.slice( 0, (line.indexOf("=")) ) == "V3Uniswap") ? 
                      ( chainNetwork == 1 ? addresses.ethereum.routers.uniswapv3.router :
                        chainNetwork == 2 ? addresses.polygon.routers.uniswapv3.router :
                        chainNetwork == 4 ? addresses.arbitrum.routers.uniswapv3.router :
                        ZERO_ADDRESS ) : 
                      (line.slice( 0, (line.indexOf("=")) ) == "V2Uniswap") ? 
                      //addresses.uniswap.router 
                      ( chainNetwork == 1 ? addresses.ethereum.routers.uniswap.router :
                        chainNetwork == 2 ? addresses.polygon.routers.uniswap.router :
                        chainNetwork == 3 ? addresses.avalanche.routers.uniswap.router :
                        chainNetwork == 4 ? addresses.arbitrum.routers.uniswap.router :
                        addresses.BSC.routers.uniswap.router ) : 
                      (line.slice( 0, (line.indexOf("=")) ) == "Sushiswap") ? 
                      //addresses.sushiswap.router : 
                      ( chainNetwork == 1 ? addresses.ethereum.routers.sushiswap.router :
                        chainNetwork == 2 ? addresses.polygon.routers.sushiswap.router :
                        chainNetwork == 3 ? addresses.avalanche.routers.sushiswap.router :
                        chainNetwork == 4 ? addresses.arbitrum.routers.sushiswap.router :
                        addresses.BSC.routers.sushiswap.router ) :
                      (line.slice( 0, (line.indexOf("=")) ) == "Pancakeswap") ? 
                      //addresses.pancakeswap.router : 
                      ( chainNetwork == 1 ? addresses.ethereum.routers.pancakeswap.router :
                        chainNetwork == 2 ? addresses.polygon.routers.pancakeswap.router :
                        chainNetwork == 3 ? addresses.avalanche.routers.pancakeswap.router :
                        chainNetwork == 4 ? addresses.arbitrum.routers.pancakeswap.router :
                        addresses.BSC.routers.pancakeswap.router ) :
                      (line.slice( 0, (line.indexOf("=")) ) == "Fraxswap") ? 
                      //addresses.fraxswap.router : 
                      ( chainNetwork == 1 ? addresses.ethereum.routers.fraxswap.router :
                        chainNetwork == 2 ? addresses.polygon.routers.fraxswap.router :
                        chainNetwork == 3 ? addresses.avalanche.routers.fraxswap.router :
                        chainNetwork == 4 ? addresses.arbitrum.routers.fraxswap.router :
                        addresses.BSC.routers.fraxswap.router ) :
                      (line.slice( 0, (line.indexOf("=")) ) == "Apeswap") ? 
                      //addresses.apeswap.router : 
                      ( chainNetwork == 1 ? addresses.ethereum.routers.apeswap.router :
                        chainNetwork == 2 ? addresses.polygon.routers.apeswap.router :
                        chainNetwork == 3 ? addresses.avalanche.routers.apeswap.router :
                        chainNetwork == 4 ? addresses.arbitrum.routers.apeswap.router :
                        addresses.BSC.routers.apeswap.router ) :
                      (line.slice( 0, (line.indexOf("=")) ) == "Shibaswap") ? 
                      //addresses.shibaswap.router : 
                      ( chainNetwork == 1 ? addresses.ethereum.routers.shibaswap.router :
                        chainNetwork == 2 ? addresses.polygon.routers.shibaswap.router :
                        chainNetwork == 3 ? addresses.avalanche.routers.shibaswap.router :
                        chainNetwork == 4 ? addresses.arbitrum.routers.shibaswap.router :
                        addresses.BSC.routers.shibaswap.router ) :
                      (line.slice( 0, (line.indexOf("=")) ) == "Swaprswap") ? 
                      //addresses.swapr.router : 
                      ( chainNetwork == 1 ? addresses.ethereum.routers.swapr.router :
                        chainNetwork == 2 ? addresses.polygon.routers.swapr.router :
                        chainNetwork == 3 ? addresses.avalanche.routers.swapr.router :
                        chainNetwork == 4 ? addresses.arbitrum.routers.swapr.router :
                        addresses.BSC.routers.swapr.router ) :
                      (line.slice( 0, (line.indexOf("=")) ) == "Radioshackswap") ? 
                      //addresses.radioshack.router : 
                      ( chainNetwork == 1 ? addresses.ethereum.routers.radioshack.router :
                        chainNetwork == 2 ? addresses.polygon.routers.radioshack.router :
                        chainNetwork == 3 ? addresses.avalanche.routers.radioshack.router :
                        chainNetwork == 4 ? addresses.arbitrum.routers.radioshack.router :
                        addresses.BSC.routers.radioshack.router ) :
                      (line.slice( 0, (line.indexOf("=")) ) == "Uniclyswap") ? 
                      //addresses.unicly.router : 
                      ( chainNetwork == 1 ? addresses.ethereum.routers.unicly.router :
                        chainNetwork == 2 ? addresses.polygon.routers.unicly.router :
                        chainNetwork == 3 ? addresses.avalanche.routers.unicly.router :
                        chainNetwork == 4 ? addresses.arbitrum.routers.unicly.router :
                        addresses.BSC.routers.unicly.router ) :
                      (line.slice( 0, (line.indexOf("=")) ) == "Orionswap") ? 
                      //addresses.orion.router : 
                      ( chainNetwork == 1 ? addresses.ethereum.routers.orionprotocol.router :
                        chainNetwork == 2 ? addresses.polygon.routers.orionprotocol.router :
                        chainNetwork == 3 ? addresses.avalanche.routers.orionprotocol.router :
                        chainNetwork == 4 ? addresses.arbitrum.routers.orionprotocol.router :
                        addresses.BSC.routers.orionprotocol.router ) :
                      (line.slice( 0, (line.indexOf("=")) ) == "Elkswap") ? 
                      //addresses.elk.router : 
                      ( chainNetwork == 1 ? addresses.ethereum.routers.elk.router :
                        chainNetwork == 2 ? addresses.polygon.routers.elk.router :
                        chainNetwork == 3 ? addresses.avalanche.routers.elk.router :
                        chainNetwork == 4 ? addresses.arbitrum.routers.elk.router :
                        addresses.BSC.routers.elk.router ) :
                      /*(line.slice( 0, (line.indexOf("=")) ) == "Defiswap") ? 
                      addresses.defi.router : */
                      (line.slice( 0, (line.indexOf("=")) ) == "Empireswap") ? 
                      //addresses.empire.router : 
                      ( chainNetwork == 1 ? addresses.ethereum.routers.empire.router :
                        chainNetwork == 2 ? addresses.polygon.routers.empire.router :
                        chainNetwork == 3 ? addresses.avalanche.routers.empire.router :
                        chainNetwork == 4 ? addresses.arbitrum.routers.empire.router :
                        addresses.BSC.routers.empire.router ) :
                      (line.slice( 0, (line.indexOf("=")) ) == "Sicleswap") ? 
                      //addresses.sicle.router : 
                      ( chainNetwork == 1 ? addresses.ethereum.routers.swapsicle.router :
                        chainNetwork == 2 ? addresses.polygon.routers.swapsicle.router :
                        chainNetwork == 3 ? addresses.avalanche.routers.swapsicle.router :
                        chainNetwork == 4 ? addresses.arbitrum.routers.swapsicle.router :
                        addresses.BSC.routers.swapsicle.router ) :
                      (line.slice( 0, (line.indexOf("=")) ) == "Youswap") ? 
                      //addresses.you.router : 
                      ( chainNetwork == 1 ? addresses.ethereum.routers.youswap.router :
                        chainNetwork == 2 ? addresses.polygon.routers.youswap.router :
                        chainNetwork == 3 ? addresses.avalanche.routers.youswap.router :
                        chainNetwork == 4 ? addresses.arbitrum.routers.youswap.router :
                        addresses.BSC.routers.youswap.router ) :
                      (line.slice( 0, (line.indexOf("=")) ) == "Sumswap") ? 
                      //addresses.sum.router : 
                      ( chainNetwork == 1 ? addresses.ethereum.routers.sumswap.router :
                        chainNetwork == 2 ? addresses.polygon.routers.sumswap.router :
                        chainNetwork == 3 ? addresses.avalanche.routers.sumswap.router :
                        chainNetwork == 4 ? addresses.arbitrum.routers.sumswap.router :
                        addresses.BSC.routers.sumswap.router ) :
                      (line.slice( 0, (line.indexOf("=")) ) == "Kwikswap") ? 
                      //addresses.kwik.router : 
                      ( chainNetwork == 1 ? addresses.ethereum.routers.kwikswap.router :
                        chainNetwork == 2 ? addresses.polygon.routers.kwikswap.router :
                        chainNetwork == 3 ? addresses.avalanche.routers.kwikswap.router :
                        chainNetwork == 4 ? addresses.arbitrum.routers.kwikswap.router :
                        addresses.BSC.routers.kwikswap.router ) :
                      (line.slice( 0, (line.indexOf("=")) ) == "Safeswap") ? 
                      //addresses.safe.router : 
                      ( chainNetwork == 1 ? addresses.ethereum.routers.safeswap.router :
                        chainNetwork == 2 ? addresses.polygon.routers.safeswap.router :
                        chainNetwork == 3 ? addresses.avalanche.routers.safeswap.router :
                        chainNetwork == 4 ? addresses.arbitrum.routers.safeswap.router :
                        addresses.BSC.routers.safeswap.router ) :
                      (line.slice( 0, (line.indexOf("=")) ) == "Yapeswap") ? 
                      //addresses.yape.router : "-1")
                      ( chainNetwork == 1 ? addresses.ethereum.routers.yapeswap.router :
                        chainNetwork == 2 ? addresses.polygon.routers.yapeswap.router :
                        chainNetwork == 3 ? addresses.avalanche.routers.yapeswap.router :
                        chainNetwork == 4 ? addresses.arbitrum.routers.yapeswap.router :
                        addresses.BSC.routers.safeswap.router ) : true),
            price: ethers.BigNumber.from(line.slice( (line.indexOf("=") + 1), line.length) ),
            receivedAmount: ethers.BigNumber.from("-1")
            }
          );
      }
      if (line.includes("receivedAmount=")) {
        ((loadedPrices.filter(el => el.token == readTokenName)[0]).exchange.filter(el => el.name == readExchangeName)[0]).receivedAmount = ethers.BigNumber.from(line.slice( (line.indexOf("receivedAmount=") + 15), line.length));
      }
      if (line.includes("lastRcvdAmtUpdated=")) {
        ((loadedPrices.filter(el => el.token == readTokenName)[0]).exchange.filter(el => el.name == readExchangeName)[0]).lastRcvdAmtUpdated = line.slice( (line.indexOf("lastRcvdAmtUpdated=") + 19), line.length);
      }
      if (line.includes("lastUpdated=")) {
        (loadedPrices.filter(el => el.token == readTokenName)[0]).lastUpdated = line.slice( (line.indexOf("lastUpdated=") + 12), line.length);
      }
      if (line.includes("</" + readTokenName + ">")) {
        inTokenSection = false;
      }
    });

    // Remove duplicate tokens from the array, just in case there are any...
    loadedPrices = loadedPrices.reduce((acc, current) => {
      const x = acc.find(item => item.token === current.token);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
  } // end if (allFileContents.length > 0)

  await delay(Math.random() * 500);
  const foundToken = loadedPrices.filter(el => el.token == tokenName);
  let loadFlag = "0";
  if (foundToken.length > 0) {
    if ( ethers.BigNumber.from(Date.now()).gt(ethers.BigNumber.from(foundToken[0].lastUpdated).add(TIME_REFRESH)) ) {
      loadFlag = "2";
    } else {
      loadFlag = "3";
    }
  } else {
    loadFlag = "1";
  } // end if (foundToken.length > 0)

  await delay(Math.random() * 500);
  if (loadFlag == "1" || loadFlag == "2") {
    try {
      if ( uniswapFactory == null || (uniPair = (await uniswapFactory.functions.getPair(tokenAddress, wethAddress))[0] ) === ZERO_ADDRESS)
        uniswapEthOther = null;
      else {
        uniswapEthOther = new ethers.Contract(
          uniPair,
          UniswapV2Pair.abi,
          walletWithProvider
        );
        prices[0] = await getPrice(uniswapEthOther);
        //console.log("uniswapPrice    ", prices[0]);
      }
    } catch (error) {
      uniswapEthOther = null;
    }

    try {
      if ( sushiFactory == null || (sushiPair = (await sushiFactory.functions.getPair(tokenAddress, wethAddress))[0] ) === ZERO_ADDRESS)
        sushiEthOther = null;
      else {
        sushiEthOther = new ethers.Contract(
          sushiPair,
          UniswapV2Pair.abi,
          walletWithProvider
        );
        prices[1] = await getPrice(sushiEthOther);
        //console.log("sushiPrice      ", prices[1]);
      }
    } catch (error) {
      sushiEthOther = null;
    }

    try {
      if ( pancakeFactory == null || (pancakePair = (await pancakeFactory.functions.getPair(tokenAddress, wethAddress))[0] ) === ZERO_ADDRESS)
        pancakeEthOther = null;
      else {
        pancakeEthOther = new ethers.Contract(
          pancakePair,
          UniswapV2Pair.abi,
          walletWithProvider
        );
        prices[2] = await getPrice(pancakeEthOther);
        //console.log("pancakePrice    ", prices[2]);
      }
    } catch (error) {
      pancakeEthOther = null;
    }

    try {
      if ( fraxFactory == null || (fraxPair = (await fraxFactory.functions.getPair(tokenAddress, wethAddress))[0] ) === ZERO_ADDRESS)
        fraxEthOther = null;
      else {
        fraxEthOther = new ethers.Contract(
          fraxPair,
          UniswapV2Pair.abi,
          walletWithProvider
        );
        prices[3] = await getPrice(fraxEthOther);
        //console.log("fraxPrice       ", prices[3]);
      }
    } catch (error) {
      fraxEthOther = null;
    }

    try {
      if ( apeFactory == null || (apePair = (await apeFactory.functions.getPair(tokenAddress, wethAddress))[0] ) === ZERO_ADDRESS)
        apeEthOther = null;
      else {
        apeEthOther = new ethers.Contract(
          apePair,
          UniswapV2Pair.abi,
          walletWithProvider
        );
        prices[4] = await getPrice(apeEthOther);
        //console.log("apePrice        ", prices[4]);
      }
    } catch (error) {
      apeEthOther = null;
    }

    try {
      if ( shibaFactory == null || (shibaPair = (await shibaFactory.functions.getPair(tokenAddress, wethAddress))[0] ) === ZERO_ADDRESS)
        shibaEthOther = null;
      else {
        shibaEthOther = new ethers.Contract(
          shibaPair,
          UniswapV2Pair.abi,
          walletWithProvider
        );
        prices[5] = await getPrice(shibaEthOther);
        //console.log("shibaPrice      ", prices[5]);
      }
    } catch (error) {
      shibaEthOther = null;
    }

    try {
      if ( swaprFactory == null || (swaprPair = (await swaprFactory.functions.getPair(tokenAddress, wethAddress))[0] ) === ZERO_ADDRESS)
        swaprEthOther = null;
      else {
        swaprEthOther = new ethers.Contract(
          swaprPair,
          UniswapV2Pair.abi,
          walletWithProvider
        );
        prices[6] = await getPrice(swaprEthOther);
        //console.log("swaprPrice      ", prices[6]);
      }
    } catch (error) {
      swaprEthOther = null;
    }

    try {
      if ( radioShackFactory == null || (radioPair = (await radioShackFactory.functions.getPair(tokenAddress, wethAddress))[0] ) === ZERO_ADDRESS)
        radioShackEthOther = null;
      else {
        radioShackEthOther = new ethers.Contract(
          radioPair,
          UniswapV2Pair.abi,
          walletWithProvider
        );
        prices[7] = await getPrice(radioShackEthOther);
        //console.log("radioShackPrice ", prices[7]);
      }
    } catch (error) {
      radioShackEthOther = null;
    }

    try {
      if ( uniclyFactory == null || (uniclyPair = (await uniclyFactory.functions.getPair(tokenAddress, wethAddress))[0] ) === ZERO_ADDRESS)
        uniclyEthOther = null;
      else {
        uniclyEthOther = new ethers.Contract(
          uniclyPair,
          UniswapV2Pair.abi,
          walletWithProvider
        );
        prices[8] = await getPrice(uniclyEthOther);
        //console.log("uniclyPrice     ", prices[8]);
      }
    } catch (error) {
      uniclyEthOther = null;
    }

    /*if ( (sashimiPair = (await sashimiFactory.functions.getPair(tokenAddress, wethAddress))[0] ) === ZERO_ADDRESS)
      sashimiEthOther = null;
    else {
      sashimiEthOther = new ethers.Contract(
        sashimiPair,
        UniswapV2Pair.abi,
        walletWithProvider
      );
      sashimiPrice = await getPrice(sashimiEthOther);
      //console.log("sashimiPrice    ", sashimiPrice);
    }*/

    try {
      if ( orionFactory == null || (orionPair = (await orionFactory.functions.getPair(tokenAddress, wethAddress))[0] ) === ZERO_ADDRESS)
        orionEthOther = null;
      else {
        orionEthOther = new ethers.Contract(
          orionPair,
          UniswapV2Pair.abi,
          walletWithProvider
        );
        prices[9] = await getPrice(orionEthOther);
        //console.log("orionPrice      ", prices[9]);
      }
    } catch (error) {
      orionEthOther = null;
    }

    try {
      if ( elkFactory == null || (elkPair = (await elkFactory.functions.getPair(tokenAddress, wethAddress))[0] ) === ZERO_ADDRESS)
        elkEthOther = null;
      else {
        elkEthOther = new ethers.Contract(
          elkPair,
          UniswapV2Pair.abi,
          walletWithProvider
        );
        prices[10] = await getPrice(elkEthOther);
        //console.log("elkPrice        ", prices[10]);
      }
    } catch (error) {
      elkEthOther = null;
    }

    /*if ( (defiPair = (await defiFactory.functions.getPair(tokenAddress, wethAddress))[0] ) === ZERO_ADDRESS)
      defiEthOther = null;
    else {
      defiEthOther = new ethers.Contract(
        defiPair,
        UniswapV2Pair.abi,
        walletWithProvider
      );
      prices[11] = await getPrice(defiEthOther);
      //console.log("defiPrice       ", prices[11]);
    }*/

    try {
      if ( empireFactory == null || (empirePair = (await empireFactory.functions.getPair(tokenAddress, wethAddress))[0] ) === ZERO_ADDRESS)
        empireEthOther = null;
      else {
        empireEthOther = new ethers.Contract(
          empirePair,
          UniswapV2Pair.abi,
          walletWithProvider
        );
        prices[11] = await getPrice(empireEthOther);
        //console.log("empirePrice     ", prices[12]);
      }
    } catch (error) {
      empireEthOther = null;
    }

    try {
      if ( sicleFactory == null || (siclePair = (await sicleFactory.functions.getPair(tokenAddress, wethAddress))[0] ) === ZERO_ADDRESS)
        sicleEthOther = null;
      else {
        sicleEthOther = new ethers.Contract(
          siclePair,
          UniswapV2Pair.abi,
          walletWithProvider
        );
        prices[12] = await getPrice(sicleEthOther);
        //console.log("siclePrice      ", prices[13]);
      }
    } catch (error) {
      sicleEthOther = null;
    }

    try {
      if ( youFactory == null || (youPair = (await youFactory.functions.getPair(tokenAddress, wethAddress))[0] ) === ZERO_ADDRESS)
        youEthOther = null;
      else {
        youEthOther = new ethers.Contract(
          youPair,
          UniswapV2Pair.abi,
          walletWithProvider
        );
        prices[13] = await getPrice(youEthOther);
        //console.log("youPrice        ", prices[14]);
      }
    } catch (error) {
      youEthOther = null;
    }

    try {
      if ( sumFactory == null || (sumPair = (await sumFactory.functions.getPair(tokenAddress, wethAddress))[0] ) === ZERO_ADDRESS)
        sumEthOther = null;
      else {
        sumEthOther = new ethers.Contract(
          sumPair,
          UniswapV2Pair.abi,
          walletWithProvider
        );
        prices[14] = await getPrice(sumEthOther);
        //console.log("sumPrice        ", prices[15]);
      }
    } catch (error) {
      sumEthOther = null;
    }

    try {
      if ( kwikFactory == null || (kwikPair = (await kwikFactory.functions.getPair(tokenAddress, wethAddress))[0] ) === ZERO_ADDRESS)
        kwikEthOther = null;
      else {
        kwikEthOther = new ethers.Contract(
          kwikPair,
          UniswapV2Pair.abi,
          walletWithProvider
        );
        prices[15] = await getPrice(kwikEthOther);
        //console.log("kwikPrice       ", prices[16]);
      }
    } catch (error) {
      kwikEthOther = null;
    }

    try {
      if ( safeFactory == null || (safePair = (await safeFactory.functions.getPair(tokenAddress, wethAddress))[0] ) === ZERO_ADDRESS)
        safeEthOther = null;
      else {
        safeEthOther = new ethers.Contract(
          safePair,
          UniswapV2Pair.abi,
          walletWithProvider
        );
        prices[16] = await getPrice(safeEthOther);
        //console.log("safePrice       ", prices[17]);
      }
    } catch (error) {
      safeEthOther = null;
    }

    try {
      if ( yapeFactory == null || (yapePair = (await yapeFactory.functions.getPair(tokenAddress, wethAddress))[0] ) === ZERO_ADDRESS)
        yapeEthOther = null;
      else {
        yapeEthOther = new ethers.Contract(
          yapePair,
          UniswapV2Pair.abi,
          walletWithProvider
        );
        prices[17] = await getPrice(yapeEthOther);
        //console.log("yapePrice       ", prices[18]);
      }
    } catch (error) {
      yapeEthOther = null;
    }

    const logging = false;
    try {
      if ( chainNetwork != 1 && chainNetwork != 2 && chainNetwork != 4)
        prices[18] = -1;
      else {
        prices[18] = await getUniswapPrice(AMT_WEI, tokenName, tokenAddress, tokenDecimals, logging);

        if (logging)
          console.log("uniswapV3Price ", prices[18]);
      }
    } catch (error) {
      prices[18] = -1;
    }
  } // end if (loadFlag == "1" || loadFlag == "2")

  await delay(Math.random() * 500);
  if (foundToken.length > 0) {
    // Reload with new prices if already loaded prices in the array supersedes "TIME_REFRESH" refresh period
    if ( ethers.BigNumber.from(Date.now()).gt(ethers.BigNumber.from(foundToken[0].lastUpdated).add(TIME_REFRESH)) ) {
      ((loadedPrices.filter(el => el.token == tokenName)[0]).exchange.filter(el => el.name == 'V3Uniswap')[0]).price = prices[18];
      ((loadedPrices.filter(el => el.token == tokenName)[0]).exchange.filter(el => el.name == 'V2Uniswap')[0]).price = prices[0];
      ((loadedPrices.filter(el => el.token == tokenName)[0]).exchange.filter(el => el.name == 'Sushiswap')[0]).price = prices[1];
      ((loadedPrices.filter(el => el.token == tokenName)[0]).exchange.filter(el => el.name == 'Pancakeswap')[0]).price = prices[2];
      ((loadedPrices.filter(el => el.token == tokenName)[0]).exchange.filter(el => el.name == 'Fraxswap')[0]).price = prices[3];
      ((loadedPrices.filter(el => el.token == tokenName)[0]).exchange.filter(el => el.name == 'Apeswap')[0]).price = prices[4];
      ((loadedPrices.filter(el => el.token == tokenName)[0]).exchange.filter(el => el.name == 'Shibaswap')[0]).price = prices[5];
      ((loadedPrices.filter(el => el.token == tokenName)[0]).exchange.filter(el => el.name == 'Swaprswap')[0]).price = prices[6];
      ((loadedPrices.filter(el => el.token == tokenName)[0]).exchange.filter(el => el.name == 'Radioshackswap')[0]).price = prices[7];
      ((loadedPrices.filter(el => el.token == tokenName)[0]).exchange.filter(el => el.name == 'Uniclyswap')[0]).price = prices[8];
      ((loadedPrices.filter(el => el.token == tokenName)[0]).exchange.filter(el => el.name == 'Orionswap')[0]).price = prices[9];
      ((loadedPrices.filter(el => el.token == tokenName)[0]).exchange.filter(el => el.name == 'Elkswap')[0]).price = prices[10];
      //((loadedPrices.filter(el => el.token == tokenName)[0]).exchange.filter(el => el.name == 'Defiswap')[0]).price = prices[11];
      ((loadedPrices.filter(el => el.token == tokenName)[0]).exchange.filter(el => el.name == 'Empireswap')[0]).price = prices[11];
      ((loadedPrices.filter(el => el.token == tokenName)[0]).exchange.filter(el => el.name == 'Sicleswap')[0]).price = prices[12];
      ((loadedPrices.filter(el => el.token == tokenName)[0]).exchange.filter(el => el.name == 'Youswap')[0]).price = prices[13];
      ((loadedPrices.filter(el => el.token == tokenName)[0]).exchange.filter(el => el.name == 'Sumswap')[0]).price = prices[14];
      ((loadedPrices.filter(el => el.token == tokenName)[0]).exchange.filter(el => el.name == 'Kwikswap')[0]).price = prices[15];
      ((loadedPrices.filter(el => el.token == tokenName)[0]).exchange.filter(el => el.name == 'Safeswap')[0]).price = prices[16];
      ((loadedPrices.filter(el => el.token == tokenName)[0]).exchange.filter(el => el.name == 'Yapeswap')[0]).price = prices[17];
      (loadedPrices.filter(el => el.token == tokenName)[0]).lastUpdated = Date.now();

      // Remove duplicate tokens from the array, just in case there are any...
      loadedPrices = loadedPrices.reduce((acc, current) => {
        const x = acc.find(item => item.token === current.token);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

      // Copy existing data into temp variable "NEWDATA"
      let NEWDATA = "";
      let foundTokenFlag = false;
      inTokenSection = false;
      let count = 0;

      //allFileContents = fs.readFileSync('marketPrices.txt', 'utf-8');
      allFileContents = fs.readFileSync(fileName, 'utf-8');
      allFileContents.split(/\r?\n/).forEach(line =>  {
        if (line.includes("token=") || inTokenSection) {
          if (!inTokenSection) {
            readTokenName = line.slice( (line.indexOf("token=") + 6), line.length );
            inTokenSection = true;
          }
          if (line.includes("token=")) {
            if (line.includes(tokenName)) {
              foundTokenFlag = true;
            }
            NEWDATA += line + "\n";
          }
        }
        if (line.includes("swap=")) {
          if (foundTokenFlag) {
            NEWDATA += line.slice( 0, line.indexOf("=") + 1) + prices[count++].toString() + "\n";
          }
          else
            NEWDATA += line + "\n";
        }
        if (line.includes("lastUpdated=")) {
          if (foundTokenFlag) {
            NEWDATA += line.slice( 0, line.indexOf("=") + 1) + (loadedPrices.filter(el => el.token == readTokenName)[0]).lastUpdated + "\n";
          }
          else
            NEWDATA += line + "\n";
        }
        if (line.includes("receivedAmount=")) {
          NEWDATA += line + "\n";
        }
        if (line.includes("lastRcvdAmtUpdated=")) {
          NEWDATA += line + "\n";
        }
        if (line.includes("</" + readTokenName + ">")) {
          NEWDATA += line + "\n";
          inTokenSection = false;
          foundTokenFlag = false;
          count = 0;
        }
      });

      fs.writeFileSync(fileName, NEWDATA, {encoding:'utf8',flag:'w'}, err => {
        if (err) {
          throw err;
        }
      });
    } // if (Date.now() > (foundToken[0].lastUpdated + TIME_REFRESH) )
  } else {
    // Push "new" token prices into array and FileSystem
    loadedPrices.push(
      {
        token: tokenName,
        exchange: [
          { name: 'V3Uniswap', type: "FORK", 
          router: 
          ( chainNetwork == 1 ? addresses.ethereum.routers.uniswapv3.router :
            chainNetwork == 2 ? addresses.polygon.routers.uniswapv3.router :
            chainNetwork == 4 ? addresses.arbitrum.routers.uniswapv3.router :
            ZERO_ADDRESS ),
          price: prices[18], receivedAmount: ethers.BigNumber.from("-1"), lastRcvdAmtUpdated: "-1" },
          {  name: 'V2Uniswap', type: "FORK", 
          router: 
          //addresses.uniswap.router, 
          ( chainNetwork == 1 ? addresses.ethereum.routers.uniswap.router :
            chainNetwork == 2 ? addresses.polygon.routers.uniswap.router :
            chainNetwork == 3 ? addresses.avalanche.routers.uniswap.router :
            chainNetwork == 4 ? addresses.arbitrum.routers.uniswap.router :
            addresses.BSC.routers.uniswap.router ),
          price: prices[0], receivedAmount: ethers.BigNumber.from("-1"), lastRcvdAmtUpdated: "-1" },
          { name: 'Sushiswap', type: "FORK", 
          router: 
          //addresses.sushiswap.router, 
          ( chainNetwork == 1 ? addresses.ethereum.routers.sushiswap.router :
            chainNetwork == 2 ? addresses.polygon.routers.sushiswap.router :
            chainNetwork == 3 ? addresses.avalanche.routers.sushiswap.router :
            chainNetwork == 4 ? addresses.arbitrum.routers.sushiswap.router :
            addresses.BSC.routers.sushiswap.router ),
          price: prices[1], receivedAmount: ethers.BigNumber.from("-1"), lastRcvdAmtUpdated: "-1" },
          { name: 'Pancakeswap', type: "FORK", 
          router: 
          //addresses.pancakeswap.router,
          ( chainNetwork == 1 ? addresses.ethereum.routers.pancakeswap.router :
            chainNetwork == 2 ? addresses.polygon.routers.pancakeswap.router :
            chainNetwork == 3 ? addresses.avalanche.routers.pancakeswap.router :
            chainNetwork == 4 ? addresses.arbitrum.routers.pancakeswap.router :
            addresses.BSC.routers.pancakeswap.router ), 
          price: prices[2], receivedAmount: ethers.BigNumber.from("-1"), lastRcvdAmtUpdated: "-1" },
          { name: 'Fraxswap', type: "FORK", 
          router: 
          //addresses.fraxswap.router, 
          ( chainNetwork == 1 ? addresses.ethereum.routers.fraxswap.router :
            chainNetwork == 2 ? addresses.polygon.routers.fraxswap.router :
            chainNetwork == 3 ? addresses.avalanche.routers.fraxswap.router :
            chainNetwork == 4 ? addresses.arbitrum.routers.fraxswap.router :
            addresses.BSC.routers.fraxswap.router ),
          price: prices[3], receivedAmount: ethers.BigNumber.from("-1"), lastRcvdAmtUpdated: "-1" },
          { name: 'Apeswap', type: "FORK", 
          router: 
          //addresses.apeswap.router, 
          ( chainNetwork == 1 ? addresses.ethereum.routers.apeswap.router :
            chainNetwork == 2 ? addresses.polygon.routers.apeswap.router :
            chainNetwork == 3 ? addresses.avalanche.routers.apeswap.router :
            chainNetwork == 4 ? addresses.arbitrum.routers.apeswap.router :
            addresses.BSC.routers.apeswap.router ),
          price: prices[4], receivedAmount: ethers.BigNumber.from("-1"), lastRcvdAmtUpdated: "-1" },
          { name: 'Shibaswap', type: "FORK", 
          router: 
          //addresses.shibaswap.router, 
          ( chainNetwork == 1 ? addresses.ethereum.routers.shibaswap.router :
            chainNetwork == 2 ? addresses.polygon.routers.shibaswap.router :
            chainNetwork == 3 ? addresses.avalanche.routers.shibaswap.router :
            chainNetwork == 4 ? addresses.arbitrum.routers.shibaswap.router :
            addresses.BSC.routers.shibaswap.router ),
          price: prices[5], receivedAmount: ethers.BigNumber.from("-1"), lastRcvdAmtUpdated: "-1" },
          { name: 'Swaprswap', type: "FORK", 
          router: 
          //addresses.swapr.router, 
          ( chainNetwork == 1 ? addresses.ethereum.routers.swapr.router :
            chainNetwork == 2 ? addresses.polygon.routers.swapr.router :
            chainNetwork == 3 ? addresses.avalanche.routers.swapr.router :
            chainNetwork == 4 ? addresses.arbitrum.routers.swapr.router :
            addresses.BSC.routers.swapr.router ),
          price: prices[6], receivedAmount: ethers.BigNumber.from("-1"), lastRcvdAmtUpdated: "-1" },
          { name: 'Radioshackswap', type: "FORK", 
          router: 
          //addresses.radioshack.router, 
          ( chainNetwork == 1 ? addresses.ethereum.routers.radioshack.router :
            chainNetwork == 2 ? addresses.polygon.routers.radioshack.router :
            chainNetwork == 3 ? addresses.avalanche.routers.radioshack.router :
            chainNetwork == 4 ? addresses.arbitrum.routers.radioshack.router :
            addresses.BSC.routers.radioshack.router ),
          price: prices[7], receivedAmount: ethers.BigNumber.from("-1"), lastRcvdAmtUpdated: "-1" },
          { name: 'Uniclyswap', type: "FORK", 
          router: 
          //addresses.unicly.router, 
          ( chainNetwork == 1 ? addresses.ethereum.routers.unicly.router :
            chainNetwork == 2 ? addresses.polygon.routers.unicly.router :
            chainNetwork == 3 ? addresses.avalanche.routers.unicly.router :
            chainNetwork == 4 ? addresses.arbitrum.routers.unicly.router :
            addresses.BSC.routers.unicly.router ),
          price: prices[8], receivedAmount: ethers.BigNumber.from("-1"), lastRcvdAmtUpdated: "-1" },
          { name: 'Orionswap', type: "FORK", 
          router: 
          //addresses.orion.router, 
          ( chainNetwork == 1 ? addresses.ethereum.routers.orionprotocol.router :
            chainNetwork == 2 ? addresses.polygon.routers.orionprotocol.router :
            chainNetwork == 3 ? addresses.avalanche.routers.orionprotocol.router :
            chainNetwork == 4 ? addresses.arbitrum.routers.orionprotocol.router :
            addresses.BSC.routers.orionprotocol.router ),
          price: prices[9], receivedAmount: ethers.BigNumber.from("-1"), lastRcvdAmtUpdated: "-1" },
          { name: 'Elkswap', type: "FORK", 
          router: 
          //addresses.elk.router, 
          ( chainNetwork == 1 ? addresses.ethereum.routers.elk.router :
            chainNetwork == 2 ? addresses.polygon.routers.elk.router :
            chainNetwork == 3 ? addresses.avalanche.routers.elk.router :
            chainNetwork == 4 ? addresses.arbitrum.routers.elk.router :
            addresses.BSC.routers.elk.router ),
          price: prices[10], receivedAmount: ethers.BigNumber.from("-1"), lastRcvdAmtUpdated: "-1" },
          //{ name: 'Defiswap', type: "FORK", router: addresses.defi.router, price: prices[11], receivedAmount: ethers.BigNumber.from("-1"), lastRcvdAmtUpdated: "-1" },
          { name: 'Empireswap', type: "FORK", 
          router: 
          //addresses.empire.router, 
          ( chainNetwork == 1 ? addresses.ethereum.routers.empire.router :
            chainNetwork == 2 ? addresses.polygon.routers.empire.router :
            chainNetwork == 3 ? addresses.avalanche.routers.empire.router :
            chainNetwork == 4 ? addresses.arbitrum.routers.empire.router :
            addresses.BSC.routers.empire.router ),
          price: prices[11], receivedAmount: ethers.BigNumber.from("-1"), lastRcvdAmtUpdated: "-1" },
          { name: 'Sicleswap', type: "FORK", 
          router: 
          //addresses.sicle.router, 
          ( chainNetwork == 1 ? addresses.ethereum.routers.swapsicle.router :
            chainNetwork == 2 ? addresses.polygon.routers.swapsicle.router :
            chainNetwork == 3 ? addresses.avalanche.routers.swapsicle.router :
            chainNetwork == 4 ? addresses.arbitrum.routers.swapsicle.router :
            addresses.BSC.routers.swapsicle.router ),
          price: prices[12], receivedAmount: ethers.BigNumber.from("-1"), lastRcvdAmtUpdated: "-1" },
          { name: 'Youswap', type: "FORK", 
          router: 
          //addresses.you.router, 
          ( chainNetwork == 1 ? addresses.ethereum.routers.youswap.router :
            chainNetwork == 2 ? addresses.polygon.routers.youswap.router :
            chainNetwork == 3 ? addresses.avalanche.routers.youswap.router :
            chainNetwork == 4 ? addresses.arbitrum.routers.youswap.router :
            addresses.BSC.routers.youswap.router ),
          price: prices[13], receivedAmount: ethers.BigNumber.from("-1"), lastRcvdAmtUpdated: "-1" },
          { name: 'Sumswap', type: "FORK", 
          router: 
          //addresses.sum.router, 
          ( chainNetwork == 1 ? addresses.ethereum.routers.sumswap.router :
            chainNetwork == 2 ? addresses.polygon.routers.sumswap.router :
            chainNetwork == 3 ? addresses.avalanche.routers.sumswap.router :
            chainNetwork == 4 ? addresses.arbitrum.routers.sumswap.router :
            addresses.BSC.routers.sumswap.router ),
          price: prices[14], receivedAmount: ethers.BigNumber.from("-1"), lastRcvdAmtUpdated: "-1" },
          { name: 'Kwikswap', type: "FORK", 
          router: 
          //addresses.kwik.router, 
          ( chainNetwork == 1 ? addresses.ethereum.routers.kwikswap.router :
            chainNetwork == 2 ? addresses.polygon.routers.kwikswap.router :
            chainNetwork == 3 ? addresses.avalanche.routers.kwikswap.router :
            chainNetwork == 4 ? addresses.arbitrum.routers.kwikswap.router :
            addresses.BSC.routers.kwikswap.router ),
          price: prices[15], receivedAmount: ethers.BigNumber.from("-1"), lastRcvdAmtUpdated: "-1" },
          { name: 'Safeswap', type: "FORK", 
          router: 
          //addresses.safe.router, 
          ( chainNetwork == 1 ? addresses.ethereum.routers.safeswap.router :
            chainNetwork == 2 ? addresses.polygon.routers.safeswap.router :
            chainNetwork == 3 ? addresses.avalanche.routers.safeswap.router :
            chainNetwork == 4 ? addresses.arbitrum.routers.safeswap.router :
            addresses.BSC.routers.safeswap.router ),
          price: prices[16], receivedAmount: ethers.BigNumber.from("-1"), lastRcvdAmtUpdated: "-1" },
          { name: 'Yapeswap', type: "FORK", router: 
          //addresses.yape.router, 
          ( chainNetwork == 1 ? addresses.ethereum.routers.yapeswap.router :
            chainNetwork == 2 ? addresses.polygon.routers.yapeswap.router :
            chainNetwork == 3 ? addresses.avalanche.routers.yapeswap.router :
            chainNetwork == 4 ? addresses.arbitrum.routers.yapeswap.router :
            addresses.BSC.routers.yapeswap.router ),
          price: prices[17], receivedAmount: ethers.BigNumber.from("-1"), lastRcvdAmtUpdated: "-1" }
        ],
        lastUpdated: Date.now()
      }
    );

    // Remove duplicate tokens from the array, just in case there are any...
    loadedPrices = loadedPrices.reduce((acc, current) => {
      const x = acc.find(item => item.token === current.token);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    /*
    UniswapV2=1278969841      prices[0]
    Sushiswap=1629909104    prices[1]
    Pancakeswap=1630996309  prices[2]
    Fraxswap=-1             prices[3]
    Apeswap=776735067       prices[4]
    Shibaswap=1618050268    prices[5]
    Swaprswap=144171835     prices[6]
    Radioshackswap=21674127 prices[7]
    Uniclyswap=191961148    prices[8]
    Orionswap=1477187876    prices[9]
    Elkswap=104             prices[10]
    Empireswap=-1           prices[11]
    Sicleswap=-1            prices[12]
    Youswap=972874204       prices[13]
    Sumswap=-1              prices[14]
    Kwikswap=1596906381     prices[15]
    Safeswap=1630996309     prices[16]
    Yapeswap=117587         prices[17]'Uniswap'
    */
    let data;
    data = "token=" + tokenName + "\n";
    data += "V3Uniswap=" + prices[18].toString() + "\n";
    data += "receivedAmount=" + (ethers.BigNumber.from("-1")).toString() + "\n";
    data += "lastRcvdAmtUpdated=" + "-1" + "\n";
    data += "V2Uniswap=" + prices[0].toString() + "\n";
    data += "receivedAmount=" + (ethers.BigNumber.from("-1")).toString() + "\n";
    data += "lastRcvdAmtUpdated=" + "-1" + "\n";
    data += "Sushiswap=" + prices[1].toString() + "\n";
    data += "receivedAmount=" + (ethers.BigNumber.from("-1")).toString() + "\n";
    data += "lastRcvdAmtUpdated=" + "-1" + "\n";
    data += "Pancakeswap=" + prices[2].toString() + "\n";
    data += "receivedAmount=" + (ethers.BigNumber.from("-1")).toString() + "\n";
    data += "lastRcvdAmtUpdated=" + "-1" + "\n";
    data += "Fraxswap=" + prices[3].toString() + "\n";
    data += "receivedAmount=" + (ethers.BigNumber.from("-1")).toString() + "\n";
    data += "lastRcvdAmtUpdated=" + "-1" + "\n";
    data += "Apeswap=" + prices[4].toString() + "\n";
    data += "receivedAmount=" + (ethers.BigNumber.from("-1")).toString() + "\n";
    data += "lastRcvdAmtUpdated=" + "-1" + "\n";
    data += "Shibaswap=" + prices[5].toString() + "\n";
    data += "receivedAmount=" + (ethers.BigNumber.from("-1")).toString() + "\n";
    data += "lastRcvdAmtUpdated=" + "-1" + "\n";
    data += "Swaprswap=" + prices[6].toString() + "\n";
    data += "receivedAmount=" + (ethers.BigNumber.from("-1")).toString() + "\n";
    data += "lastRcvdAmtUpdated=" + "-1" + "\n";
    data += "Radioshackswap=" + prices[7].toString() + "\n";
    data += "receivedAmount=" + (ethers.BigNumber.from("-1")).toString() + "\n";
    data += "lastRcvdAmtUpdated=" + "-1" + "\n";
    data += "Uniclyswap=" + prices[8].toString() + "\n";
    data += "receivedAmount=" + (ethers.BigNumber.from("-1")).toString() + "\n";
    data += "lastRcvdAmtUpdated=" + "-1" + "\n";
    data += "Orionswap=" + prices[9].toString() + "\n";
    data += "receivedAmount=" + (ethers.BigNumber.from("-1")).toString() + "\n";
    data += "lastRcvdAmtUpdated=" + "-1" + "\n";
    data += "Elkswap=" + prices[10].toString() + "\n";
    data += "receivedAmount=" + (ethers.BigNumber.from("-1")).toString() + "\n";
    data += "lastRcvdAmtUpdated=" + "-1" + "\n";
    /*data += "Defiswap=" + prices[11].toString() + "\n";
    data += "receivedAmount=" + (ethers.BigNumber.from("-1")).toString() + "\n";
    data += "lastRcvdAmtUpdated=" + "-1" + "\n";*/
    data += "Empireswap=" + prices[11].toString() + "\n";
    data += "receivedAmount=" + (ethers.BigNumber.from("-1")).toString() + "\n";
    data += "lastRcvdAmtUpdated=" + "-1" + "\n";
    data += "Sicleswap=" + prices[12].toString() + "\n";
    data += "receivedAmount=" + (ethers.BigNumber.from("-1")).toString() + "\n";
    data += "lastRcvdAmtUpdated=" + "-1" + "\n";
    data += "Youswap=" + prices[13].toString() + "\n";
    data += "receivedAmount=" + (ethers.BigNumber.from("-1")).toString() + "\n";
    data += "lastRcvdAmtUpdated=" + "-1" + "\n";
    data += "Sumswap=" + prices[14].toString() + "\n";
    data += "receivedAmount=" + (ethers.BigNumber.from("-1")).toString() + "\n";
    data += "lastRcvdAmtUpdated=" + "-1" + "\n";
    data += "Kwikswap=" + prices[15].toString() + "\n";
    data += "receivedAmount=" + (ethers.BigNumber.from("-1")).toString() + "\n";
    data += "lastRcvdAmtUpdated=" + "-1" + "\n";
    data += "Safeswap=" + prices[16].toString() + "\n";
    data += "receivedAmount=" + (ethers.BigNumber.from("-1")).toString() + "\n";
    data += "lastRcvdAmtUpdated=" + "-1" + "\n";
    data += "Yapeswap=" + prices[17].toString() + "\n";
    data += "receivedAmount=" + (ethers.BigNumber.from("-1")).toString() + "\n";
    data += "lastRcvdAmtUpdated=" + "-1" + "\n";
    data += "lastUpdated=" + (loadedPrices.filter(el => el.token == tokenName)[0]).lastUpdated + "\n";
    data += "</" + tokenName + ">\n";
    fs.writeFileSync(fileName, data, {encoding:'utf8',flag:'a+'}, err => {
        if (err) {
        throw err;
      }
    });
  } // end if (foundToken.length > 0)

  await delay(Math.random() * 500);
  if (loadFlag == "1" ) {
    //console.log(`Loaded token prices for '${tokenName}'...`);
  }
  if (loadFlag == "2" ) {
    //console.log(`Updated token prices for '${tokenName}'...`);
  }
  if (loadFlag == "3" ) {
    //console.log(`Reusing token prices for '${tokenName}'...`);
  }
  await delay(Math.random() * 500);
  //ONGOING explore more uniswap fork exchanges
  //https://defillama.com/forks/Uniswap
  //https://www.dapp.com/dapps/ethereum-decentralized-exchange?sort=4&time=0&type=0
  //console.log((loadedPrices.filter(el => el.token == tokenName)[0]).exchange);
}

async function updateReceivedAmount(tokenName, exchangeName, newReceivedAmount) {
  // Reload with new prices if already loaded prices in the array supersedes "TIME_REFRESH" refresh period
  ((loadedPrices.filter(el => el.token == tokenName)[0]).exchange.filter(el => el.name == exchangeName)[0]).receivedAmount = ethers.BigNumber.from(newReceivedAmount);
  ((loadedPrices.filter(el => el.token == tokenName)[0]).exchange.filter(el => el.name == exchangeName)[0]).lastRcvdAmtUpdated = Date.now();

  // Remove duplicate tokens from the array, just in case there are any...
  loadedPrices = loadedPrices.reduce((acc, current) => {
    const x = acc.find(item => item.token === current.token);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  // Copy existing data into temp variable "NEWDATA"
  let NEWDATA = "";
  let foundTokenFlag = false;
  let foundExchangeFlag = false;
  let inTokenSection = false;
  let readTokenName;

  //allFileContents = fs.readFileSync('marketPrices.txt', 'utf-8');
  let fileName;
  ( chainNetwork == 1 ? fileName = 'marketPrices_Ethereum.txt' :
    chainNetwork == 2 ? fileName = 'marketPrices_Polygon.txt' :
    chainNetwork == 3 ? fileName = 'marketPrices_Avalanche.txt' :
    chainNetwork == 4 ? fileName = 'marketPrices_Arbitrum.txt' :
    fileName = 'marketPrices_BSC.txt' );
  allFileContents = fs.readFileSync(fileName, 'utf-8');
  allFileContents.split(/\r?\n/).forEach(line =>  {
    if (line.includes("token=") || inTokenSection) {
      if (!inTokenSection) {
        readTokenName = line.slice( (line.indexOf("token=") + 6), line.length );
        inTokenSection = true;
      }
      if (line.includes("token=")) {
        if (line.includes(tokenName)) {
          foundTokenFlag = true;
        }
        NEWDATA += line + "\n";
      }
    }
    if (line.includes("swap=")) {
      if (line.includes(exchangeName)) {
        foundExchangeFlag = true;
      }
      NEWDATA += line + "\n";
    }
    if (line.includes("lastUpdated=")) {
      NEWDATA += line + "\n";
    }
    if (line.includes("receivedAmount=")) {
      if (foundTokenFlag && foundExchangeFlag) {
        NEWDATA += line.slice( 0, line.indexOf("=") + 1) + (((loadedPrices.filter(el => el.token == tokenName)[0]).exchange.filter(el => el.name == exchangeName)[0]).receivedAmount).toString() + "\n";
      } else {
        NEWDATA += line + "\n";
      }
    }
    if (line.includes("lastRcvdAmtUpdated=")) {
      if (foundTokenFlag && foundExchangeFlag) {
        NEWDATA += line.slice( 0, line.indexOf("=") + 1) + ((loadedPrices.filter(el => el.token == tokenName)[0]).exchange.filter(el => el.name == exchangeName)[0]).lastRcvdAmtUpdated + "\n";
      } else {
        NEWDATA += line + "\n";
      }
      foundExchangeFlag = false;
    }
    if (line.includes("</" + readTokenName + ">")) {
      NEWDATA += line + "\n";
      inTokenSection = false;
      foundTokenFlag = false;
      foundExchangeFlag =  false;
    }
  });
  //fs.writeFileSync("marketPrices.txt", NEWDATA, {encoding:'utf8',flag:'w'}, err => {
  fs.writeFileSync(fileName, NEWDATA, {encoding:'utf8',flag:'w'}, err => {
    if (err) {
      throw err;
    }
  });
}

async function getOffChainEthPrices(tokens) {
  //Retrieve 1inch exchange prices for each token via singlecall to 1inch offchain
  let prices = [];

  for (let i = 0; i < tokens.length; i++) {
    //getRateToEth would return how many ETH = 1 DAI
    //but formatted in wei based on the decimals of the two tokens
    //
    //it's just a liquidity weighted average price
    //
    //Yes, you should instead just check the prices on dexs directly or 
    //use the aggregation API https://docs.1inch.io/docs/aggregation-protocol/api/swagger
    //
    // if want ETH price for 1000DAI you would mulitple the ETH rate by 1000
    // it would assume there is 0 price impact though
    // Price impact is the $ price difference between the input $ amount and output $ amount
    offChainOracleContract.functions.getRateToEth(
      tokens[i].address, // source token
      true // use source wrappers
    )
    .then((rate) => {
      /*const numerator = ethers.BigNumber.from(10).pow(tokens[i].decimals);
      const denominator = ethers.BigNumber.from(10).pow(18); // eth decimals
      const price = ethers.BigNumber.from(rate.toString()).mul(numerator).div(denominator); // human readable value*/
      const price = ethers.BigNumber.from(rate.toString());
      if (price.gt(0)) {
        // Convert to 1 ETH price of "OTHER" tokens
        const FN = ethers.FixedNumber.from((1 / web3.utils.fromWei(price.toString())).toString());
        const num = ((FN.mulUnsafe(ethers.FixedNumber.from((ethers.BigNumber.from(10).pow(tokens[i].decimals)).toString()))).round(0)).toString();
        const offchainPrice = ethers.BigNumber.from(num.slice( 0, num.indexOf(".0")));
        const destTokenAddress = eval(`addresses.tokens.${tokens[i].name}`);
        prices.push(
          {
            address: destTokenAddress,
            decimals: tokens[i].decimals,
            name: `${tokens[i].name}`,
            price: offchainPrice.toString()// storing rate original Wei value
          }
        );
      }
    })
    .catch(err => true);
    //.catch(console.log);
  }

  return prices;
}

async function executeCodeBlock(blockNumber) {
  //return new Promise((resolve, reject) => {
    try {
      ////let release = await mutex.acquire();

      let fileName;
      ( chainNetwork == 1 ? fileName = 'marketPrices_Ethereum.txt' :
        chainNetwork == 2 ? fileName = 'marketPrices_Polygon.txt' :
        chainNetwork == 3 ? fileName = 'marketPrices_Avalanche.txt' :
        chainNetwork == 4 ? fileName = 'marketPrices_Arbitrum.txt' :
        fileName = 'marketPrices_BSC.txt' );

      let oneinchPrice;
      let uniswapPrice;
      let sushiPrice;
      let pancakePrice;
      let apePrice;
      let fraxPrice;
      let shibaPrice;
      let swaprPrice;
      let radioShackPrice;
      let uniclyPrice;
      let sashimiPrice;
      let orionPrice;
      let elkPrice;
      let defiPrice;
      let empirePrice;
      let siclePrice;
      let youPrice;
      let sumPrice;
      let kwikPrice;
      let safePrice;
      let yapePrice;
      let uniswapV3Price;
      console.log(`New block received. Block # ${blockNumber}`);

      let randomToken;

      // tokenType values:
      // "stable" will randomly pick out tokens from "stablecoins" array
      // "selected" will randomly pick out tokens from "selectedTokens" array
      // otherwise, will randomly pick out tokens from "tokens" array
      if (tokenType == "stable") {
        if (chainNetwork == 1) { // Ethereum
          if (stablecoinsETH.length > 0) {
            randomToken = [stablecoinsETH[Math.floor(Math.random() * stablecoinsETH.length)]];
          }
        }
        if (chainNetwork == 2) { // Polygon
          if (stablecoinsPOLY.length > 0) {
            randomToken = [stablecoinsPOLY[Math.floor(Math.random() * stablecoinsPOLY.length)]];
          }
        }
        if (chainNetwork == 3) { // Avalanche
          if (stablecoinsAVAX.length > 0) {
            randomToken = [stablecoinsAVAX[Math.floor(Math.random() * stablecoinsAVAX.length)]];
          }
        }
        if (chainNetwork == 4) { // Arbitrum
          if (stablecoinsARB.length > 0) {
            randomToken = [stablecoinsARB[Math.floor(Math.random() * stablecoinsARB.length)]];
          }
        }
        if (chainNetwork == 5) { // BSC
          if (stablecoinsBSC.length > 0) {
            randomToken = [stablecoinsBSC[Math.floor(Math.random() * stablecoinsBSC.length)]];
          }
        }
      } else if (tokenType == "selected") {
        if (chainNetwork == 1) { // Ethereum
          if (selectedTokensETH.length > 0) {
            randomToken = [selectedTokensETH[Math.floor(Math.random() * selectedTokensETH.length)]];
          }
        }
        if (chainNetwork == 2) { // Polygon
          if (selectedTokensPOLY.length > 0) {
            randomToken = [selectedTokensPOLY[Math.floor(Math.random() * selectedTokensPOLY.length)]];
          }
        }
        if (chainNetwork == 3) { // Avalanche
          if (selectedTokensAVAX.length > 0) {
            randomToken = [selectedTokensAVAX[Math.floor(Math.random() * selectedTokensAVAX.length)]];
          }
        }
        if (chainNetwork == 4) { // Arbitrum
          if (selectedTokensARB.length > 0) {
            randomToken = [selectedTokensARB[Math.floor(Math.random() * selectedTokensARB.length)]];
          }
        }
        if (chainNetwork == 5) { // BSC
          if (selectedTokensBSC.length > 0) {
            randomToken = [selectedTokensBSC[Math.floor(Math.random() * selectedTokensBSC.length)]];
          }
        }
      } else if (tokenType == "hot") {
        if (chainNetwork == 1) { // Ethereum
          if (hotTokensETH.length > 0) {
            randomToken = [hotTokensETH[Math.floor(Math.random() * hotTokensETH.length)]];
          }
        }
        if (chainNetwork == 2) { // Polygon
          if (hotTokensPOLY.length > 0) {
            randomToken = [hotTokensPOLY[Math.floor(Math.random() * hotTokensPOLY.length)]];
          }
        }
        if (chainNetwork == 3) { // Avalanche
          if (hotTokensAVAX.length > 0) {
            randomToken = [hotTokensAVAX[Math.floor(Math.random() * hotTokensAVAX.length)]];
          }
        }
        if (chainNetwork == 4) { // Arbitrum
          if (hotTokensPOLY.length > 0) {
            randomToken = [hotTokensPOLY[Math.floor(Math.random() * hotTokensPOLY.length)]];
          }
        }
        if (chainNetwork == 5) { // BSC
          if (hotTokensBSC.length > 0) {
            randomToken = [hotTokensBSC[Math.floor(Math.random() * hotTokensBSC.length)]];
          }
        }
      } else {
        if (chainNetwork == 1) { // Ethereum
          if (tokensETH.length > 0) {
            randomToken = [tokensETH[Math.floor(Math.random() * tokensETH.length)]];
          }
        }
        if (chainNetwork == 2) { // Polygon
          if (tokensPOLY.length > 0) {
            randomToken = [tokensPOLY[Math.floor(Math.random() * tokensPOLY.length)]];
          }
        }
        if (chainNetwork == 3) { // Avalanche
          if (tokensAVAX.length > 0) {
            randomToken = [tokensAVAX[Math.floor(Math.random() * tokensAVAX.length)]];
          }
        }
        if (chainNetwork == 4) { // Arbitrum
          if (tokensARB.length > 0) {
            randomToken = [tokensARB[Math.floor(Math.random() * tokensARB.length)]];
          }
        }
        if (chainNetwork == 5) { // BSC
          if (tokensBSC.length > 0) {
            randomToken = [tokensBSC[Math.floor(Math.random() * tokensBSC.length)]];
          }
        }
      }
      console.log("randomToken ", randomToken[0].name);
      //try {
      //  let release = await mutex.acquire();
      await delay(Math.random() * 1000);
      //console.log("s2 (", randomToken[0].name, ")");
      await loadPrices(randomToken[0].name, randomToken[0].address, randomToken[0].decimals);
      //console.log("s3 (", randomToken[0].name, ")");
      await delay(Math.random() * 1000);
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
      //IMPORTANT https://spin.atomicobject.com/2018/09/10/javascript-concurrency/
      //IMPORTANT https://medium.com/swlh/synchronize-your-javsscript-app-with-async-mutex-f0149513ea4b
      oneinchPrice = ethers.BigNumber.from(0);
      await delay(Math.random() * 1000);
      uniswapV3Price = ((loadedPrices.filter(el => el.token == randomToken[0].name)[0]).exchange.filter(el => el.name == 'V3Uniswap')[0]).price;
      //console.log("uniswapV3Price=", uniswapV3Price);
      uniswapPrice = ((loadedPrices.filter(el => el.token == randomToken[0].name)[0]).exchange.filter(el => el.name == 'V2Uniswap')[0]).price;
      //console.log("uniswapPrice=", uniswapPrice);
      sushiPrice = ((loadedPrices.filter(el => el.token == randomToken[0].name)[0]).exchange.filter(el => el.name == 'Sushiswap')[0]).price;
      //console.log("sushiPrice=", sushiPrice);
      pancakePrice = ((loadedPrices.filter(el => el.token == randomToken[0].name)[0]).exchange.filter(el => el.name == 'Pancakeswap')[0]).price;
      //console.log("pancakePrice=", pancakePrice);
      fraxPrice = ((loadedPrices.filter(el => el.token == randomToken[0].name)[0]).exchange.filter(el => el.name == 'Fraxswap')[0]).price;
      //console.log("fraxPrice=", fraxPrice);
      apePrice = ((loadedPrices.filter(el => el.token == randomToken[0].name)[0]).exchange.filter(el => el.name == 'Apeswap')[0]).price;
      //console.log("apePrice=", apePrice);
      shibaPrice = ((loadedPrices.filter(el => el.token == randomToken[0].name)[0]).exchange.filter(el => el.name == 'Shibaswap')[0]).price;
      //console.log("shibaPrice=", shibaPrice);
      swaprPrice = ((loadedPrices.filter(el => el.token == randomToken[0].name)[0]).exchange.filter(el => el.name == 'Swaprswap')[0]).price;
      //console.log("swaprPrice=", swaprPrice);
      radioShackPrice = ((loadedPrices.filter(el => el.token == randomToken[0].name)[0]).exchange.filter(el => el.name == 'Radioshackswap')[0]).price;
      //console.log("radioShackPrice=", radioShackPrice);
      uniclyPrice = ((loadedPrices.filter(el => el.token == randomToken[0].name)[0]).exchange.filter(el => el.name == 'Uniclyswap')[0]).price;
      //console.log("uniclyPrice=", uniclyPrice);
      orionPrice = ((loadedPrices.filter(el => el.token == randomToken[0].name)[0]).exchange.filter(el => el.name == 'Orionswap')[0]).price;
      //console.log("orionPrice=", orionPrice);
      elkPrice = ((loadedPrices.filter(el => el.token == randomToken[0].name)[0]).exchange.filter(el => el.name == 'Elkswap')[0]).price;
      //console.log("elkPrice=", elkPrice);
      //defiPrice = ((loadedPrices.filter(el => el.token == randomToken[0].name)[0]).exchange.filter(el => el.name == 'Defiswap')[0]).price;
      //console.log("defiPrice=", defiPrice);
      empirePrice = ((loadedPrices.filter(el => el.token == randomToken[0].name)[0]).exchange.filter(el => el.name == 'Empireswap')[0]).price;
      //console.log("empirePrice=", empirePrice);
      siclePrice = ((loadedPrices.filter(el => el.token == randomToken[0].name)[0]).exchange.filter(el => el.name == 'Sicleswap')[0]).price;
      //console.log("siclePrice=", siclePrice);
      youPrice = ((loadedPrices.filter(el => el.token == randomToken[0].name)[0]).exchange.filter(el => el.name == 'Youswap')[0]).price;
      //console.log("youPrice=", youPrice);
      sumPrice = ((loadedPrices.filter(el => el.token == randomToken[0].name)[0]).exchange.filter(el => el.name == 'Sumswap')[0]).price;
      //console.log("sumPrice=", sumPrice);
      kwikPrice = ((loadedPrices.filter(el => el.token == randomToken[0].name)[0]).exchange.filter(el => el.name == 'Kwikswap')[0]).price;
      //console.log("kwikPrice=", kwikPrice);
      safePrice = ((loadedPrices.filter(el => el.token == randomToken[0].name)[0]).exchange.filter(el => el.name == 'Safeswap')[0]).price;
      //console.log("safePrice=", safePrice);
      yapePrice = ((loadedPrices.filter(el => el.token == randomToken[0].name)[0]).exchange.filter(el => el.name == 'Yapeswap')[0]).price;
      //console.log("yapePrice=", yapePrice);
      await delay(Math.random() * 1000);
      //console.log("s4 (", randomToken[0].name, ")");
      const presorted = (loadedPrices.filter(token => token.token == randomToken[0].name)[0]).exchange.filter(exchange => exchange.price > 0);
      const sortedPrices = presorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      console.log("sortedPrices");
      console.log(sortedPrices);
      //return;
      // Retrieve receivedAmount from "higher" price DEX A
      if (sortedPrices.length == 0) {
        //console.log(`No prices found for '${randomToken[0].name}'`);
      }
      if (sortedPrices.length == 1) {
        //console.log(`Only one price found for '${randomToken[0].name}' @ '${sortedPrices[sortedPrices.length-1].name}'`);
      }
      if (sortedPrices.length > 1) {
        //console.log(`Several prices found for '${randomToken[0].name}'`);
        let expensiveRouter;
        if (sortedPrices[sortedPrices.length-1].name == "V3Uniswap") {
          // Uniswap V3 FORK
          expensiveRouter = new ethers.Contract(
            web3.utils.toChecksumAddress(process.env.QUOTER),
            Quoter.abi,
            walletWithProvider
          );
          //console.log("Quoter ", expensiveRouter.address);
        } else { // Uniswap V2 FORK
          expensiveRouter = new ethers.Contract(
            web3.utils.toChecksumAddress(sortedPrices[sortedPrices.length-1].router),
            UniswapV2Router02.abi,
            walletWithProvider
          );
        }
        //console.log("before ", sortedPrices);
        await delay(Math.random() * 1000);
        const expensiveExchange = sortedPrices[sortedPrices.length-1].name;
        const expensiveReceivedAmount = ((loadedPrices.filter(tok => tok.token == randomToken[0].name)[0]).exchange.filter(exg => exg.name == expensiveExchange)[0]).receivedAmount;
        const expensiveLastRcvdAmtUpdate = ((loadedPrices.filter(tok => tok.token == randomToken[0].name)[0]).exchange.filter(exg => exg.name == expensiveExchange)[0]).lastRcvdAmtUpdated;
        await delay(Math.random() * 1000);
        let receivedAmountDEX_A;
        //console.log("s0.");
        if ( expensiveReceivedAmount.lt(0) || ethers.BigNumber.from(Date.now()).gt(ethers.BigNumber.from(expensiveLastRcvdAmtUpdate).add(TIME_REFRESH)) ) {
          //console.log("s1.");
          //console.log("-------------------------------------------------------------------------");
          //console.log("expensiveRouter.functions.getAmountsOut ", (await expensiveRouter.functions.getAmountsOut(AMT_WEI.toString(), [wethAddress, randomToken[0].address])).amounts[1].toString());
          //console.log("-------------------------------------------------------------------------");
          //console.log("s2.");
          if (expensiveExchange == "V3Uniswap") {
            // Uniswap V3 FORK
            //console.log("Quoter ", expensiveRouter.address);
            //console.log("poolFee ", poolFee);
            //console.log("AMT_WEI ", AMT_WEI.toString());
            receivedAmountDEX_A = (await expensiveRouter.callStatic.quoteExactInputSingle(
                                        wethAddress,                // tokenIn
                                        randomToken[0].address,     // tokenOut
                                        poolFee,                    // fee
                                        AMT_WEI.toString(),         // amountIn
                                        0                           // sqrtPriceLimitX96
            )).toString();
          } else { // Uniswap V2 FORK
            console.log("s1");
            console.log("expensiveExchange                 ", expensiveExchange);
            console.log("expensiveRouter.address           ", expensiveRouter.address);
            console.log("AMT_WEI.toString()                ", AMT_WEI.toString());
            console.log("wethAddress                       ", wethAddress);
            console.log("randomToken[0].address            ", randomToken[0].address);
            console.log("expensiveRouter.getAmountsOut     ", (await expensiveRouter.callStatic.getAmountsOut(AMT_WEI.toString(), [wethAddress, randomToken[0].address])));
            try {
              receivedAmountDEX_A = (await expensiveRouter.callStatic.getAmountsOut(AMT_WEI.toString(), [wethAddress, randomToken[0].address])).amounts[1].toString();
            } catch (error) {
              receivedAmountDEX_A = (await expensiveRouter.callStatic.getAmountsOut(AMT_WEI.toString(), [wethAddress, randomToken[0].address]))[1].toString();
            }
            console.log("receivedAmountDEX_A.toString()    ", receivedAmountDEX_A.toString());
            console.log("s2");
          }
          //console.log("s3.");
          //console.log(`Updated receivedAmountDEX_A '${receivedAmountDEX_A}' of '${expensiveExchange}'`);
          await updateReceivedAmount(randomToken[0].name, expensiveExchange, ethers.BigNumber.from("-1"));
          //console.log("s4.");
        } else {
          receivedAmountDEX_A = ethers.BigNumber.from(((loadedPrices.filter(tok => tok.token == randomToken[0].name)[0]).exchange.filter(exg => exg.name == expensiveExchange)[0]).receivedAmount);
          //console.log(`Reusing receivedAmountDEX_A '${receivedAmountDEX_A}' of '${expensiveExchange}'`);
        }
        //console.log("s5.");
        //console.log("receivedAmountDEX_A ", receivedAmountDEX_A.toString());
        await delay(Math.random() * 1000);
        let presortedExpensiveExchange;
        let sortedPricesExpensiveExchange;
        //setTimeout(() => {
        presortedExpensiveExchange = (loadedPrices.filter(token => token.token == randomToken[0].name)[0]).exchange.filter(exchange => exchange.price > 0);
        sortedPricesExpensiveExchange = presortedExpensiveExchange.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        //console.log("hello 1");
        //}, 1000); // setTimeout(() => {...}
        //console.log("hello 2");
        //console.log(sortedPricesExpensiveExchange);
        for (let i = 0; i < (sortedPricesExpensiveExchange.length-1); i++) {  
          // Retrieve receivedAmount from "lower" price DEX B
          //console.log("presortedExpensiveExchange.length    ", presortedExpensiveExchange.length);
          //console.log("sortedPricesExpensiveExchange.length ", sortedPricesExpensiveExchange.length);
          //console.log(`sortedPricesExpensiveExchange[${i}].router `, sortedPricesExpensiveExchange[i].router);
          let cheapRouterA;
          if (sortedPricesExpensiveExchange[i].name == "V3Uniswap") {
            // UNISWAP V3
            cheapRouterA = new ethers.Contract(
              web3.utils.toChecksumAddress(process.env.QUOTER),
              Quoter.abi,
              walletWithProvider
            );
            //console.log("Quoter (cheapRouterA) ", cheapRouterA.address);
          } else { 
            // UNISWAP V2 FORK
            cheapRouterA = new ethers.Contract(
              //web3.utils.toChecksumAddress(sortedPrices[i].router),
              web3.utils.toChecksumAddress(sortedPricesExpensiveExchange[i].router),
              UniswapV2Router02.abi,
              walletWithProvider
            );
          }

          const cheapExchange = sortedPricesExpensiveExchange[i].name;
          const cheapReceivedAmount = ((loadedPrices.filter(tok => tok.token == randomToken[0].name)[0]).exchange.filter(exg => exg.name == cheapExchange)[0]).receivedAmount;
          const cheapLastRcvdAmtUpdate = ((loadedPrices.filter(tok => tok.token == randomToken[0].name)[0]).exchange.filter(exg => exg.name == cheapExchange)[0]).lastRcvdAmtUpdated;
          await delay(Math.random() * 1000);
          let receivedAmountDEX_B;
          if ( cheapReceivedAmount.lt(0) || ethers.BigNumber.from(Date.now()).gt(ethers.BigNumber.from(cheapLastRcvdAmtUpdate).add(TIME_REFRESH)) ) {
            //console.log("s6.");
            //console.log("receivedAmountDEX_A    ", receivedAmountDEX_A.toString());
            //console.log("randomToken[0].address ", randomToken[0].address);
            //console.log("wethAddress            ", wethAddress);
            //console.log("cheapRouterA.address   ", cheapRouterA.address);
            //console.log("-------------------------------------------------------------------------");
            //console.log("cheapRouterA.functions.getAmountsOut ", (await cheapRouterA.functions.getAmountsOut(receivedAmountDEX_A.toString(), [randomToken[0].address, wethAddress])).amounts[1].toString());
            //console.log("-------------------------------------------------------------------------");
            //console.log("s7.");
            //console.log("cheapRouterA ", cheapRouterA.address);
            //console.log("poolFee ", poolFee);
            //console.log("AMT_WEI ", AMT_WEI.toString());
            if (cheapExchange == "V3Uniswap") {
              // UNISWAP V3
              //Read https://degencode.substack.com/p/uniswapv3-quoter-contract
              //console.log("poolFee ", poolFee);
              receivedAmountDEX_B = (await cheapRouterA.callStatic.quoteExactInputSingle(
                                            randomToken[0].address,         // tokenIn
                                            wethAddress,                    // tokenOut
                                            poolFee,                        // fee
                                            receivedAmountDEX_A.toString(), // amountIn
                                            0                               // sqrtPriceLimitX96
              )).toString();
            } else {
              // UNISWAP V2 FORK
              console.log("s3");
              console.log("cheapExchange                  ", cheapExchange);
              console.log("cheapRouterA.address           ", cheapRouterA.address);
              console.log("receivedAmountDEX_A.toString() ", receivedAmountDEX_A.toString());
              console.log("randomToken[0].address         ", randomToken[0].address);
              console.log("wethAddress                    ", wethAddress);
              console.log("cheapRouterA.getAmountsOut     ", (await cheapRouterA.callStatic.getAmountsOut(receivedAmountDEX_A.toString(), [randomToken[0].address, wethAddress])));
              try {
                receivedAmountDEX_B = (await cheapRouterA.callStatic.getAmountsOut(receivedAmountDEX_A.toString(), [randomToken[0].address, wethAddress])).amounts[1].toString();
              } catch (error) {
                receivedAmountDEX_B = (await cheapRouterA.callStatic.getAmountsOut(receivedAmountDEX_A.toString(), [randomToken[0].address, wethAddress]))[1].toString();
              }
              console.log("receivedAmountDEX_B.toString() ", receivedAmountDEX_B.toString());
              console.log("s4");
            }
            //console.log("receivedAmountDEX_B ", receivedAmountDEX_B);
            //console.log("s8.");
            //console.log(`Updated receivedAmountDEX_B '${receivedAmountDEX_B}' of '${cheapExchange}'`);
            await updateReceivedAmount(randomToken[0].name, cheapExchange, receivedAmountDEX_B);
          } else {
            receivedAmountDEX_B = ethers.BigNumber.from(((loadedPrices.filter(tok => tok.token == randomToken[0].name)[0]).exchange.filter(exg => exg.name == cheapExchange)[0]).receivedAmount);
            //console.log(`Reusing receivedAmountDEX_B '${receivedAmountDEX_B}' of '${cheapExchange}'`);
          }
          //console.log("s9.");
          setTimeout(() => {
            // Log "receivedAmount" near misses (~1 ETH) into a file
            //const testRcvdAmount = ethers.BigNumber.from(sortedPrices[i].receivedAmount);
            const testRcvdAmount = ethers.BigNumber.from(receivedAmountDEX_B.toString());
            if (testRcvdAmount.gte(nearMiss)) {
              // Capture current dateTime for nearMisses log output file
              let timeElapsedX = Date.now();
              let todayX = new Date(timeElapsedX);
              let dateStringX = (todayX.getDate() < 10 ? "0" + todayX.getDate() : todayX.getDate()) + "_" + 
                                ((todayX.getMonth()+1) < 10 ? "0" + (todayX.getMonth()+1) : (todayX.getMonth()+1)) + "_" + 
                                todayX.getFullYear() + "_" + 
                                (todayX.getHours() < 10 ? "0" + todayX.getHours() : todayX.getHours()) + ":" +
                                (todayX.getMinutes() < 10 ? "0" + todayX.getMinutes() : todayX.getMinutes()) + ":" + 
                                (todayX.getSeconds() < 10 ? "0" + todayX.getSeconds() : todayX.getSeconds()); 
              let data;
              data = "\n" + dateStringX + "\n";
              data += "network        =" + 
              (chainNetwork == 1 ? "Ethereum" : 
              chainNetwork == 2 ? "Polygon" : 
              chainNetwork == 3 ? "Avalanche" : 
              chainNetwork == 4 ? "Arbitrum" : 
              "BSC") 
              + "\n";
              data += "token          =" + randomToken[0].name + "\n";
              //data += "DEX            =" + sortedPrices[i].name + "\n";
              //data += "price          =" + sortedPrices[i].price + "\n";           
              data += "DEX            =" + sortedPricesExpensiveExchange[i].name + "\n";
              data += "price          =" + sortedPricesExpensiveExchange[i].price + "\n";
              data += "receivedAmount =" + testRcvdAmount.toString() + "\n";
              data += "nearMiss       =" + nearMiss.toString() + "\n";

              fs.writeFileSync("nearMisses.txt", data, {encoding:'utf8',flag:'a+'}, err => {
                if (err) {
                  throw err;
                }
              });
            } // if (testRcvdAmount.gte(nearMiss))
          }, 2000); // setTimeout(() => {...}
        } // for loop
        //console.log("OUTSIDE FOR LOOP...");
        // Regenerate new "sortedPrices" array based on new receivedAmount values in loadedPrices
        const presortedFinalUpdates = (loadedPrices.filter(token => token.token == randomToken[0].name)[0]).exchange.filter(exchange => exchange.price > 0);
        const sortedPricesFinalUpdates = presortedFinalUpdates.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

        const foundUniswapV3Price = (sortedPricesFinalUpdates.filter(exchange => exchange.name == "V3Uniswap"));

        //console.log("after ", sortedPricesFinalUpdates);
        await delay(Math.random() * 1000);
        //console.log("sortedPrices");
        //console.log(sortedPricesFinalUpdates);
        //console.log(sortedPrices);
        //return;
        let sortedSupportedPrices;
        //console.log("chainNetwork ", chainNetwork);
        if (chainNetwork == 3 || chainNetwork == 5)
          sortedSupportedPrices = sortedPricesFinalUpdates.filter(swap => swap.name != "V3Uniswap");
        else
          sortedSupportedPrices = sortedPricesFinalUpdates;
        //console.log(sortedSupportedPrices);
        //return;
        //TODO switch statements around in PROD
        const presortedArbOpps = sortedSupportedPrices.filter(swap => ethers.BigNumber.from(swap.receivedAmount).gt(AMT_WEI.mul(9).div(10)));
        //const presortedArbOpps = sortedSupportedPrices.filter(swap => ethers.BigNumber.from(swap.receivedAmount).gt(AMT_WEI));
        //console.log("presortedArbOpps ARRAY (RECEIVEDAMOUNT > 1 ETH)");
        //web3.utils.fromWei(price.toString()))
        let chainNetworkName;
        ( chainNetwork == 1 ? chainNetworkName = "Ethereum" :
          chainNetwork == 2 ? chainNetworkName = "Polygon" :
          chainNetwork == 3 ? chainNetworkName = "Avalanche" :
          chainNetwork == 4 ? chainNetworkName = "Arbitrum" :
          chainNetworkName = "BSC" );
        console.log("------------------------------------------------------------------");
        console.log(`Outcome: ${presortedArbOpps.length} arbitrage opps found for '${randomToken[0].name}' in '${chainNetworkName}' network`);
        console.log("------------------------------------------------------------------");

        // Dump the token > 1 price into the FileSystem for recollection purposes
        //let contents = fs.readFileSync('tokensSeveralPrices.txt', 'utf-8');
        let contents = fs.readFileSync(fileName, 'utf-8');
        let tokenFound = false;
        contents.split(/\r?\n/).forEach(line =>  {
          if (line.includes(randomToken[0].name)) {
            tokenFound = true;
          }
        });
        if (!tokenFound) {
          //fs.writeFileSync("tokensSeveralPrices.txt", randomToken[0].name + "\n", {encoding:'utf8',flag:'a+'}, err => {
          fs.writeFileSync(fileName, randomToken[0].name + "\n", {encoding:'utf8',flag:'a+'}, err => {
              if (err) {
              throw err;
            }
          });
        }

        // Allow trx through with at least 1 identified DEX yielding an ETH token profit 
        // i.e. receivedAmount > "AMT_WEI" ETH
        if (presortedArbOpps.length > 0) {
          // Sort by receivedAmount
          const sortedArbOpps = presortedArbOpps.sort((a, b) => parseFloat(a.receivedAmount) - parseFloat(b.receivedAmount));
          console.log("sortedArbOpps.length ", sortedArbOpps.length);
          console.log(`sortedArbOpps ARRAY (RECEIVEDAMOUNT > ${web3.utils.fromWei(AMT_WEI.toString())} ETH)`);
          console.log(sortedArbOpps);
          //
          //IMPORTANT TO RETAIN THIS TEST CASE CODE BLOCK!!!!!!!!!!!!
          //TEST CASE SCENARIO #1 - BUY EXPENSIVE SELL CHEAP
          //const swapParams1 = {
          //  fromTokenAddress: wethAddress,          // WETH
          //  toTokenAddress: randomToken[0].address, // OTHER
          //  amount: AMT_WEI.toString(),
          //  fromAddress: metaMaskAccount,
          //  slippage: 1,
          //  disableEstimate: true,
          //  allowPartialFill: false
          //};
          //const swapTransaction1 = await buildTxForSwap('/swap', swapParams1);
          //const methodSignature1 = await decodeSignature('https://sig.eth.samczsun.com/api/v1/signatures?function=', swapTransaction1.data.slice(0, 10));
          //const iface = new ethers.utils.Interface([
          //  "function " + methodSignature1
          //  ]);
          //const decodedData1 = iface.decodeFunctionData(methodSignature1, swapTransaction1.data);
          //const receivedAmountOneInch = decodedData1[1];
          //console.log("receivedAmountOneInch ", receivedAmountOneInch.toString());
          //let receivedAmountUniswap;
          //try {
          //  receivedAmountUniswap = ((await uniRouter.functions.getAmountsOut(receivedAmountOneInch.toString(), [randomToken[0].address,wethAddress]))[0][1]).toString()
          //} catch (error) {
          //  receivedAmountUniswap = ethers.BigNumber.from(0);
          //}
          //console.log("receivedAmountUniswap ", receivedAmountUniswap.toString());
          //console.log("TEST CASE SCENARIO #1 - BUY EXPENSIVE SELL CHEAP: ", receivedAmountUniswap.toString(), "ETH");
          //TEST CASE SCENARIO #2 - BUY CHEAP SELL EXPENSIVE
          //let receivedAmountUniswap2;
          //try {
          //  receivedAmountUniswap2 = ((await uniRouter.functions.getAmountsOut(AMT_WEI.toString(), [wethAddress,randomToken[0].address]))[0][1]).toString()
          //} catch (error) {
          //  receivedAmountUniswap2 = ethers.BigNumber.from(0);
          //}
          //console.log("receivedAmountUniswap2 ", receivedAmountUniswap2.toString());
          //const swapParams2 = {
          //  fromTokenAddress: randomToken[0].address, // OTHER
          //  toTokenAddress: wethAddress,              // WETH
          //  amount: receivedAmountUniswap2.toString(),
          //  fromAddress: metaMaskAccount,
          //  slippage: 1,
          //  disableEstimate: true,
          //  allowPartialFill: false
          //};
          //const swapTransaction2 = await buildTxForSwap('/swap', swapParams2);
          //const methodSignature2 = await decodeSignature('https://sig.eth.samczsun.com/api/v1/signatures?function=', swapTransaction2.data.slice(0, 10));
          //const iface2 = new ethers.utils.Interface([
          //  "function " + methodSignature2
          //  ]);
          //const decodedData2 = iface2.decodeFunctionData(methodSignature2, swapTransaction2.data);
          //const receivedAmountOneInch2 = decodedData2[1];
          //console.log("TEST CASE SCENARIO #2 - BUY CHEAP SELL EXPENSIVE: ", receivedAmountOneInch2[5].toString(), "ETH");
          //return;
          //
          const receivedAmount = sortedArbOpps[sortedArbOpps.length-1].receivedAmount;

          let route;
          if (sortedArbOpps[0].type == 'FORK' && sortedArbOpps[sortedArbOpps.length-1].type == 'ONEINCH' )
            route = "UNISWAP_TO_ONEINCH";
          if (sortedArbOpps[0].type == 'ONEINCH' && sortedArbOpps[sortedArbOpps.length-1].type == 'FORK' )
            route = "ONEINCH_TO_UNISWAP";
          if (sortedArbOpps[0].type == 'FORK' && sortedArbOpps[sortedArbOpps.length-1].type == 'FORK' )
            route = "UNISWAP_TO_UNISWAP";
          console.log("ROUTE:      ", route, "(", DIRECTION[`${route}`], ")");

          let swapParams;
          if (route == "UNISWAP_TO_ONEINCH" || route == "UNISWAP_TO_UNISWAP") {
            swapParams = {
              fromTokenAddress: wethAddress,          // WETH
              toTokenAddress: randomToken[0].address, // OTHER
              amount: AMT_WEI.toString(),
              fromAddress: flashLoanAddress,
              slippage: 1,
              disableEstimate: true,
              allowPartialFill: false
            };
          }
          if (route == "ONEINCH_TO_UNISWAP") {
            swapParams = {
              fromTokenAddress: randomToken[0].address, // OTHER
              toTokenAddress: wethAddress,              // WETH
              amount: rate,
              fromAddress: flashLoanAddress,
              slippage: 1,
              disableEstimate: true,
              allowPartialFill: false
            };
          }

          let swapParameters;
          let swapTransaction;
          //if (route == "UNISWAP_TO_ONEINCH" || route == "ONEINCH_TO_UNISWAP") {
          swapParameters = ethers.utils.defaultAbiCoder.encode(
            [ "tuple(address fromTokenAddress, address toTokenAddress, uint256 amount, address fromAddress, uint slippage, bool disableEstimate, bool allowPartialFill)" ],
            [
              swapParams
            ]
          );
          // First, let's build the body of the transaction
          swapTransaction = await buildTxForSwap('/swap', swapParams);
          //console.log("swapTransaction ", swapTransaction);
          //const methodSignature = await decodeSignature('https://sig.eth.samczsun.com/api/v1/signatures?function=', swapTransaction.data.slice(0, 10));
          //console.log("methodSignature ", methodSignature);
          //console.log("function " + methodSignature);
          //const method = methodSignature.slice( 0, methodSignature.indexOf("("));
          //console.log("method " + method);
          //const iface = new ethers.utils.Interface([
          //  "function " + methodSignature
          //  ]);
          //const decodedData = iface.decodeFunctionData(methodSignature, swapTransaction.data);
          //}
          //console.log("Highest price             (DEX_A) ", sortedPrices[sortedPrices.length-1].name);
          console.log("Highest price             (DEX_A) ", sortedPricesExpensiveExchange[sortedPricesExpensiveExchange.length-1].name);
          console.log("Highest ETH profitability (DEX_B) ", sortedArbOpps[sortedArbOpps.length-1].name);
          //console.log(`DIRECTION['${route}']`);
          //console.log("AMT_WEI          ", AMT_WEI.toString());
          //console.log("cheapFactory     ", sortedArbOpps[sortedArbOpps.length-1].factory);
          //console.log("cheapRouter      ", sortedArbOpps[sortedArbOpps.length-1].router);
          //console.log("expensiveRouter  ", sortedPrices[sortedPrices.length-1].router);
          //console.log("wallet           ", metaMaskAccount);
          //console.log("oneSwapParams    ", swapParameters);
          //(route == "UNISWAP_TO_ONEINCH" || route == "ONEINCH_TO_UNISWAP" ? console.log("oneSwapData      ", swapTransaction.data) : console.log("oneSwapData      ", ZERO_DATA));
          // Common callData regardless of route
          ///////////////////////////////////////////////////////////////////////////////////////////////
          //Dump empirical information about the arbitrage opportunity into a .txt file
          const timeElapsed101 = Date.now();
          const today101 = new Date(timeElapsed101);
          const dateString101 = (today101.getDate() < 10 ? "0" + today101.getDate() : today101.getDate()) + "_" + 
                            ((today101.getMonth()+1) < 10 ? "0" + (today101.getMonth()+1) : (today101.getMonth()+1)) + "_" + 
                            today101.getFullYear() + "_" + 
                            (today101.getHours() < 10 ? "0" + today101.getHours() : today101.getHours()) + ":" +
                            (today101.getMinutes() < 10 ? "0" + today101.getMinutes() : today101.getMinutes()) + ":" +
                            (today101.getSeconds() < 10 ? "0" + today101.getSeconds() : today101.getSeconds());
          let data101;
          data101 =  "============================================";
          data101 += "\n" + dateString101 + "\n";
          data101 += "--------------------------------------------" + "\n";
          data101 += "TOKEN DETAILS (highest priced DEX)" + "\n";
          data101 += "network        =" + ( chainNetwork == 1 ? "Ethereum" :
                                            chainNetwork == 2 ? "Polygon" :
                                            chainNetwork == 3 ? "Avalanche" :
                                            chainNetwork == 4 ? "Arbitrum" : "BSC" ) + "\n";
          data101 += "token          =" + randomToken[0].name + "\n";
          data101 += "DEX            =" + sortedPricesExpensiveExchange[sortedPricesExpensiveExchange.length-1].name + "\n";
          data101 += "price          =" + sortedPricesExpensiveExchange[sortedPricesExpensiveExchange.length-1].price.toString() + "\n";
          data101 += "--------------------------------------------" + "\n";
          data101 += "TRX COSTS (greatest \"receivedAmount\" DEX)" + "\n";
          data101 += "--------------------------------------------" + "\n";
          data101 += "DEX            =" + sortedArbOpps[sortedArbOpps.length-1].name + "\n";
          data101 += "receivedAmount =" + receivedAmount.toString() + "\n";
          data101 += "\n";

          fs.writeFileSync("capturedArbOpps.txt", data101, {encoding:'utf8',flag:'a+'}, err => {
            if (err) {
              throw err;
            }
          });
          ///////////////////////////////////////////////////////////////////////////////////////////////
          // Calculate arbitrage trx cost
          // The purpose of gas limit is to specify the maximum amount of gas you are willing to consume in a transaction. 
          // EIP-1559 introduces a maxFeePerGas and maxPriorityFeePerGas. 
          // These values determine how much you are willing to pay per gas used by the transaction.
          // Similarly to how the gas price works, if your transaction has a maxPriorityFeePerGas of 10 Gwei and 
          // your transaction uses 21,000 gas (gasLimit), you will end up paying (at most) 21,000 × 10 Gwei = 0.00021 Ether.
          //
          // For an EIP-1559 transaction, the maxFeePerGas and maxPriorityFeePerGas are used
          // maxFeePerGas = (2 * baseFeePerGas) + maxPriorityFeePerGas
          // trx cost (gasCost) = gasLimit * maxFeePerGas
          //
          //1) baseFeePerGas, a standard charge that all users will pay which is determined by the network itself
          //2) maxPriorityFeePerGas, which is optional, determined by the user, and paid directly to the miner.
          //3) maxFeePerGas, which is the highest absolute value you are willing to pay per unit of Gas 
          // to include your transaction in the block.
          //
          const feeData = await walletWithProvider.getFeeData();
          //const newMaxPriorityFeePerGas = 2000000000; // 2 Gwei (uncongested network suggested "tip")
          const newMaxPriorityFeePerGas = 4000000000; // 4 Gwei(congested network)
          const newMaxFeePerGas = ((ethers.BigNumber.from("2")).mul(ethers.BigNumber.from(feeData["lastBaseFeePerGas"]))).add(ethers.BigNumber.from(newMaxPriorityFeePerGas));

          const callData = ethers.utils.defaultAbiCoder.encode(
            [ "tuple(uint direction, uint borrowAmount, address swapRouter, uint fee, address weth, address cheapRouter, address expensiveRouter, address metawallet, address wallet, bytes oneSwapParams, bytes oneSwapData)" ],
            [
              {
                direction: DIRECTION[`${route}`],
                borrowAmount: AMT_WEI.toString(),
                swapRouter: process.env.SWAP_ROUTER,
                fee: (foundUniswapV3Price.length > 0 ? poolFee : 0),
                weth: ( chainNetwork == 1 ? web3.utils.toChecksumAddress(process.env.WETH_ETHEREUM) :
                        chainNetwork == 2 ? web3.utils.toChecksumAddress(process.env.WETH_POLYGON) :
                        chainNetwork == 3 ? web3.utils.toChecksumAddress(process.env.WETH_AVALANCHE) :
                        chainNetwork == 4 ? web3.utils.toChecksumAddress(process.env.WETH_ARBITRUM) :
                        web3.utils.toChecksumAddress(process.env.WETH_BSC) ),
                cheapRouter: sortedArbOpps[sortedArbOpps.length-1].router,
                expensiveRouter: sortedPricesExpensiveExchange[sortedPricesExpensiveExchange.length-1].router,
                metawallet: metaMaskAccount,
                wallet: cryptoAccount,
                oneSwapParams: swapParameters,
                oneSwapData: (route == "UNISWAP_TO_ONEINCH" || route == "ONEINCH_TO_UNISWAP" ? swapTransaction.data : ZERO_DATA)
              }
            ]
          );

          let gasLimit;
          try {
            gasLimit = await flashLoan.estimateGas.flashloan(callData);
          } catch (error) {
            gasLimit = ethers.BigNumber.from(21000); // Assumed 21000 minimum gas amount of an operation on Ethereum
          }
          //console.log("******************************************************************************");
          ///
          const txCost = gasLimit.mul(newMaxFeePerGas); // Total trx cost as per EIP 1559 formula
          //const txCost = gasLimit.mul(ethers.BigNumber.from(newMaxFeePerGas.toString())); // Total trx cost as per EIP 1559 formula
          console.log("ARBITRAGE TRX COST ", txCost.toString());
          // Sum all trx costs and deduct from receivedAmount to determine the profit
          // Subtract:
          // flashloan +
          // 0.9% AAVE flashloan fee + 
          // 0.3% per exchange (0.6% total) + 
          let profit;
          // Aave V2 - 0.9%
          //let uniswapFee = 1009000; // includes Aave V2 0.9% flashloan fee
          // Aave V3 - 0.05%
          let uniswapFee = 1000500; // includes Aave V3 0.05% flashloan fee
          if (sortedArbOpps[sortedArbOpps.length-1].name = "V3Uniswap")
            uniswapFee += poolFee + 3000; // UniswapV3 poolFee plus 0.3% Uniswapv2 fee
          else
            uniswapFee += (2*3000); // 0.3% fee per swap in a Uniswap fork DEX
          //profit = (ethers.BigNumber.from(receivedAmount)).sub(AMT_WEI.mul(10015).div(10000)).sub(txCost);
          profit = (ethers.BigNumber.from(receivedAmount)).sub(AMT_WEI.mul(uniswapFee).div(1000000)).sub(txCost);
          console.log("receivedAmount    ", receivedAmount.toString());
          console.log("AMT_WEI plus fees ", (AMT_WEI.mul(uniswapFee).div(1000000)).toString());
          console.log("TRX COST          ", txCost.toString());
          console.log("profit            ", profit.toString());
          ///////////////////////////////////////////////////////////////////////////////////////////////
          let data103;
          data103  = "txCost         =" + txCost.toString() + "\n";
          data103 += "profit         =" + profit.toString() + "\n";
          data103 += "\n";
          data103 += "\n";

          fs.writeFileSync("capturedArbOpps.txt", data103, {encoding:'utf8',flag:'a+'}, err => {
            if (err) {
              throw err;
            }
          });

          ///////////////////////////////////////////////////////////////////////////////////////////////
          if (profit > 0) {
            const options = {
                  maxPriorityFeePerGas: ethers.BigNumber.from(newMaxPriorityFeePerGas),
                  maxFeePerGas: newMaxFeePerGas,
                  gasLimit : gasLimit//ethers.BigNumber.from(gasLimit.toString())
            };

            console.log('Arb opportunity found 1Inch -> Uniswap!');
            console.log(`Expected profit: ${web3.utils.fromWei(profit)} ETH`);

            let tx;
            let receipt;

            tx = await flashLoan.flashloan(
                  callData,
                  options
            );

            console.log('ARBITRAGE EXECUTED! PENDING TX TO BE MINED');
            //console.log(tx);
        
            receipt = await tx.wait();
            //console.log("receipt ", receipt);
            console.log(`Transaction hash: ${receipt.transactionHash}`);
            //const data = receipt.logs[0].data
            for (const event of receipt.events) {
              //console.log(log.args.message, log.args.val.toString())
              console.log(event.args, event.decode.toString())
            }

            console.log('SUCCESS! TX MINED');

            //Dump empirical information about the arbitrage opportunity into a .txt file
            const timeElapsed = Date.now();
            const today = new Date(timeElapsed);
            const dateString = (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) + "_" + 
                              ((today.getMonth()+1) < 10 ? "0" + (today.getMonth()+1) : (today.getMonth()+1)) + "_" + 
                              today.getFullYear() + "_" + 
                              (today.getHours() < 10 ? "0" + today.getHours() : today.getHours()) + ":" +
                              (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()) + ":" +
                              (today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds());
            let opps;

            //write arbitrage line item to file for first time
            opps =  "============================================";
            opps += "\n" + dateString + "\n";
            opps += "--------------------------------------------" + "\n";
            opps += "TOKEN DETAILS (highest priced DEX)" + "\n";
            opps += "--------------------------------------------" + "\n";
            opps += "network        =" + ( chainNetwork == 1 ? "Ethereum" :
                                          chainNetwork == 2 ? "Polygon" :
                                          chainNetwork == 3 ? "Avalanche" :
                                          chainNetwork == 4 ?  "Arbitrum" : "BSC" ) + "\n";
            opps += "token          =" + randomToken[0].name + "\n";         
            opps += "DEX            =" + sortedPricesExpensiveExchange[i].name + "\n";
            opps += "price          =" + sortedPricesExpensiveExchange[i].price.toString() + "\n";
            opps += "--------------------------------------------" + "\n";
            opps += "TRX COSTS (highest \"receivedAmount\" DEX)" + "\n";
            opps += "--------------------------------------------" + "\n";
            opps += "DEX            =" + sortedArbOpps[sortedArbOpps.length-1].name + "\n";
            opps += "receivedAmount =" + receivedAmount.toString() + "\n";
            opps += "txCost         =" + txCost.toString() + "\n";
            opps += "profit         =" + profit.toString() + "\n";
            opps += "\n";
            opps += "\n";

            fs.writeFileSync("realisedArbOpps.txt", opps, {encoding:'utf8',flag:'a+'}, err => {
              if (err) {
                throw err;
              }
            });
          } // if (profit > 0)
        } // if (presortedArbOpps.length > 1)
      } // end if (sortedPrices.length > 1) {
    } catch(error) {
      console.log(error);
      ////mutex.release();
    } finally {
      ////mutex.release();
    } // end try block
  //});
}
const init = async () => {
  /*
  await new Promise((resolve, reject) => {
    let desiredBlock;
    provider.on("block", (blockNumber) => {
      if (!desiredBlock)
        desiredBlock = blockNumber+1;
      console.log("blockNumber  ", blockNumber);
      console.log("desiredBlock ", desiredBlock);
      if (blockNumber == desiredBlock) {
        console.log("inside");
        resolve();
        //provider.off();
      }
    })
    .on('error', error => {
      console.log(error);
    });
  });
  */
  let fileName;
  ( chainNetwork == 1 ? fileName = 'tokensSeveralPrices_Ethereum.txt' :
    chainNetwork == 2 ? fileName = 'tokensSeveralPrices_Polygon.txt' :
    chainNetwork == 3 ? fileName = 'tokensSeveralPrices_Avalanche.txt' :
    chainNetwork == 4 ? fileName = 'tokensSeveralPrices_Arbitrum.txt' :
    fileName = 'tokensSeveralPrices_BSC.txt' );

  await loadContracts();

  /*
  let cond = Promise.resolve();
  provider.on("block", async (blockNumber) => {

    // The current monitor queue we are (possibly) blocked on
    const lastCond = cond;

    // Queues a Promise to acquire the monitor for us, its resolve will release our lock
    let unlock;
    cond = cond.then(new Promise((resolve) => { unlock = resolve; })); 

    // Wait for the previous monitor's acquirer to release.
    await lastCond;

    try {
      // Your code here
      await executeCodeBlock(blockNumber);
    } catch (error) {
      console.log(error);
      // Make sure you don't "return" or throw here; if you never call the unlock below, the monitor will
      // never be unlocked and no instance of this closure will get a chance to run again.
    }

    // Release the monitor, allowing the next acquirer (if any) to acquire it
    unlock();
  })
  .on('error', error => {
    console.log(error);
  });
  */
  let count = 0;
  let clientLock = new Mutex();
  let clientSempahore = new Semaphore(1);

  // Network Delay Simulation
  async function serverDelay() {
    return new Promise(resolve => setTimeout(resolve, parseInt(Math.random() * 500)));
  }

  // Server Simulation
  function processCommand() {
    count += 1;
    return count;
  }

  provider.on("block", async (blockNumber) => {

    try {
      let release = await clientLock.acquire();
      await serverDelay();
      let number = processCommand();
      await serverDelay();

      let [semNumber, releaseSemaphore] = await clientSempahore.acquire();
      await executeCodeBlock(blockNumber);
    } catch (error) {
      
    } finally {
      clientSempahore.release();
      clientLock.release();
    }
  })
  .on('error', error => {
    console.log(error);
  });
}

init();
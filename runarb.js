require("dotenv").config()
const { ethers, utils } = require('ethers');
const hre = require("hardhat");
const web3 = require('web3');
const fs = require('fs');
const path = require('path');
let { ChainId, TokenAmount, Fetcher } = require('@uniswap/sdk');
const abis = require('./abis');
const { mainnet: addresses } = require('./addresses');
//const yesno = require('yesno');
const fetch = require('cross-fetch');

//const UniswapV2Factory = require("@uniswap/v2-core/build/IUniswapV2Factory.json");
//const UniswapV2Pair = require("@uniswap/v2-core/build/IUniswapV2Pair.json");
const UniswapV2Router02 = require("@uniswap/v2-periphery/build/IUniswapV2Router02.json");

// MetaMask account address
const metaMaskAccount = process.env.METAMASK_ACCOUNT;
// Flashloan address
const flashLoanAddress = process.env.FLASHLOAN;
const flashloanV2LibraryAddress = process.env.FLASHLOANV2LIB;

// use your own Infura node in production
const provider = new ethers.providers.InfuraProvider('homestead', process.env.INFURA_API_KEY);
let walletWithProvider = new ethers.Wallet(`0x${process.env.PRIVATE_KEY}`, provider);
// ethers
//const signer = provider.getSigner();
const walletAddress = metaMaskAccount;
//const privateKey = process.env.PRIVATE_KEY;
const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC);
const signer = wallet.connect(provider); // Set the provider for the wallet

const spread = 86; // 0.86% min spread to yield a profit on a swap token pair
const AMT_WEI = ethers.BigNumber.from(ethers.utils.parseUnits("1", 18));
const slippageBps = ethers.BigNumber.from("25");
const wethAddress = addresses.tokens.weth;
let selectedToken = addresses.tokens.dai/*sai*/; // 1inch is unsupported dydx token
//const AMOUNT_OTHER_WEI = ethers.BigNumber.from(ethers.utils.parseUnits(AMOUNT_OTHER, 18));

const DIRECTION = {
  "UNISWAPFORK_TO_ONEINCH": 0,
  "ONEINCH_TO_UNISWAPFORK": 1
};

const chainId = 1; // Ethereum
const apiBaseUrl = 'https://api.1inch.io/v4.0/' + chainId;

function apiRequestUrl(methodName, queryParams) {
  return apiBaseUrl + methodName + '?' + (new URLSearchParams(queryParams)).toString();
}

async function buildTxForSwap(swapParams) {
  const url = apiRequestUrl('/swap', swapParams);
  //console.log(url);
  return fetch(url).then(res => res.json()).then(res => res.tx);
}

async function buildTxForFuncSig(hexFunction) {
  const url = 'https://sig.eth.samczsun.com/api/v1/signatures?function=' + hexFunction;
  console.log(url);
  return fetch(url).then(res => res.json()).then(res => res.tx);
}

async function decodeSignature(baseURL, hash) {
  return await fetch(baseURL + hash)
      .then(res => res.json())
      .then(json => {
          return json.result.function[`${hash}`][0].name;
      });
}

// eslint-disable-next-line max-len
const MultiCallAbi = '[{"inputs":[{"components":[{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct MultiCall.Call[]","name":"calls","type":"tuple[]"}],"name":"multicall","outputs":[{"internalType":"bytes[]","name":"results","type":"bytes[]"},{"internalType":"bool[]","name":"success","type":"bool[]"}],"stateMutability":"view","type":"function"}]';
// eslint-disable-next-line max-len
const OffChainOracleAbi = '[{"inputs":[{"internalType":"contract MultiWrapper","name":"_multiWrapper","type":"address"},{"internalType":"contract IOracle[]","name":"existingOracles","type":"address[]"},{"internalType":"enum OffchainOracle.OracleType[]","name":"oracleTypes","type":"uint8[]"},{"internalType":"contract IERC20[]","name":"existingConnectors","type":"address[]"},{"internalType":"contract IERC20","name":"wBase","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract IERC20","name":"connector","type":"address"}],"name":"ConnectorAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract IERC20","name":"connector","type":"address"}],"name":"ConnectorRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract MultiWrapper","name":"multiWrapper","type":"address"}],"name":"MultiWrapperUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract IOracle","name":"oracle","type":"address"},{"indexed":false,"internalType":"enum OffchainOracle.OracleType","name":"oracleType","type":"uint8"}],"name":"OracleAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract IOracle","name":"oracle","type":"address"},{"indexed":false,"internalType":"enum OffchainOracle.OracleType","name":"oracleType","type":"uint8"}],"name":"OracleRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"contract IERC20","name":"connector","type":"address"}],"name":"addConnector","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IOracle","name":"oracle","type":"address"},{"internalType":"enum OffchainOracle.OracleType","name":"oracleKind","type":"uint8"}],"name":"addOracle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"connectors","outputs":[{"internalType":"contract IERC20[]","name":"allConnectors","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"srcToken","type":"address"},{"internalType":"contract IERC20","name":"dstToken","type":"address"},{"internalType":"bool","name":"useWrappers","type":"bool"}],"name":"getRate","outputs":[{"internalType":"uint256","name":"weightedRate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"srcToken","type":"address"},{"internalType":"bool","name":"useSrcWrappers","type":"bool"}],"name":"getRateToEth","outputs":[{"internalType":"uint256","name":"weightedRate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"multiWrapper","outputs":[{"internalType":"contract MultiWrapper","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"oracles","outputs":[{"internalType":"contract IOracle[]","name":"allOracles","type":"address[]"},{"internalType":"enum OffchainOracle.OracleType[]","name":"oracleTypes","type":"uint8[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"connector","type":"address"}],"name":"removeConnector","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IOracle","name":"oracle","type":"address"},{"internalType":"enum OffchainOracle.OracleType","name":"oracleKind","type":"uint8"}],"name":"removeOracle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract MultiWrapper","name":"_multiWrapper","type":"address"}],"name":"setMultiWrapper","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]';

//let kyber;
let flashLoan;
let multiCallContract;
let offChainOracleContract;
//let kyberPrice;
let oneinchPrice;
let uniswapPrice;
let sushiRouter;
let sushiPrice;
let shibaRouter;
let shibaPrice;
let pancakeRouter;
let pancakePrice;
let fraxRouter;
let fraxPrice;
let apeRouter;
let apePrice;

// 1inch off-chain tokens data - place additional tokens into this list
const tokens = [
    {
        address: '0x6b175474e89094c44da98b954eedeac495271d0f',  // DAI
        decimals: 18,
        name: 'DAI'
    },
    {
        address: '0x111111111117dc0aa78b770fa6a738034120c302',    // 1INCH
        decimals: 18,
        name: '1INCH'
    },
    {
        address: '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359',    // SAI
        decimals: 18,
        name: 'SAI'
    },
    {
        address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',  // USDC
        decimals: 6,
        name: 'USDC'
    },
    {
        address: '0xdac17f958d2ee523a2206206994597c13d831ec7',  // USDT
        decimals: 6,
        name: 'USDT'
    }
];

async function loadSetup() {
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
    //JSON.parse(MultiCallAbi),
    MultiCallAbi,
    walletWithProvider
  );

  sushiRouter = new ethers.Contract(
    web3.utils.toChecksumAddress('0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F'), //sushiswap v2 router (TVL $404.85m)
		UniswapV2Router02.abi, // minimum required
		walletWithProvider
	);

  shibaRouter = new ethers.Contract(
    web3.utils.toChecksumAddress('0x03f7724180AA6b939894B5Ca4314783B0b36b329'), //shibaswap v2 router (TVL $18.99m)
		UniswapV2Router02.abi, // minimum required
		walletWithProvider
	);

  pancakeRouter = new ethers.Contract(
    web3.utils.toChecksumAddress('0xEfF92A263d31888d860bD50809A8D171709b7b1c'), //pancakeswap v2 router (TVL $2.76b)
		UniswapV2Router02.abi, // minimum required
		walletWithProvider
	);

  fraxRouter = new ethers.Contract(
    web3.utils.toChecksumAddress('0xC14d550632db8592D1243Edc8B95b0Ad06703867'), //fraxswap v2 router (TVL $55.35m)
		UniswapV2Router02.abi, // minimum required
		walletWithProvider
	);

  apeRouter = new ethers.Contract(
    web3.utils.toChecksumAddress('0x5f509a3C3F16dF2Fba7bF84dEE1eFbce6BB85587'), //apeswap v2 router (TVL $46.96m)
    UniswapV2Router02.abi, // minimum required
		walletWithProvider
	);
  /*console.log(pancakeRouter.address);
  console.log(fraxRouter.address);
  console.log(apeRouter.address);*/
  //TODO explore more uniswap fork exchanges
  //https://ethereum.stackexchange.com/questions/102154/can-anyone-tell-me-the-names-of-known-uniswap-v2-forks
  //https://defillama.com/forks/Uniswap
}

async function getOffChainEthPrices() {
  let callData;
  let prices = {};
  // Ethereum Mainnet - gather token prices
  var offChainOracleAddress = '0x07D91f5fb9Bf7798734C3f606dB065549F6893bb'; 
  
  offChainOracleContract = new ethers.Contract(
    web3.utils.toChecksumAddress(offChainOracleAddress),
    OffChainOracleAbi,
    walletWithProvider
  );

  callData = tokens.map((token) => ({
    to: offChainOracleAddress,
    data: offChainOracleContract.interface.encodeFunctionData("getRateToEth", [ token.address, true ])
  }));

  multiCallContract.functions.multicall(callData)
  .then(({
      results,
      success,
  }) => {
      for (let i = 0; i < results.length; i++) {
          if (!success[i]) {
              continue;
          }
          const decodedRate = offChainOracleContract.interface.decodeFunctionResult("getRateToEth", results[i]).toString();
          const numerator = ethers.BigNumber.from(10).pow(tokens[i].decimals);
          const denominator = ethers.BigNumber.from(10).pow(18); // eth decimals
          const price = ethers.BigNumber.from(decodedRate).mul(numerator).div(denominator);
          prices[tokens[i].address] = price.toString();
      }
  })
  .catch((e) => {
    console.error(e); // "oh, no!"
  })

  return prices;
}

const init = async () => {
  await loadSetup();
  // retrieve off-chain token prices from 1inch network
  const prices = await getOffChainEthPrices();

  provider.on('block', async (blockNumber) => {
      console.log(`New block received. Block # ${blockNumber}`);
      const [other, weth] = await Promise.all(
        [web3.utils.toChecksumAddress(selectedToken),
         web3.utils.toChecksumAddress(addresses.tokens.weth)].map(tokenAddress => (
            Fetcher.fetchTokenData(
            ChainId.MAINNET,
            tokenAddress,
            walletWithProvider
          )
      )));
      const otherWeth = await Fetcher.fetchPairData(
        other,
        weth
      );
      console.log("step 1");
      const value = await pancakeRouter.functions.getAmountsOut(AMT_WEI.toString(), [wethAddress, selectedToken]);
      console.log("value ", await value);
      //console.log(apeRouter.functions); // getAmountsOut(uint256,address[])
      const amountsOth = await Promise.all([
          ethers.BigNumber.from((ethers.utils.parseUnits((1 / web3.utils.fromWei(prices[selectedToken])).toString(), 18)).toString()),
          otherWeth.getOutputAmount(new TokenAmount(weth, AMT_WEI)),
          sushiRouter.functions.getAmountsOut(AMT_WEI.toString(), [wethAddress, selectedToken]),
          shibaRouter.functions.getAmountsOut(AMT_WEI.toString(), [wethAddress, selectedToken])//,
          //pancakeRouter.functions.getAmountsOut(AMT_WEI.toString(), [wethAddress, selectedToken]),
          //fraxRouter.functions.getAmountsOut(AMT_WEI.toString(), [wethAddress, selectedToken]),
          //apeRouter.functions.getAmountsOut(AMT_WEI.toString(), [wethAddress, selectedToken])

      ]);
      console.log("step 2");
      setTimeout(() => {
        console.log("----------------------------------------------------------");
        //oneinchPrice = amountsOth[0];
        const amtWei = AMT_WEI.div(ethers.BigNumber.from(ethers.utils.parseUnits("1", 18)));
        oneinchPrice = amountsOth[0].mul(amtWei);
        uniswapPrice = amountsOth[1][0].raw;
        sushiPrice = amountsOth[2][0][1];
        shibaPrice = amountsOth[3][0][1];
        //pancakePrice = amountsOth[4];
        //fraxPrice = amountsOth[4];
        //apePrice = amountsOth[4];

        console.log("1inch (offchain):   ", oneinchPrice.toString());
        console.log("Uniswap (onchain):  ", uniswapPrice.toString());
        console.log("Sushiswap (onchain):   ", sushiPrice.toString());
        console.log("Shibaswap (onchain):   ", shibaPrice.toString());
        //console.log("Pancakeswap (onchain):   ", pancakePrice.toString());
        //console.log("Fraxswap (onchain):   ", fraxPrice.toString());
        //console.log("Apeswap (onchain):   ", apePrice.toString());

        console.log("----------------------------------------------------------");
        let data;
        data = "1inchPrice=" + oneinchPrice.toString() + "<el1>\n";
        data += "uniswapPrice=" + uniswapPrice.toString() + "<el2>\n";
        data += "sushiPrice=" + sushiPrice.toString() + "<el3>\n";
        data += "shibaPrice=" + shibaPrice.toString() + "<el4>\n";

        fs.writeFile("marketPrices.txt", data,
        {
          encoding: "utf8",
          flag: "w",
          mode: 0o666
        },
        (err) => {
          if (err)
            console.log(err);
          else {}
        });
      }, 50);

      // For an EIP-1559 transaction, the maxFeePerGas and maxPriorityFeePerGas are used
      // New EIP 1559 formula for calculating total trx fee
      // TOTAL TRX FEE (gasCost) = gasLimit * maxFeePerGas
      // maxPriorityFeePerGas - incentive for the miner to execute the transaction
      // 					  - set 2 Gwei (normal/non-congested network) OR
      //   				      - higher Gwei (highly congested net)
      // maxFeePerGas - absolute max to pay per unit of gas to get your trx inc´d in a block
      // maxFeePerGas = (2 * baseFeePerGas) + maxPriorityFeePerGas
      // Need to specify 'gasLimit', 'maxPriorityFeePerGas', and 'maxFeePerGas'...
      // e.g 21840 * (2 * 50 + 2000000000) (wei) = 0.000044 ETH ($0.06 USD)
      // 
      const feeData = await walletWithProvider.getFeeData();

      const newMaxPriorityFeePerGas = 1000000000 / 2; // 0.5 Gwei
      const newMaxFeePerGas = (ethers.BigNumber.from("2").mul(ethers.BigNumber.from(feeData["lastBaseFeePerGas"]))).add(ethers.BigNumber.from(newMaxPriorityFeePerGas));

      // calculate constructor gas cost
      // Ethereum charges 20,000 gas per 256 bits
      // i.e. for 1 kilobyte of data, the price would be 640000 gas
      const contractPath0 = path.resolve(__dirname, './artifacts/contracts/Migrations.sol/Migrations.json')
      const data0 = fs.readFileSync(contractPath0, {encoding:'utf8', flag:'r'});
      const obj0 = JSON.parse(data0);
      const size0 = Buffer.byteLength(obj0.deployedBytecode, 'utf8') / 2;
      const byteGasCost0 = (201199 / size0); // per byte gas cost
      const deployGasCostMigrations = byteGasCost0 * size0; // 400

      const contractPath1 = path.resolve(__dirname, './artifacts/contracts/FlashloanV2Library.sol/FlashloanV2Library.json')
      const data1 = fs.readFileSync(contractPath1, {encoding:'utf8', flag:'r'});
      const obj1 = JSON.parse(data1);
      const size1 = Buffer.byteLength(obj1.deployedBytecode, 'utf8') / 2;
      const byteGasCost1 = (4636671 / size1); // per byte gas cost
      const deployGasCostFlashloanV2Library = byteGasCost1 * size1; // 400

      const contractPath2 = path.resolve(__dirname, './artifacts/contracts/Flashloan.sol/Flashloan.json')
      const data2 = fs.readFileSync(contractPath2, {encoding:'utf8', flag:'r'});
      const obj2 = JSON.parse(data2);
      const size2 = Buffer.byteLength(obj2.deployedBytecode, 'utf8') / 2;
      const byteGasCost2 = (2945746 / size2); // per byte gas cost
      const deployGasCostFlashloan = byteGasCost2 * size2;

      let deployGasCost = deployGasCostMigrations + deployGasCostFlashloanV2Library + deployGasCostFlashloan;
      deployGasCost = Math.floor(deployGasCost * 1.05);
      let estimateFlashloanGasLimit;

      const data = fs.readFileSync("marketPrices.txt").toString();
      oneinchPrice = ethers.BigNumber.from( data.slice( (data.indexOf("1inchPrice=") + 11), data.indexOf("<el1>")) );
      uniswapPrice = ethers.BigNumber.from( data.slice( (data.indexOf("uniswapPrice=") + 13), data.indexOf("<el2>")) );
      sushiPrice = ethers.BigNumber.from( data.slice( (data.indexOf("sushiPrice=") + 11), data.indexOf("<el3>")) );
      shibaPrice = ethers.BigNumber.from( data.slice( (data.indexOf("shibaPrice=") + 11), data.indexOf("<el4>")) );

      const swapPrices = [{
                            "name": "Oneinch",
                            "price": oneinchPrice,
                            "type": "NONFORK"
                          }, 
                          { 
                            "name": "Uniswap",
                            "price": uniswapPrice,
                            "type": "FORK"
                          }, 
                          { 
                            "name": "Sushiswap",
                            "price": sushiPrice,
                            "type": "FORK"
                          }, 
                          { 
                            "name": "Shibaswap",
                            "price": shibaPrice,
                            "type": "FORK"
                          }
      ];
      const sortedPrices = swapPrices.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

      let route;
      if (sortedPrices[0].type == 'FORK')
        route = "UNISWAPFORK_TO_ONEINCH";
      console.log(route, ": ", DIRECTION[`${route}`]);
      return;

      let diffPrice;
      //if ( oneinchPrice.toString() != "0" ) {
        //TODO change IF condition to detect "XXXX_TO_ONEINCH" to subtract oneinchprice from sortedPrices[0].price (BigInt)
        //TODO change to only reflect sortedPrices[0].price (cheapest) vs sortedPrices[3].price (expensive) throughout
        //the below code
        if( oneinchPrice.gt(uniswapPrice) &&
            uniswapPrice.gt(sushiPrice) &&
            sushiPrice.gt(shibaPrice) ) {
          console.log(`oneinchPrice is greater than shibaPrice`);
          //only allow trx through with minimum %spread price difference achieved
          diffPrice = oneinchPrice.sub(uniswapPrice);
          const flag = (diffPrice.gte(oneinchPrice.sub(oneinchPrice.mul(10000-spread).div(10000))) ? true : false);

          if (flag) {
            const swapParams = {
              fromTokenAddress: wethAddress,  // WETH
              toTokenAddress: selectedToken,  // OTHER
              amount: AMT_WEI.toString(),
              fromAddress: flashLoanAddress,
              slippage: 1,
              disableEstimate: true,
              allowPartialFill: false
            };
            const swapParameters = ethers.utils.defaultAbiCoder.encode(
              [ "tuple(address fromTokenAddress, address toTokenAddress, uint256 amount, address fromAddress, uint slippage, bool disableEstimate, bool allowPartialFill)" ],
              [
                swapParams
              ]
            );
            //console.log("swapParameters ", swapParameters);
            // First, let's build the body of the transaction
            const swapTransaction = await buildTxForSwap(swapParams);
            //console.log(swapTransaction.data);
            //https://sig.eth.samczsun.com/api/v1/signatures?function=0x2e95b6c8
            const methodSignature = await decodeSignature('https://sig.eth.samczsun.com/api/v1/signatures?function=', swapTransaction.data.slice(0, 10));
            //console.log("methodSignature ", methodSignature);
            //console.log("function " + methodSignature);
            const method = methodSignature.slice( 0, methodSignature.indexOf("("));
            //console.log("method " + method);
            const iface = new ethers.utils.Interface([
              "function " + methodSignature
             ]);
            const decodedData = iface.decodeFunctionData(method, swapTransaction.data);
            //console.log("decodedData ", decodedData);
            //console.log("swapTransaction ", swapTransaction);
  
            const callData = ethers.utils.defaultAbiCoder.encode(
              //[ "tuple(uint direction, uint256 repayAmount, string caller, address srcToken, address dstToken, address srcReceiver, address dstReceiver, uint256 amount, uint256 minReturnAmount, uint256 guaranteedAmount, uint256 flags, address referrer, string permit, string[] calls)" ],
              [ "tuple(uint direction, uint256 repayAmount, bytes caller, address srcToken, address dstToken, address srcReceiver, address dstReceiver, uint256 amount, uint256 minReturnAmount, uint256 flags, bytes permit, bytes oneSwapParams, bytes oneSwapData)" ],
              [
                {
                  //TODO add new router UNISWAP FORK address as input parameter
                  direction: DIRECTION[`${route}`], 
                  repayAmount: ethers.BigNumber.from(0),
                  caller: '0x',
                  srcToken: wethAddress,
                  dstToken: selectedToken,
                  srcReceiver: metaMaskAccount,
                  dstReceiver: '0x0000000000000000000000000000000000000000',
                  amount: AMT_WEI,
                  minReturnAmount: ethers.BigNumber.from(0),  // Min dstToken amount expected out of this swap
                  flags: ethers.BigNumber.from(0),            // 0 = false disables most of the checks
                  permit: '0x',
                  oneSwapParams: swapParameters,
                  oneSwapData: swapTransaction.data
                }
              ]
            );
  
            estimateFlashloanGasLimit = await flashLoan.estimateGas.initiateFlashloan(callData);
            //console.log("estimateFlashloanGasLimit ", estimateFlashloanGasLimit.toString());
            //const txCost = ethers.BigNumber.from(gasCost).mul(ethers.BigNumber.from(gasPrice)).mul(ethPrice);
            const gasLimit = (ethers.BigNumber.from(deployGasCost)).add(estimateFlashloanGasLimit);
            const txCost = gasLimit.mul(ethers.BigNumber.from(newMaxFeePerGas)); // Total trx cost as per EIP 1559 formula
            //const profit = ethFromUniswap.sub(AMT_WEI).sub(txCost);
            //TODO to rectify profit statement
            const profit = oneinchPrice.sub(AMT_WEI).sub(txCost);
  
            if(profit > 0) {
              const options = {
                    maxPriorityFeePerGas: ethers.BigNumber.from(newMaxPriorityFeePerGas),
                    maxFeePerGas: ethers.BigNumber.from(newMaxFeePerGas),
                    gasLimit : ethers.BigNumber.from(gasLimit.toString())
              };
  
              console.log('Arb opportunity found 1Inch -> Uniswap!');
              console.log(`Expected profit: ${web3.utils.fromWei(profit)} Other`);
  
              let tx;
              let receipt;
  
              tx = await flashLoan.initiateFlashloan(
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
            }
          } else {
            const diffPriceFN = ethers.FixedNumber.from(diffPrice.toString());
            const oneinchPriceFN = ethers.FixedNumber.from(oneinchPrice.toString());
            const diff = diffPriceFN.divUnsafe(oneinchPriceFN).mulUnsafe(ethers.FixedNumber.from("100"));
            console.log(`Verdict: achieved ${diff.round(2).toString()}% vs. 0.${spread}% minimum expected price difference to yield a token profit`);
          }
        }

        //if( kyberPrice.gt(oneinchPrice) && (ethFromKyber.gt(AMT_WEI) || kyberSpreadInBps.lt(bps)) ) {
        //if( uniswapPrice.gt(oneinchPrice) ) {
        //  console.log(`uniswapPrice is greater than oneinchPrice`);
        //}
      //}
      //else
      //{
      //  //TODO - 1inch failed to retrieve any prices so swap with another DEX aggregator instead
      //  console.log(`oneinchPrice failed to retreive any prices for ${selectedToken}`);
      //}
    })
    .on('error', error => {
      console.log(error);
    });
}
init();
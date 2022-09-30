require('dotenv').config();
const BigNumber = require('bignumber.js');

const { INFURA_URL, INFURA_API_KEY, PRIVATE_KEY, METAMASK_ADDRESS } = process.env;
const { utils, providers } = require('ethers');
const Web3 = require('web3');

// use your own Infura node in production
const infuraProvider = new providers.InfuraProvider('mainnet', process.env.INFURA_API_KEY);
//console.log("infuraProvider ", infuraProvider);
const provider = new Web3.providers.HttpProvider(process.env.INFURA_URL + process.env.INFURA_API_KEY);
//const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const signer = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
web3.eth.accounts.wallet.add(signer);
//console.log("signer ", signer);
//console.log("provider ", provider);

// MetaMask accoount address
const metaMaskAccount = process.env.METAMASK_ADDRESS;

// your contract address
const flashLoanerAddress = process.env.FLASH_LOANER;
const minSpread = 5;				// Min 5% spread target
const maxGasCost = 555555555555555; // Max $0.75USD gas cost allowed
//import FlashloanArbitrage from "./build/contracts/FlashloanArbitrage.json";
const FlashloanArbitrage = require("./build/contracts/FlashloanArbitrage.json");

// uni/sushiswap ABIs
const UniswapV2Factory = require("./build/contracts/IUniswapV2Factory.json");
const UniswapV2Pair = require("./build/contracts/IUniswapV2Pair.json");
const UniswapV2Router02 = require("./build/contracts/IUniswapV2Router02.json");

// use your own Infura node in production

/*const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);*/

//const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);


/*console.log("provider ", provider);
console.log("wallet ", wallet);*/
//const ETH_TRADE = 10; // 10 ETH
const ETH_TRADE = 2020; //
//const OTHER_TRADE = 3500; // other token amount (in wei); 3500 DAI
const OTHER_TRADE = 4256853; // other token amount (in wei);
const otherAddress = '0x111111111117dC0aa78b770fA6A738034120C302'; // Etherscan 1INCH mainnet
//const otherAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F'; // Etherscan DAI mainnet
const wethAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'; // Etherscan WETH mainnet
const zeroAddress = '0x0000000000000000000000000000000000000000';

const BORROW_AMOUNT = 1000000 * 2; 		// DAI amount (in wei)
const amount = 1000000000000000000 * 1;	// 1 ETH (in wei)

const calcSell = async (contract, from_token, to_token) => {
    const oneToken = BigInt(amount.toString());
    const price = await contract.functions.getAmountsOut(oneToken, [from_token, to_token]);
    let normalizedPrice = [];
    normalizedPrice[0] = Number(utils.formatUnits(price[0][0], 18));
    normalizedPrice[1] = Number(utils.formatUnits(price[0][1], 18));
    return normalizedPrice;
};

let uniswapFactory;
let otherFactory;
let uniswapEthOther;
let otherEthOther;
let uniswapRouter;
let otherswapRouter;
let flashloanArbitrage;

async function loadSetup() {
	//console.log("creating uniswapFactory....");
	uniswapFactory = new web3.eth.Contract(
		UniswapV2Factory.abi, // minimum required
		'0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f' // Mainnet/Rinkeby
	);
	uniswapFactory.setProvider(provider);
	//console.log("creating otherFactory....");
	otherFactory = new web3.eth.Contract(
		UniswapV2Factory.abi, // minimum required
		//'0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73', // Pancake Mainnet
		'0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac' // Sushi Mainnet
	);
	otherFactory.setProvider(provider);
	//console.log("creating uniswapRouter....");
	uniswapRouter = new web3.eth.Contract(
		UniswapV2Router02.abi, // minimum required
		'0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D' //uniswap v2 router mainnet/rinkeby
	);
	uniswapRouter.setProvider(provider);
	//console.log("creating otherswapRouter....");
	otherswapRouter = new web3.eth.Contract(
		UniswapV2Router02.abi, // minimum required
		//'0x10ED43C718714eb63d5aA57B78B54704E256024E', //pancakeswap v2 router mainnet
		'0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F' //sushiswap v2 router mainnet
	);
	otherswapRouter.setProvider(provider);
	//console.log("creating uniswapEthOther....");
	uniswapEthOther = new web3.eth.Contract(
		UniswapV2Pair.abi, // minimum required
		await uniswapFactory.methods.getPair(otherAddress, wethAddress).call()
	);
	uniswapEthOther.setProvider(provider);
	console.log("uniswapEthOther address ", uniswapEthOther.options.address);
	//console.log("creating otherEthOther....");
	otherEthOther = new web3.eth.Contract(
		UniswapV2Pair.abi, // minimum required
		await otherFactory.methods.getPair(otherAddress, wethAddress).call()
		//await otherFactory.getPair(otherAddress, wethAddress)
	);
	otherEthOther.setProvider(provider);
	console.log("otherEthOther address ", await otherEthOther.options.address);
	//console.log("creating flashloanArbitrage....");
	flashloanArbitrage = new web3.eth.Contract(
		FlashloanArbitrage.abi,
		flashLoanerAddress
	);
	flashloanArbitrage.setProvider(provider);
	console.log("flashloanArbitrage address ", flashloanArbitrage.options.address);

	try {
		const uniswapReserves = await uniswapEthOther.methods.getReserves().call();
		const sushiswapReserves = await otherEthOther.methods.getReserves().call();
		console.log("uniswapReserves[0] OTHER ", Number(utils.formatEther(uniswapReserves[0])));
		console.log("uniswapReserves[1] WETH ", Number(utils.formatEther(uniswapReserves[1])));
		console.log("sushiswapReserves[0] OTHER ", Number(utils.formatEther(sushiswapReserves[0])));
		console.log("sushiswapReserves[1] WETH ", Number(utils.formatEther(sushiswapReserves[1])));
	} catch (error) {
		console.log("error text ", error);
	}	
};

async function init() {
	console.log("inside..............");
	await loadSetup();
	console.log("outside..............");

	//provider.on('block', async (blockNumber) => {
	infuraProvider.on('block', async (blockNumber) => {
		try {
		  console.log("blockNumber ", blockNumber);
		  //const block = await provider.getBlock("pending");
		  const priceUniswap = (await calcSell(uniswapRouter,wethAddress,otherAddress))[1];
		  const priceOtherswap = (await calcSell(otherswapRouter,wethAddress,otherAddress))[1];
	  
		  //const uniswapReserves = await uniswapEthOther.functions.getReserves();
		  const uniswapReserves = uniswapEthOther.methods.getReserves().call();
		  //const sushiswapReserves = await otherEthOther.functions.getReserves();
		  const sushiswapReserves = otherEthOther.methods.getReserves().call();

		  const shouldStartEth = priceUniswap < priceOtherswap;
		  const spread = Math.abs((priceOtherswap / priceUniswap - 1) * 100) - 0.6;
		  console.log("spread ", spread);
		  console.log("shouldStartEth ", shouldStartEth);
		  // PRODUCTION: remove this "result" statement
		  const result = (shouldStartEth ? ETH_TRADE : OTHER_TRADE)
			 / Number(
			   utils.formatEther(uniswapReserves[shouldStartEth ? 1 : 0]),
		    );
			//delete comment in production
		  const val = (shouldStartEth ? ETH_TRADE : OTHER_TRADE);
		  console.log("uniswapReserves[0] OTHER ", Number(utils.formatEther(uniswapReserves[0])));
		  console.log("uniswapReserves[1] WETH ", Number(utils.formatEther(uniswapReserves[1])));
		  console.log("sushiswapReserves[0] OTHER ", Number(utils.formatEther(sushiswapReserves[0])));
		  console.log("sushiswapReserves[1] WETH ", Number(utils.formatEther(sushiswapReserves[1])));
          console.log("val ", val);
		  console.log("result ", result);
		  console.log("Number ", Number(utils.formatEther(uniswapReserves[shouldStartEth ? 1 : 0]),));
		  
		  const shouldTrade = spread > (
			(shouldStartEth ? ETH_TRADE : OTHER_TRADE)
			 / Number(
			   utils.formatEther(uniswapReserves[shouldStartEth ? 1 : 0]),
			 ));
		  console.log(`UNISWAP PRICE ${priceUniswap}`);
		  console.log(`SUSHISWAP PRICE ${priceOtherswap}`);
		  console.log(`PROFITABLE? ${shouldTrade}`);
		  console.log(`CURRENT SPREAD: ${Math.abs((priceOtherswap / priceUniswap - 1) * 100)}%`);
		  console.log(`ABSOLUTE SPREAD: ${spread}`);
	
		  if (!shouldTrade)
		  {
			(!shouldStartEth 
				? 
				console.log("propose new OTHER_TRADE: ", Math.round((spread - 0.5) * Number(utils.formatEther(uniswapReserves[shouldStartEth ? 1 : 0]))))
				:
				console.log("propose new ETHER_TRADE: ", Math.round((spread - 0.5) * Number(utils.formatEther(uniswapReserves[shouldStartEth ? 1 : 0]))))
			)
			return;
		  }
		  // The gas price (in wei)...
		  const feeData = await provider.getFeeData();
		  
		  //For an EIP-1559 transaction, the maxFeePerGas and maxPriorityFeePerGas are used
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
		  // Sum up the total gasLimit for method invocations to be used in the trx
		  
		 //TODO: put condition if exp to buy in Uniswap, perform flashloan in Sushiswap or viceversa
		 
		 /* const gasLimit = await sushiEthDai.estimateGas.swap(
			!shouldStartEth ? DAI_TRADE : 0,
			shouldStartEth ? ETH_TRADE : 0,
			flashLoanerAddress,
			utils.toUtf8Bytes('1'),
		  );*/
		  //TODO: first deploy TestFlashloanArbitrage into mainnet, get contract.address, store it
		  // in FLASH_LOANER key, then copy contract.address in flashLoanerAddress variable at the top
		  // then reinstate both gasLimit statements below and should work!

		  // Calculate flashloan swap gas cost....
		  //console.log("otherEthDai.estimateGas.swap...");

		  //TODO estimateGas for setting factory, router values
		  let gasLimitFlashloan;
		  let gasLimitUniswapV2Call;
		  /*let newIns;
		  //contract = await TestUniswapLiquidity.new();
		  
		  newIns = await FlashloanArbitrage(
			!shouldStartEth ? otherFactory.address : uniswapFactory.address,
			shouldStartEth ? otherswapRouter.address : uniswapRouter.address
		  );*/

		  if (!shouldStartEth) {
			flashloanArbitrage.factory = otherFactory.address;
			flashloanArbitrage.router = uniswapRouter.address;
		  } else {
			flashloanArbitrage.factory = uniswapFactory.address;
			flashloanArbitrage.router = otherswapRouter.address;
		  }
		  
		  gasLimitFlashloan = await flashloanArbitrage.estimateGas.startArbitrage(
			//!shouldStartEth ? otherFactory.address : uniswapFactory.address,	// flashloanFactory
			//!shouldStartEth ? uniswapFactory.address : otherFactory.address,	// tradeFactory
			metaMaskAccount,
			wethAddress,
			otherAddress,
	  		shouldStartEth ? ETH_TRADE : 0,
			!shouldStartEth ? OTHER_TRADE : 0,/*,{
	  			gasLimit : ethers.BigNumber.from(50000)
	  		}*/
	  	  );
		  gasLimitUniswapV2Call = await flashloanArbitrage.estimateGas.uniswapV2Call(
			flashLoanerAddress,
			shouldStartEth ? ETH_TRADE : 0,
			!shouldStartEth ? OTHER_TRADE : 0,
			utils.toUtf8Bytes('not empty')
		  );
		  //const gasLimit = Number(gasLimit);
		  const newMaxPriorityFeePerGas = 1000000000; // 1 Gwei
		  const newMaxFeePerGas = (2 * Number(feeData["lastBaseFeePerGas"])) + newMaxPriorityFeePerGas;	
		  
		  const gasLimit = Number(gasLimitFlashloan) + Number(gasLimitUniswapV2Call);
		  const gasCost = Number(gasLimit) * newMaxFeePerGas; // Total trx cost as per EIP 1559 formula
		  
		  console.log("gasLimitFlashloan: ", Number(utils.formatEther(gasLimitFlashloan)));
		  console.log("gasLimitUniswapV2Call: ", Number(utils.formatEther(gasLimitUniswapV2Call)));
		  console.log("gasLimit: ", Number(gasLimit));

		  let shouldSendTx = false;
		  //if (spread > minSpread && gasCost < maxGasCost)
		  if (spread > minSpread)
		  	shouldSendTx = true;
		  
		  //console.log(`gasPrice: ${gasPrice}`); // no longer applicable post-EIP 1559
		  const gasCostEth = web3.utils.fromWei(String(gasCost), 'ether');
		  console.log(`GAS COST: ${gasCost} (${gasCostEth} ETH)`);
		  console.log(`shouldSendTx: ${shouldSendTx}`);
		  // don't trade if gasCost is higher than the spread
		  if (!shouldSendTx) return;
		
		  /*const options = {
			//gasPrice,
			//gasLimit,
		  };*/
		  const options = {
			maxPriorityFeePerGas: ethers.BigNumber.from(newMaxPriorityFeePerGas),
			maxFeePerGas: ethers.BigNumber.from(newMaxFeePerGas),
			gasLimit : ethers.BigNumber.from(gasLimit)
		  };

		  let tx;
		  
		  tx = await flashloanArbitrage.startArbitrage(
			metaMaskAccount,														// flag for flashloan vs. trade swaps
			wethAddress,
			otherAddress,
	  		shouldStartEth ? ETH_TRADE : 0,
			!shouldStartEth ? OTHER_TRADE : 0,
			options
	  	  );
		  
		  for (const log of tx.logs) {
			console.log(log.args.message, log.args.val.toString())
		  }

		  console.log('ARBITRAGE EXECUTED! PENDING TX TO BE MINED');
		  console.log(tx);
	
		  await tx.wait();
	
		  console.log('SUCCESS! TX MINED');
		} catch (err) {
		  //console.error(err);
		  //console.log("Failure reason: ", err.reason);
		  //console.log("Failure message: ", err.message);
		}
	});
}

init();

module.exports = function(callback) {
	// TODO: implement your actions
	// invoke callback
	callback();
};

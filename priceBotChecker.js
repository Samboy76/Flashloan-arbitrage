require('dotenv').config();
const BigNumber = require('bignumber.js');

//const { WETH, ONEINCH, INFURA_URL, METAMASK_ADDRESS } = process.env;
const { INFURA_URL, INFURA_API_KEY, PRIVATE_KEY, METAMASK_ADDRESS } = process.env;

const { ChainId, Token, Fetcher, WETH, Pair, TokenAmount, FACTORY_ADDRESS, INIT_CODE_HASH } = require ('@uniswap/sdk');
const { pack, keccak256 } = require ('@ethersproject/solidity');
const { getCreate2Address } = require ( '@ethersproject/address');

//const ethers = require('ethers');
const { utils } = require('ethers');
const Web3 = require('web3');
//const contract = require('@truffle/contract');
const contract = require('web3-eth-contract');

//const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL + process.env.INFURA_API_KEY));
const provider = new Web3.providers.HttpProvider(process.env.INFURA_URL + process.env.INFURA_API_KEY);
//const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const signer = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
web3.eth.accounts.wallet.add(signer);
//console.log("signer ", signer);
//console.log("provider ", provider);
console.log("finished provider construction");

//const contract = new web3.eth.Contract(configData.abi, configData.contractAddress, { from: configData.user[userName].account });

//console.log(web3);
//const Web3 = require('web3');
//const web31 = new Web3("https://mainnet.infura.io/v3:443");
//const web31 = new Web3(process.env.INFURA_URL);

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

//const calcSell = async (contract: { functions: any; }, from_token: string, to_token: string) => {
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
	/*const provider = new Web3.providers.HttpProvider("http://localhost:8545");
	const contractArtifact = require("./path/to/contractArtifact.json"); //produced by Truffle compile
	const contract = require("@truffle/contract");
	const MyContract = contract(contractArtifact);
	const MyContract = contract({
		abi: [...], // minimum required
		address: "0x...", // optional
		// many more
		});

		MyContract.setProvider(provider);*/
	try {
		console.log("creating uniswapFactory1....");
		uniswapFactory = new web3.eth.Contract(
			UniswapV2Factory.abi, // minimum required
			'0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f' // Mainnet/Rinkeby
		);
		/*uniswapFactory = contract({
			abi: UniswapV2Factory.abi, // minimum required
			address: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f' // Mainnet/Rinkeby
		});
		uniswapFactory.setProvider(provider);*/
		console.log("done");
		console.log("uniswapFactory ", uniswapFactory.address);
	} catch (error) {
		console.log("error ", error);
	}
	console.log("creating uniswapFactory....");
	uniswapFactory = contract({
		abi: UniswapV2Factory.abi, // minimum required
		address: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f' // Mainnet/Rinkeby
	});
	uniswapFactory.setProvider(provider);
	/*uniswapFactory = new ethers.Contract(
		'0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f', // Mainnet/Rinkeby
		UniswapV2Factory.abi, signer
	);*/
	console.log("uniswapFactory ", uniswapFactory.address);
	console.log("creating otherFactory....");
	otherFactory = contract({
		abi: UniswapV2Factory.abi, // minimum required
		//address: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73', // Pancake Mainnet
		address: '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac' // Sushi Mainnet
	});
	otherFactory.setProvider(provider);
	/*otherFactory = new ethers.Contract(
		//'0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73', // Pancake Mainnet
		'0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac', // Sushi Mainnet
		UniswapV2Factory.abi, signer
	);*/
	console.log("otherFactory ", otherFactory.address);
	uniswapRouter = contract({
		abi: UniswapV2Router02.abi, // minimum required
		address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D' //uniswap v2 router mainnet/rinkeby
	});
	uniswapRouter.setProvider(provider);
	/*uniswapRouter = new ethers.Contract(
		'0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', //uniswap v2 router mainnet/rinkeby
		UniswapV2Router02.abi, 
		signer
	);*/
	console.log("uniswapRouter ", uniswapRouter.address);
	otherswapRouter = contract({
		abi: UniswapV2Router02.abi, // minimum required
		//address: '0x10ED43C718714eb63d5aA57B78B54704E256024E', //pancakeswap v2 router mainnet
		address: '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F' //sushiswap v2 router mainnet
	});
	otherswapRouter.setProvider(provider);
	/*otherswapRouter = new ethers.Contract(
		//'0x10ED43C718714eb63d5aA57B78B54704E256024E', //pancakeswap v2 router mainnet
		'0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F', //sushiswap v2 router mainnet
		UniswapV2Router02.abi, 
		signer
	);*/
	console.log("otherswapRouter ", otherswapRouter.address);
	uniswapEthOther = contract({
		abi: UniswapV2Pair.abi, // minimum required
		address: await uniswapFactory.getPair(otherAddress, wethAddress)
	});
	uniswapEthOther.setProvider(provider);
	/*uniswapEthOther = new ethers.Contract(
		await uniswapFactory.getPair(otherAddress, wethAddress),
		UniswapV2Pair.abi, 
		signer
	);*/
	console.log("uniswapEthOther ", uniswapEthOther.address);
	otherEthOther = contract({
		abi: UniswapV2Pair.abi, // minimum required
		address: await otherFactory.getPair(otherAddress, wethAddress)
	});
	otherEthOther.setProvider(provider);
	/*otherEthOther = new ethers.Contract(
		await otherFactory.getPair(otherAddress, wethAddress),
		UniswapV2Pair.abi, 
		signer
	);*/
	console.log("otherEthOther ", otherEthOther.address);
	flashloanArbitrage = contract({
		abi: FlashloanArbitrage.abi, // minimum required
		address: flashLoanerAddress
	});
	flashloanArbitrage.setProvider(provider);
	/*flashloanArbitrage = await new ethers.Contract(
		flashLoanerAddress,
		FlashloanArbitrage.abi,
		signer
	);*/
	console.log("flashloanArbitrage ", flashloanArbitrage.address);
	// SDK´s off-chain method of getPair function
	/*const uniswapEthOtherAddr = getCreate2Address(
		uniswapFactory.address,
		keccak256(['bytes'], [pack(['address', 'address'], [otherAddress, wethAddress])]),
		INIT_CODE_HASH
	);
	//console.log("uniswapEthOtherAddr ", uniswapEthOtherAddr);
	uniswapEthOther = new ethers.Contract(
		uniswapEthOtherAddr /*await uniswapFactory.methods.getPair(wethAddress, otherAddress).call(),
		UniswapV2Pair.abi, 
		provider
	);*/
	//console.log(UniswapV2Library);
	
	//(async () => {
	/*await uniswapEthOther.functions.getReserves().call()
	.then((reserves1) => {
		console.log("Problem resolved!");
		console.log(reserves1);
	})
	.catch((error) => {
		console.log("Problem rejected");
		console.log(error);
	});
	console.log("Finished............");
	  //})();*/

	//console.log("uniswapEthOther.address ", uniswapEthOther.address);
	//console.log("uniswapEthOther ", uniswapEthOther);
	//const reserves = uniswapEthOther.methods.getReserves().call();
	//let reserves;
	/*uniswapEthOther.functions.getReserves()
	.then(reserves => { 
		console.log("reserves ", reserves);
	})
	.catch((error) => {
		console.log("Promise rejected");
		console.error(error);
	});*/
	/*let response;
	try {
		response = await uniswapEthOther.functions.getReserves()
	} catch (error) {
		console.log('Error getting data', error);
		return Promise.reject(error);
	}
	finally {
		console.log("Finished 1............");
	}*/




	//console.log("reserves ", reserves);
	console.log("Finished............");
	//const reserves = uniswapEthOther.functions.getReserves();
	
	//console.log("uniswapEthOther ", uniswapEthOther);
	//calculate pair address with token0 and token1 on sushiswap/pancakeswap:
	/*otherEthOther = getCreate2Address(
		otherFactory.address,
		keccak256(['bytes'], [pack(['address', 'address'], [otherAddress, wethAddress])]),
		'0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303' // ref: https://github.com/sushiswap/sushiswap-sdk/blob/canary/src/constants/index.ts#L14
		//'0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5' // ref: https://github.com/pancakeswap/pancake-swap-sdk/blob/7d81106174e16d1f1c6c91a93558736282a39ec1/src/constants.ts#L24
	);*/
	/*otherEthOther = new ethers.Contract(
		await otherFactory.getPair(wethAddress, otherAddress),
		UniswapV2Pair.abi, 
		provider
	);
	console.log("otherEthOther ", otherEthOther);*/
};

//const calcSell = async (contract, from_token, to_token) => {
const getPair = async (other) => {
	const pairAddress = Pair.getAddress(other, WETH[other.chainId], provider);
	console.log("pairAddress ", pairAddress);
	//console.log("pairAddress ", pairAddress);
	console.log("STEP 1.......");
	const pairContract = new ethers.Contract(
		pairAddress,
		UniswapV2Pair.abi,
		provider
	);
	console.log("STEP 2.......");
	console.log("pairContract.address ", pairContract.address);
	let reserves;
	try {
		/*var pair = new web3.eth.Contract(liqABI, pairAddress);
        pair.methods.getReserves().call(function( err,Reserves) {
            console.log("Pair Reserves: ", Reserves);
        });*/
		//var pair1 = new ethers.Contract(UniswapV2Pair.abi, pairAddress, provider);
		//console.log("pair1 ", pair1);
		//var fgh = await pair1.methods.getReserves().call();
		//console.log("fgh ", fgh);
		//console.log(pairContract);
        const reserves = await pairContract.functions.getReserves();
		/*pairContract.functions.getReserves().call(function( err,Reserves) {	
            console.log("Pair Reserves: ", Reserves);
        });*/
		console.log("Pair Reserves: ", reserves);
		console.log("STEP 2b.......");
	
		//console.log("uniswapReserves[0] OTHER ", Number(utils.formatEther(Reserves[0])));
		//console.log("uniswapReserves[1] WETH ", Number(utils.formatEther(Reserves[1])));

		//await debug(reserves = await pairContract.getReserves());
		//reserves = await pairContract.methods.getReserves();
		console.log("STEP 3.......");
		//console.log("reserves ", reserves);
		//console.log("Reserves ", Reserves);
	} catch (error) {
		console.log("error text ", error);
	}
	
	const [reserve0, reserve1] = reserves;
  
	const tokens = [other, WETH[other.chainId]];
	const [token0, token1] = tokens[0].sortsBefore(tokens[1]) ? tokens : [tokens[1], tokens[0]];
  
	const pair = new Pair(new TokenAmount(token0, reserve0), new TokenAmount(token1, reserve1));
	return pair;
};

async function init() {
	console.log("step 1.....");
	//const OTHER = new Token(ChainId.MAINNET, otherAddress, 18);
	//OTHER.symbol = "1INCH";
	//OTHER.name = "1INCH Token";
	//console.log("OTHER ", OTHER);
	//console.log("FACTORY_ADDRESS ", FACTORY_ADDRESS);
	//console.log("INIT_CODE_HASH ", INIT_CODE_HASH);
	//const pair = await getPair(OTHER);
	//console.log("pair ", pair);
	//console.log("WETH ", WETH);
	//console.log("provider ", provider);
	/*let uniswapPair;
	try {
		uniswapPair = await Fetcher.fetchPairData(OTHER, WETH[OTHER.chainId], provider,);
		console.log("uniswapPair ", uniswapPair);
	} catch (error) {
		console.log("error text ", error);
	}

	console.log("uniswapPair.reserve0 ", Number(utils.formatEther(uniswapPair.reserve0)));
	console.log("uniswapPair.reserve1 ", Number(utils.formatEther(uniswapPair.reserve1)));

	console.log("uniswapPair.reserve0 ", uniswapPair.reserve0);
	console.log("uniswapPair.reserve1 ", uniswapPair.reserve1);
	
	//const uniswapPair = await Fetcher.fetchPairData(OTHER, WETH[OTHER.chainId], provider,);
	console.log("step 2.....");*/
	
	
	
	/*let uniswapFactory;
	let otherFactory;
	let uniswapEthOther;
	let otherEthOther;
	let uniswapRouter;
	let otherswapRouter;
	let flashloanArbitrage;

	console.log("flashloanArbitrage.address ", flashloanArbitrage.address);
	console.log("uniswapEthOther ", uniswapEthOther);
	console.log("otherEthOther ", otherEthOther);
	const uniswapEthOther2 = new ethers.Contract(
		uniswapEthOther,
		UniswapV2Pair.abi, wallet
	);
	//console.log("uniswapEthOther2 ", uniswapEthOther2);
	const uniswapReserves = await uniswapEthOther2.functions.getReserves();
	console.log("uniswapReserves ", uniswapReserves);
	//const sushiswapReserves = await otherEthOther.functions.getReserves();*/
	console.log("inside..............");
	await loadSetup();
	console.log("outside..............");
	
	provider.on('block', async (blockNumber) => {
		try {
		  console.log("blockNumber ", blockNumber);
		  //const block = await provider.getBlock("pending");
		  const priceUniswap = (await calcSell(uniswapRouter,wethAddress,otherAddress))[1];
		  const priceOtherswap = (await calcSell(otherswapRouter,wethAddress,otherAddress))[1];
	  
		  const uniswapReserves = await uniswapEthOther.functions.getReserves();
		  const sushiswapReserves = await otherEthOther.functions.getReserves();

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

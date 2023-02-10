// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
require("dotenv").config();
const hre = require("hardhat");
const { ethers } = require('ethers');
const web3 = require('web3');
const { mainnet: addresses } = require('../addresses');
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

// flag toggling between the various Chain networks
// 1 = Ethereum                 // ETH
// 2 = Polygon                  // POLY
// 3 = Avalanche                // AVAX
// 4 = Arbitrum (L2 Ethereum)   // ARB
// 5 = BSC                      // BSC (DO NOT USE SINCE IT IS NOT SUPPORTED BY AAVE V3)
const chainNetwork = 1;

async function main() {
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
  /*
    const PoolAddressesProvider = await hre.ethers.getContractAt(
    "IPoolAddressesProvider",
    ( chainNetwork == 1 ? wethAddress = web3.utils.toChecksumAddress(addresses.ethereum.routers.aave.poolAddressProvider) :
      chainNetwork == 2 ? wethAddress = web3.utils.toChecksumAddress(addresses.polygon.routers.aave.poolAddressProvider) :
      chainNetwork == 3 ? wethAddress = web3.utils.toChecksumAddress(addresses.avalanche.routers.aave.poolAddressProvider) :
      chainNetwork == 4 ? wethAddress = web3.utils.toChecksumAddress(addresses.arbitrum.routers.aave.poolAddressProvider) :
      wethAddress = web3.utils.toChecksumAddress(addresses.BSC.routers.aave.pool) ),
      walletWithProvider
  );
  const PoolAddress = await PoolAddressesProvider.getPool();
  const Pool = await hre.ethers.getContractAt("IPool", PoolAddress, walletWithProvider);
  */
  //console.log("PoolAddressesProvider provided: ", PoolAddressesProvider.address);
  //console.log("Address provided:               ", Pool.address);
  //return;
  /*
  function getChainId() external view returns (uint chainId) {
      assembly {
          chainId := chainid()
      }
  }

  function getChainId() external view returns (uint chainId) {
      return block.chainid;
  }

  function getChainId() external returns (uint chainId) {
      return block.chainid;
  }
  
  const chainId = await ethers.provider.getNetwork(); 
  */
  /*
    const contract = new ethers.ContractFactory(...);
    const estimatedGas = await ethers.provider.estimateGas(contract.getDeployTransaction(...).data)
  */
  //TODO need to specify the chainId in which to deploy a given contract
  // see example https://docs.ethers.org/v5/api/contract/contract-factory/
  // Deploy an instance of the contract - chaindId 42 is Kovan
  // contract = await factory.deploy("ricmoo.eth", 42); 
  //
  const Migrations = await hre.ethers.getContractFactory("Migrations");
  const migrations = await Migrations.deploy();
  await migrations.deployed();
  const FlashloanV2Library = await hre.ethers.getContractFactory("FlashloanV2Library");
	const flashloanV2Library = await FlashloanV2Library.deploy();
  await flashloanV2Library.deployed();
  const Flashloan = await hre.ethers.getContractFactory("Flashloan", {
    libraries: {
      FlashloanV2Library: flashloanV2Library.address
    }
  });

  //const flashLoan = await Flashloan.deploy(LendingPoolAddressesProvider.address);
 
  const flashLoan = await Flashloan.deploy(
    //web3.utils.toChecksumAddress(PoolAddressesProvider.address)

    ( chainNetwork == 1 ? web3.utils.toChecksumAddress(addresses.ethereum.routers.aave.poolAddressProvider) :
      chainNetwork == 2 ? web3.utils.toChecksumAddress(addresses.polygon.routers.aave.poolAddressProvider) :
      chainNetwork == 3 ? web3.utils.toChecksumAddress(addresses.avalanche.routers.aave.poolAddressProvider) :
      chainNetwork == 4 ? web3.utils.toChecksumAddress(addresses.arbitrum.routers.aave.poolAddressProvider) :
      web3.utils.toChecksumAddress(addresses.BSC.routers.aave.poolAddressProvider) ), 
    ( chainNetwork == 1 ? web3.utils.toChecksumAddress(web3.utils.toChecksumAddress(addresses.ethereum.routers.aave.pool)) :
      chainNetwork == 2 ? web3.utils.toChecksumAddress(web3.utils.toChecksumAddress(addresses.polygon.routers.aave.pool)) :
      chainNetwork == 3 ? web3.utils.toChecksumAddress(web3.utils.toChecksumAddress(addresses.avalanche.routers.aave.pool)) :
      chainNetwork == 4 ? web3.utils.toChecksumAddress(web3.utils.toChecksumAddress(addresses.arbitrum.routers.aave.pool)) :
      web3.utils.toChecksumAddress(web3.utils.toChecksumAddress(addresses.BSC.routers.aave.pool)) )

    //web3.utils.toChecksumAddress(addresses.ethereum.routers.aave.pool)
  );
  await flashLoan.deployed();

  console.log(
    `Migrations deployed to ${migrations.address}`
  );
  console.log(
    `FlashloanV2Library deployed to ${flashloanV2Library.address}`
  );
  console.log(
    `Flashloan deployed to ${flashLoan.address}`
  );

  const MigrationsEstimatedGas = await provider.estimateGas(Migrations.getDeployTransaction().data);
  const FlashloanV2LibraryEstimatedGas = await provider.estimateGas(FlashloanV2Library.getDeployTransaction().data);
  const FlashloanEstimatedGas = await provider.estimateGas(
    Flashloan.getDeployTransaction(
    ( chainNetwork == 1 ? web3.utils.toChecksumAddress(addresses.ethereum.routers.aave.poolAddressProvider) :
      chainNetwork == 2 ? web3.utils.toChecksumAddress(addresses.polygon.routers.aave.poolAddressProvider) :
      chainNetwork == 3 ? web3.utils.toChecksumAddress(addresses.avalanche.routers.aave.poolAddressProvider) :
      chainNetwork == 4 ? web3.utils.toChecksumAddress(addresses.arbitrum.routers.aave.poolAddressProvider) :
      web3.utils.toChecksumAddress(addresses.BSC.routers.aave.poolAddressProvider) ), 
    ( chainNetwork == 1 ? web3.utils.toChecksumAddress(web3.utils.toChecksumAddress(addresses.ethereum.routers.aave.pool)) :
      chainNetwork == 2 ? web3.utils.toChecksumAddress(web3.utils.toChecksumAddress(addresses.polygon.routers.aave.pool)) :
      chainNetwork == 3 ? web3.utils.toChecksumAddress(web3.utils.toChecksumAddress(addresses.avalanche.routers.aave.pool)) :
      chainNetwork == 4 ? web3.utils.toChecksumAddress(web3.utils.toChecksumAddress(addresses.arbitrum.routers.aave.pool)) :
      web3.utils.toChecksumAddress(web3.utils.toChecksumAddress(addresses.BSC.routers.aave.pool)) )
    ).data
  );

  const feeData = await walletWithProvider.getFeeData();
  const newMaxPriorityFeePerGas = 4000000000; // 4 Gwei
  const newMaxFeePerGas = ((ethers.BigNumber.from("2")).mul(ethers.BigNumber.from(feeData["lastBaseFeePerGas"]))).add(ethers.BigNumber.from(newMaxPriorityFeePerGas));
  const gasLimit = MigrationsEstimatedGas.add(FlashloanV2LibraryEstimatedGas).add(FlashloanEstimatedGas);
  console.log("Smart contracts deployment trx cost ", (gasLimit.mul(newMaxFeePerGas)).toString());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

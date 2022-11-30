// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { ethers } = require('ethers');
const web3 = require('web3');
const { mainnet: addresses } = require('../addresses');

async function main() {
  /*const Migrations = artifacts.require("Migrations");

  module.exports = function(deployer) {
    deployer.deploy(Migrations);
  };*/
  const Migrations = await hre.ethers.getContractFactory("Migrations");
  const migrations = await Migrations.deploy();
  await migrations.deployed();

  /*const FlashloanV2Library = await hre.ethers.getContractFactory("FlashloanV2Library");
  const flashloanV2Library = await FlashloanV2Library.deploy();
  await flashloanV2Library.deployed();*/

  const FlashloanV2Library = await hre.ethers.getContractFactory("FlashloanV2Library");
	const flashloanV2Library = await FlashloanV2Library.deploy();
  await flashloanV2Library.deployed();
  //const Flashloan = await hre.ethers.getContractFactory("Flashloan");
  const Flashloan = await hre.ethers.getContractFactory("Flashloan", {
    libraries: {
      FlashloanV2Library: flashloanV2Library.address
    },
  });
  const flashLoan = await Flashloan.deploy(
      //web3.utils.toChecksumAddress(addresses.kyber.kyberNetworkProxy),
      web3.utils.toChecksumAddress(addresses.uniswap.router),
      web3.utils.toChecksumAddress(addresses.oneinch.router)
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
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//const SafeMath = artifacts.require("@openzeppelin/contracts/math/SafeMath.sol");
//const UniswapV2Library = artifacts.require("UniswapV2Library");
const FlashLoan_arbitrage = artifacts.require("FlashLoan_arbitrage");
const TestUniswapLiquidity = artifacts.require("TestUniswapLiquidity");
//const Web3 = require('web3');

module.exports = function(deployer, network, accounts) {
  deployer.deploy(
    FlashLoan_arbitrage,
    '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f', //Uniswap factory on Rinkeby testnet
    ////'0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F', //Sushiswap router Mainnet
    '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506', //Sushiswap router on Rinkeby testnet
  );
  deployer.deploy(
    TestUniswapLiquidity
  );
};
//module.exports = function (deployer) {
  //deployer.deploy(SafeMath);
  //deployer.link(SafeMath, UniswapV2Library);
  //deployer.deploy(UniswapV2Library);
  //deployer.link(UniswapV2Library, FlashLoan_arbitrage);
  // Uniswap address from Ethercan 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f
  // Sushiswap router address from Eterscan 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D
  //deployer.deploy(FlashLoan_arbitrage, web3.utils.toChecksumAddress("0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"), web3.utils.toChecksumAddress("0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"));
  // new'0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F', //Sushiswap router
  //deployer.deploy(FlashLoan_arbitrage, web3.utils.toChecksumAddress("0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"), web3.utils.toChecksumAddress("0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F"));
//};

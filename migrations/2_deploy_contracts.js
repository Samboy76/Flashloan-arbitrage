//const SafeMath = artifacts.require("@openzeppelin/contracts/math/SafeMath.sol");
const UniswapV2Library = artifacts.require("UniswapV2Library");
const FlashloanArbitrage = artifacts.require("FlashloanArbitrage");

module.exports = function (deployer) {
  /*deployer.deploy(SafeMath);
  deployer.link(SafeMath, UniswapV2Library);*/
  deployer.deploy(UniswapV2Library);
  deployer.link(UniswapV2Library, FlashloanArbitrage);
  deployer.deploy(FlashloanArbitrage,
                  // sushiFactory flashloaner
                  web3.utils.toChecksumAddress("0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac"), 
                  // uniswap Router
                  web3.utils.toChecksumAddress("0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D")) 
};

const ethereumMainnetRouters = require('./ethereum-mainnet-routers.json');
const ethereumMainnetTokens = require('./ethereum-mainnet-tokens.json');
const avalancheMainnetRouters = require('./avalanche-mainnet-routers.json');
const avalancheMainnetTokens = require('./avalanche-mainnet-tokens.json');
const BSCMainnetRouters = require('./BSC-mainnet-routers.json');
const BSCMainnetTokens = require('./BSC-mainnet-tokens.json');
const polygonMainnetRouters = require('./polygon-mainnet-routers.json');
const polygonMainnetTokens = require('./polygon-mainnet-tokens.json');
const arbitrumMainnetRouters = require('./arbitrum-mainnet-routers.json');
const arbitrumMainnetTokens = require('./arbitrum-mainnet-tokens.json');
const ethereumUniswapV3Pairs = require('./ethereum-mainnet-uniswapV3-pairs.json');
const polygonUniswapV3Pairs = require('./polygon-mainnet-uniswapV3-pairs.json');
const arbitrumUniswapV3Pairs = require('./arbitrum-mainnet-uniswapV3-pairs.json');

module.exports = {
  mainnet: {
    ethereum: {
      routers: ethereumMainnetRouters,
      tokens: ethereumMainnetTokens,
      uniswapV3Pairs: ethereumUniswapV3Pairs
    },
    avalanche: {
      routers: avalancheMainnetRouters,
      tokens: avalancheMainnetTokens
    },
    BSC: {
      routers: BSCMainnetRouters,
      tokens: BSCMainnetTokens
    },
    polygon: {
      routers: polygonMainnetRouters,
      tokens: polygonMainnetTokens,
      uniswapV3Pairs: polygonUniswapV3Pairs
    },
    arbitrum: {
      routers: arbitrumMainnetRouters,
      tokens: arbitrumMainnetTokens,
      uniswapV3Pairs: arbitrumUniswapV3Pairs
    }
  }
};
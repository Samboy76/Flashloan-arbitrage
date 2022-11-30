const uniswapMainnet = require('./uniswap-mainnet.json');
const oneinchMainnet = require('./oneinch-mainnet.json');
const dydxMainnet = require('./dydx-mainnet.json');
const tokensMainnet = require('./tokens-mainnet.json');

module.exports = {
  mainnet: {
    uniswap: uniswapMainnet,
    oneinch: oneinchMainnet,
    dydx: dydxMainnet,
    tokens: tokensMainnet
  }
};

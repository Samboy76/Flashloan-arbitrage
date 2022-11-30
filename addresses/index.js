const kyberMainnet = require('./kyber-mainnet.json');
const uniswapMainnet = require('./uniswap-mainnet.json');
const oneinchMainnet = require('./oneinch-mainnet.json');
const dydxMainnet = require('./dydx-mainnet.json');
const tokensMainnet = require('./tokens-mainnet.json');

module.exports = {
  mainnet: {
    kyber: kyberMainnet,
    uniswap: uniswapMainnet,
    oneinch: oneinchMainnet,
    dydx: dydxMainnet,
    tokens: tokensMainnet
  }
};
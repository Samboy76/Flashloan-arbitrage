require("dotenv").config();
const fetch = require('cross-fetch');
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

exports.getAbi = async(network, key, extension, address) => {
    const url = `https://api.${network}.${extension}/api?module=contract&action=getabi&address=${address}&apikey=${key}`;
    //console.log(url);
    return fetch(url).then(res => res.json()).then(res => res.result);
}

exports.getPoolImmutables = async(poolContract) => {
    const [token0, token1, fee] = await Promise.all([
        poolContract.token0(),
        poolContract.token1(),
        poolContract.fee(),
    ]);

    const immutables = {
        token0: token0,
        token1: token1,
        fee: fee
    };

    return immutables;
}
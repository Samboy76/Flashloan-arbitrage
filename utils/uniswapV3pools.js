const { mainnet: addresses } = require('../addresses');

const highTVLUniswapPoolAddresses = [
  {
    tokenpair: "USDCxxxETH",
    network:
    [{
      ethereum: addresses.ethereum.uniswapV3Pairs.USDCxxxETH.address['005'], // 0.05%
      polygon: addresses.polygon.uniswapV3Pairs.USDCxxxETH.address['005'] // 0.05%
    }]
  },
  {
    tokenpair: "DAIxxxETH",
    network:
    [{
      ethereum: addresses.ethereum.uniswapV3Pairs.DAIxxxETH.address['030'] // 0.3%
    }]
  },
  {
    tokenpair: "WBTCxxxETH",
    network:
    [{
      ethereum: addresses.ethereum.uniswapV3Pairs.WBTCxxxETH.address['030'], // 0.3%
      polygon: addresses.polygon.uniswapV3Pairs.WBTCxxxETH.address['005'], // 0.05%
      arbitrum: addresses.arbitrum.uniswapV3Pairs.WBTCxxxETH.address['030'] // 0.3%
    }]
  },
  {
    tokenpair: "UNIxxxETH",
    network:
    [{
      ethereum: addresses.ethereum.uniswapV3Pairs.UNIxxxETH.address['030'] // 0.3%
    }]
  },
  {
    tokenpair: "BITxxxETH",
    network:
    [{
      ethereum: addresses.ethereum.uniswapV3Pairs.BITxxxETH.address['030'] // 0.3%
    }]
  },
  {
    tokenpair: "cbETHxxxETH",
    network:
    [{
      ethereum: addresses.ethereum.uniswapV3Pairs.cbETHxxxETH.address['005'] // 0.05%
    }]
  },
  {
    tokenpair: "GNOxxxETH",
    network:
    [{
      ethereum: addresses.ethereum.uniswapV3Pairs.GNOxxxETH.address['030'] // 0.3%
    }]
  },
  {
    tokenpair: "LDOxxxETH",
    network:
    [{
      ethereum: addresses.ethereum.uniswapV3Pairs.LDOxxxETH.address['030'] // 0.3%
    }]
  },
  {
    tokenpair: "MATICxxxETH",
    network:
    [{
      ethereum: addresses.ethereum.uniswapV3Pairs.MATICxxxETH.address['030'], // 0.3%
      polygon: addresses.polygon.uniswapV3Pairs.MATICxxxETH.address['030'] // 0.3%
    }]
  },
  {
    tokenpair: "MKRxxxETH",
    network:
    [{
      ethereum: addresses.ethereum.uniswapV3Pairs.MKRxxxETH.address['030'] // 0.3%
    }]
  },
  {
    tokenpair: "rETHxxxETH",
    network:
    [{
      ethereum: addresses.ethereum.uniswapV3Pairs.rETHxxxETH.address['005'] // 0.05%
    }]
  },
  {
    tokenpair: "APExxxETH",
    network:
    [{
      ethereum: addresses.ethereum.uniswapV3Pairs.APExxxETH.address['030'] // 0.3%
    }]
  },
  {
    tokenpair: "SHIBxxxETH",
    network:
    [{
      ethereum: addresses.ethereum.uniswapV3Pairs.SHIBxxxETH.address['030'] // 0.3%
    }]
  },
  {
    tokenpair: "ETHxxxUSDT",
    network:
    [{
      ethereum: addresses.ethereum.uniswapV3Pairs.ETHxxxUSDT.address['030'], // 0.3%
      polygon: addresses.polygon.uniswapV3Pairs.ETHxxxUSDT.address['030'], // 0.3%
      arbitrum: addresses.arbitrum.uniswapV3Pairs.ETHxxxUSDT.address['005'] // 0.05%
    }]
  },
  {
    tokenpair: "ETHxxxsETH2",
    network:
    [{
      ethereum: addresses.ethereum.uniswapV3Pairs.ETHxxxsETH2.address['030'] // 0.3%
    }]
  },
  {
    tokenpair: "ETHxxxsBTT",
    network:
    [{
      ethereum: addresses.ethereum.uniswapV3Pairs.ETHxxxsBTT.address['030'] // 0.3%
    }]
  },
  {
    tokenpair: "ETHxxxsETHM",
    network:
    [{
      ethereum: addresses.ethereum.uniswapV3Pairs.ETHxxxsETHM.address['005'] // 0.05%
    }]
  },
  {
    tokenpair: "ETHxxxsADS",
    network:
    [{
      ethereum: addresses.ethereum.uniswapV3Pairs.ETHxxxsADS.address['100'] // 1%
    }]
  },
  {
    tokenpair: "ETHxxxsLOOKS",
    network:
    [{
      ethereum: addresses.ethereum.uniswapV3Pairs.ETHxxxsLOOKS.address['030'] // 0.3%
    }]
  },
  {
    tokenpair: "ETHxxxsENS",
    network:
    [{
      ethereum: addresses.ethereum.uniswapV3Pairs.ETHxxxsENS.address['030'] // 0.3%
    }]
  },
  {
    tokenpair: "HOMxxxETH",
    network:
    [{
      polygon: addresses.polygon.uniswapV3Pairs.HOMxxxETH.address['100'] // 1%
    }]
  },
  {
    tokenpair: "HOMxxxETH",
    network:
    [{
      polygon: addresses.polygon.uniswapV3Pairs.LINKxxxETH.address['030'] // 0.3%
    }]
  },
  {
    tokenpair: "XIDRxxxETH",
    network:
    [{
      polygon: addresses.polygon.uniswapV3Pairs.XIDRxxxETH.address['030'] // 0.3%
    }]
  },
  {
    tokenpair: "ETHxxxBOB",
    network:
    [{
      polygon: addresses.polygon.uniswapV3Pairs.ETHxxxBOB.address['005'] // 0.05%
    }]
  },
  {
    tokenpair: "ETHxxxXSGD",
    network:
    [{
      polygon: addresses.polygon.uniswapV3Pairs.ETHxxxXSGD.address['030'] // 0.3%
    }]
  },
  {
    tokenpair: "ETHxxxUNI",
    network:
    [{
      polygon: addresses.polygon.uniswapV3Pairs.ETHxxxUNI.address['030'], // 0.3%
      arbitrum: addresses.arbitrum.uniswapV3Pairs.ETHxxxUNI.address['030'] // 0.3%
    }]
  },
  {
    tokenpair: "ETHxxxAAVE",
    network:
    [{
      polygon: addresses.polygon.uniswapV3Pairs.ETHxxxAAVE.address['030'] // 0.3%
    }]
  },
  {
    tokenpair: "PORSCHExxxETH",
    network:
    [{
      arbitrum: addresses.arbitrum.uniswapV3Pairs.PORSCHExxxETH.address['005'] // 0.05%
    }]
  },
  {
    tokenpair: "RPLxxxETH",
    network:
    [{
      arbitrum: addresses.arbitrum.uniswapV3Pairs.RPLxxxETH.address['005'] // 0.05%
    }]
  },
  {
    tokenpair: "MAGICxxxETH",
    network:
    [{
      arbitrum: addresses.arbitrum.uniswapV3Pairs.MAGICxxxETH.address['100'] // 1%
    }]
  },
  {
    tokenpair: "UMAMIxxxETH",
    network:
    [{
      arbitrum: addresses.arbitrum.uniswapV3Pairs.UMAMIxxxETH.address['100'] // 1%
    }]
  },
  {
    tokenpair: "HEGICxxxETH",
    network:
    [{
      arbitrum: addresses.arbitrum.uniswapV3Pairs.HEGICxxxETH.address['100'] // 1%
    }]
  },
  {
    tokenpair: "CAPxxxETH",
    network:
    [{
      arbitrum: addresses.arbitrum.uniswapV3Pairs.CAPxxxETH.address['030'] // 0.3%
    }]
  },
  {
    tokenpair: "GMDxxxETH",
    network:
    [{
      arbitrum: addresses.arbitrum.uniswapV3Pairs.GMDxxxETH.address['100'] // 1%
    }]
  },
  {
    tokenpair: "BFRxxxETH",
    network:
    [{
      arbitrum: addresses.arbitrum.uniswapV3Pairs.BFRxxxETH.address['100'] // 1%
    }]
  },
  {
    tokenpair: "CRVxxxETH",
    network:
    [{
      arbitrum: addresses.arbitrum.uniswapV3Pairs.CRVxxxETH.address['100'] // 1%
    }]
  },
  {
    tokenpair: "RDNTxxxETH",
    network:
    [{
      arbitrum: addresses.arbitrum.uniswapV3Pairs.RDNTxxxETH.address['100'] // 1%
    }]
  },
  {
    tokenpair: "GNSxxxETH",
    network:
    [{
      arbitrum: addresses.arbitrum.uniswapV3Pairs.GNSxxxETH.address['030'] // 0.3%
    }]
  },
  {
    tokenpair: "DPXxxxETH",
    network:
    [{
      arbitrum: addresses.arbitrum.uniswapV3Pairs.DPXxxxETH.address['100'] // 1%
    }]
  },
  {
    tokenpair: "RDPXxxxETH",
    network:
    [{
      arbitrum: addresses.arbitrum.uniswapV3Pairs.RDPXxxxETH.address['100'] // 1%
    }]
  },
  {
    tokenpair: "CORExxxETH",
    network:
    [{
      arbitrum: addresses.arbitrum.uniswapV3Pairs.CORExxxETH.address['005'] // 0.05%
    }]
  },
  {
    tokenpair: "ETHxxxGMX",
    network:
    [{
      arbitrum: addresses.arbitrum.uniswapV3Pairs.ETHxxxGMX.address['100'] // 1%
    }]
  },
  {
    tokenpair: "ETHxxxUSDC",
    network:
    [{
      arbitrum: addresses.arbitrum.uniswapV3Pairs.ETHxxxUSDC.address['005'] // 0.05%
    }]
  },
  {
    tokenpair: "ETHxxxLINK",
    network:
    [{
      arbitrum: addresses.arbitrum.uniswapV3Pairs.ETHxxxLINK.address['030'] // 0.3%
    }]
  },
  {
    tokenpair: "ETHxxxDBL",
    network:
    [{
      arbitrum: addresses.arbitrum.uniswapV3Pairs.ETHxxxDBL.address['100'] // 1%
    }]
  },
  {
    tokenpair: "ETHxxxLEVI",
    network:
    [{
      arbitrum: addresses.arbitrum.uniswapV3Pairs.ETHxxxLEVI.address['100'] // 1%
    }]
  },
  {
    tokenpair: "ETHxxxDAI",
    network:
    [{
      arbitrum: addresses.arbitrum.uniswapV3Pairs.ETHxxxDAI.address['030'] // 0.3%
    }]
  },
  {
    tokenpair: "ETHxxxUSDs",
    network:
    [{
      arbitrum: addresses.arbitrum.uniswapV3Pairs.ETHxxxUSDs.address['030'] // 0.3%
    }]
  },
  {
    tokenpair: "ETHxxxNFTI",
    network:
    [{
      arbitrum: addresses.arbitrum.uniswapV3Pairs.ETHxxxNFTI.address['100'] // 1%
    }]
  }
];

module.exports = { 
  highTVLUniswapPoolAddresses
}
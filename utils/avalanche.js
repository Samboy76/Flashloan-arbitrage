const { mainnet: addresses } = require('../addresses');

const hotTokensAVAX = [
    
];

const selectedTokensAVAX = [
  /*{
    address: addresses.avalanche.tokens.USDC ,  // USDC
    decimals: 6,
    name: 'USDC'
  },*/
  {
    address: addresses.avalanche.tokens.USDT ,  // USDT
    decimals: 6,
    name: 'USDT'
  }
];

const stablecoinsAVAX = [
  {
    address: addresses.avalanche.tokens.USDC,  // USDC
    decimals: 6,
    name: 'USDC'
  },
  {
    address: addresses.avalanche.tokens.USDT,  // USDT
    decimals: 6,
    name: 'USDT'
  },
  {
    address: addresses.avalanche.tokens.DAI,  // DAI
    decimals: 18,
    name: 'DAI'
  },
  {
    address: addresses.avalanche.tokens.BUSD,  // BUSD
    decimals: 18,
    name: 'BUSD'
  },
  {
    address: addresses.avalanche.tokens.MIM,  // MIM
    decimals: 18,
    name: 'MIM'
  },
  /*{
    address: addresses.avalanche.tokens.FRAX,  // FRAX
    decimals: 18,
    name: 'FRAX'
  },*/
  {
    address: addresses.avalanche.tokens.miMatic,  // miMatic
    decimals: 18,
    name: 'miMatic'
  },
  {
    address: addresses.avalanche.tokens.TUSD,  // TUSD
    decimals: 18,
    name: 'TUSD'
  },
  {
    address: addresses.avalanche.tokens.USDS,  // USDS
    decimals: 18,
    name: 'USDS'
  },
  {
    address: addresses.avalanche.tokens.NUSD,  // NUSD
    decimals: 18,
    name: 'NUSD'
  },
  {
    address: addresses.avalanche.tokens.USDPlus,  // USDPlus
    decimals: 6,
    name: 'USDPlus'
  },
  {
    address: addresses.avalanche.tokens.RAI,  // RAI
    decimals: 18,
    name: 'RAI'
  }
];

const tokensAVAX = [
  {
    address: addresses.avalanche.tokens.USDC,  // USDC
    decimals: 6,
    name: 'USDC'
  },
  {
    address: addresses.avalanche.tokens.USDT,  // USDT
    decimals: 6,
    name: 'USDT'
  },
  {
    address: addresses.avalanche.tokens.DAI,  // DAI
    decimals: 18,
    name: 'DAI'
  },
  {
    address: addresses.avalanche.tokens.BUSD,  // BUSD
    decimals: 18,
    name: 'BUSD'
  },
  {
    address: addresses.avalanche.tokens.MIM,  // MIM
    decimals: 18,
    name: 'MIM'
  },
  /*{
    address: addresses.avalanche.tokens.FRAX,  // FRAX
    decimals: 18,
    name: 'FRAX'
  },*/
  {
    address: addresses.avalanche.tokens.miMatic,  // miMatic
    decimals: 18,
    name: 'miMatic'
  },
  {
    address: addresses.avalanche.tokens.TUSD,  // TUSD
    decimals: 18,
    name: 'TUSD'
  },
  {
    address: addresses.avalanche.tokens.USDS,  // USDS
    decimals: 18,
    name: 'USDS'
  },
  {
    address: addresses.avalanche.tokens.NUSD,  // NUSD
    decimals: 18,
    name: 'NUSD'
  },
  {
    address: addresses.avalanche.tokens.USDPlus,  // USDPlus
    decimals: 6,
    name: 'USDPlus'
  },
  {
    address: addresses.avalanche.tokens.RAI,  // RAI
    decimals: 18,
    name: 'RAI'
  },
  {
    address: addresses.avalanche.tokens.USDTe,  // USDTe
    decimals: 6,
    name: 'USDTe'
  },
  {
    address: addresses.avalanche.tokens.USDCe,  // USDCe
    decimals: 6,
    name: 'USDCe'
  },
  {
    address: addresses.avalanche.tokens.BUSDe,  // BUSDe
    decimals: 18,
    name: 'BUSDe'
  },
  {
    address: addresses.avalanche.tokens.SHIBe,  // SHIBe
    decimals: 18,
    name: 'SHIBe'
  },
  {
    address: addresses.avalanche.tokens.DAIe,  // DAIe
    decimals: 18,
    name: 'DAIe'
  },
  {
    address: addresses.avalanche.tokens.WAVAX,  // WAVAX
    decimals: 18,
    name: 'WAVAX'
  },
  {
    address: addresses.avalanche.tokens.UNIe,  // UNIe
    decimals: 18,
    name: 'UNIe'
  },
  {
    address: addresses.avalanche.tokens.WBTCe,  // WBTCe
    decimals: 8,
    name: 'WBTCe'
  },
  {
    address: addresses.avalanche.tokens.LINKe,  // LINKe
    decimals: 18,
    name: 'LINKe'
  },
  {
    address: addresses.avalanche.tokens.AAVEe,  // AAVEe
    decimals: 18,
    name: 'AAVEe'
  },
  {
    address: addresses.avalanche.tokens.GRTe,  // GRTe
    decimals: 18,
    name: 'GRTe'
  },
  {
    address: addresses.avalanche.tokens.USDD,  // USDD
    decimals: 18,
    name: 'USDD'
  },
  {
    address: addresses.avalanche.tokens.SNXe,  // SNXe
    decimals: 18,
    name: 'SNXe'
  },
  {
    address: addresses.avalanche.tokens.FXS,  // FXS
    decimals: 18,
    name: 'FXS'
  },
  {
    address: addresses.avalanche.tokens.MKRe,  // MKRe
    decimals: 18,
    name: 'MKRe'
  },
  {
    address: addresses.avalanche.tokens.CRVe,  // CRVe
    decimals: 18,
    name: 'CRVe'
  },
  {
    address: addresses.avalanche.tokens.ONEINCHe,  // ONEINCHe
    decimals: 18,
    name: 'ONEINCHe'
  },
  {
    address: addresses.avalanche.tokens.COMPe,  // COMPe
    decimals: 18,
    name: 'COMPe'
  },
  {
    address: addresses.avalanche.tokens.BATe,  // BATe
    decimals: 18,
    name: 'BATe'
  },
  {
    address: addresses.avalanche.tokens.SUSHIe,  // SUSHIe
    decimals: 18,
    name: 'SUSHIe'
  },
  {
    address: addresses.avalanche.tokens.YFIe,  // YFIe
    decimals: 18,
    name: 'YFIe'
  },
  {
    address: addresses.avalanche.tokens.ZRXe,  // ZRXe
    decimals: 18,
    name: 'ZRXe'
  },
  {
    address: addresses.avalanche.tokens.ANY,  // ANY
    decimals: 18,
    name: 'ANY'
  },
  {
    address: addresses.avalanche.tokens.UMAe,  // UMAe
    decimals: 18,
    name: 'UMAe'
  },
  {
    address: addresses.avalanche.tokens.BTCb,  // BTCb
    decimals: 8,
    name: 'BTCb'
  },
  {
    address: addresses.avalanche.tokens.KNC,  // KNC
    decimals: 18,
    name: 'KNC'
  },
  {
    address: addresses.avalanche.tokens.SYN,  // SYN
    decimals: 18,
    name: 'SYN'
  },
  {
    address: addresses.avalanche.tokens.ALPHAe,  // ALPHAe
    decimals: 18,
    name: 'ALPHAe'
  },
  {
    address: addresses.avalanche.tokens.ORBS,  // ORBS
    decimals: 18,
    name: 'ORBS'
  },
  {
    address: addresses.avalanche.tokens.SPELL,  // SPELL
    decimals: 18,
    name: 'SPELL'
  },
  {
    address: addresses.avalanche.tokens.BOBA,  // BOBA
    decimals: 18,
    name: 'BOBA'
  },
  {
    address: addresses.avalanche.tokens.STG,  // STG
    decimals: 18,
    name: 'STG'
  },
  {
    address: addresses.avalanche.tokens.SURE,  // SURE
    decimals: 18,
    name: 'SURE'
  },
  {
    address: addresses.avalanche.tokens.xJOE,  // xJOE
    decimals: 18,
    name: 'xJOE'
  },
  {
    address: addresses.avalanche.tokens.JOE,  // JOE
    decimals: 18,
    name: 'JOE'
  },
  {
    address: addresses.avalanche.tokens.ETHM,  // ETHM
    decimals: 18,
    name: 'ETHM'
  },
  {
    address: addresses.avalanche.tokens.BIFI,  // BIFI
    decimals: 18,
    name: 'BIFI'
  },
  {
    address: addresses.avalanche.tokens.QI,  // QI
    decimals: 18,
    name: 'QI'
  },
  {
    address: addresses.avalanche.tokens.WALBT,  // WALBT
    decimals: 18,
    name: 'WALBT'
  },
  {
    address: addresses.avalanche.tokens.SWAP,  // SWAP
    decimals: 18,
    name: 'SWAP'
  },
  {
    address: addresses.avalanche.tokens.PENDLE,  // PENDLE
    decimals: 18,
    name: 'PENDLE'
  },
  {
    address: addresses.avalanche.tokens.RISE,  // RISE
    decimals: 18,
    name: 'RISE'
  },
  {
    address: addresses.avalanche.tokens.UNCX,  // UNCX
    decimals: 18,
    name: 'UNCX'
  },
  {
    address: addresses.avalanche.tokens.JADE,  // JADE
    decimals: 18,
    name: 'JADE'
  },
  {
    address: addresses.avalanche.tokens.sJADE,  // sJADE
    decimals: 18,
    name: 'sJADE'
  },
  {
    address: addresses.avalanche.tokens.WXT,  // WXT
    decimals: 18,
    name: 'WXT'
  },
  {
    address: addresses.avalanche.tokens.PNG,  // PNG
    decimals: 18,
    name: 'PNG'
  },
  {
    address: addresses.avalanche.tokens.DYP,  // DYP
    decimals: 18,
    name: 'DYP'
  },
  {
    address: addresses.avalanche.tokens.FRM,  // FRM
    decimals: 18,
    name: 'FRM'
  },
  {
    address: addresses.avalanche.tokens.INSUR,  // INSUR
    decimals: 18,
    name: 'INSUR'
  },
  {
    address: addresses.avalanche.tokens.OOE,  // OOE
    decimals: 18,
    name: 'OOE'
  },
  {
    address: addresses.avalanche.tokens.CLY,  // CLY
    decimals: 18,
    name: 'CLY'
  },
  {
    address: addresses.avalanche.tokens.ROCO,  // ROCO
    decimals: 18,
    name: 'ROCO'
  },
  {
    address: addresses.avalanche.tokens.ZOO,  // ZOO
    decimals: 18,
    name: 'ZOO'
  },
  {
    address: addresses.avalanche.tokens.UNCL,  // UNCL
    decimals: 18,
    name: 'UNCL'
  },
  {
    address: addresses.avalanche.tokens.NFTD,  // NFTD
    decimals: 18,
    name: 'NFTD'
  }
];

module.exports = { 
  hotTokensAVAX,
  selectedTokensAVAX,
  stablecoinsAVAX,
  tokensAVAX
}
const { mainnet: addresses } = require('../addresses');

const hotTokensARB = [
  
];

const selectedTokensARB = [
  /*{
    address: addresses.arbitrum.tokens.USDC ,  // USDC
    decimals: 6,
    name: 'USDC'
  },*/
  {
    address: addresses.arbitrum.tokens.USDT ,  // USDT
    decimals: 6,
    name: 'USDT'
  }
];

const stablecoinsARB = [
  {
    address: addresses.arbitrum.tokens.USDC ,  // USDC
    decimals: 6,
    name: 'USDC'
  },
  {
    address: addresses.arbitrum.tokens.USDT ,  // USDT
    decimals: 6,
    name: 'USDT'
  },
  {
    address: addresses.arbitrum.tokens.DAI ,  // DAI
    decimals: 18,
    name: 'DAI'
  },
  /*{
    address: addresses.arbitrum.tokens.FRAX ,  // FRAX
    decimals: 18,
    name: 'FRAX'
  },*/
  {
    address: addresses.arbitrum.tokens.MIM ,  // MIM
    decimals: 18,
    name: 'MIM'
  },
  {
    address: addresses.arbitrum.tokens.VST ,  // VST
    decimals: 18,
    name: 'VST'
  },
  {
    address: addresses.arbitrum.tokens.USX ,  // USX
    decimals: 18,
    name: 'USX'
  },
  {
    address: addresses.arbitrum.tokens.NUSD ,  // NUSD
    decimals: 18,
    name: 'NUSD'
  },
  {
    address: addresses.arbitrum.tokens.DUSD ,  // DUSD
    decimals: 6,
    name: 'DUSD'
  },
  {
    address: addresses.arbitrum.tokens.USDS ,  // USDS
    decimals: 18,
    name: 'USDS'
  },
  {
    address: addresses.arbitrum.tokens.MAI ,  // MAI
    decimals: 18,
    name: 'MAI'
  },
  {
    address: addresses.arbitrum.tokens.AGEUR ,  // AGEUR
    decimals: 18,
    name: 'AGEUR'
  },
  {
    address: addresses.arbitrum.tokens.USDL ,  // USDL
    decimals: 18,
    name: 'USDL'
  },
  {
    address: addresses.arbitrum.tokens.TUSD ,  // TUSD
    decimals: 18,
    name: 'TUSD'
  },
  {
    address: addresses.arbitrum.tokens.VOLT ,  // VOLT
    decimals: 18,
    name: 'VOLT'
  },
  {
    address: addresses.arbitrum.tokens.RAI ,  // RAI
    decimals: 18,
    name: 'RAI'
  },
  {
    address: addresses.arbitrum.tokens.USTC ,  // USTC
    decimals: 6,
    name: 'USTC'
  },
  {
    address: addresses.arbitrum.tokens.SUSD ,  // SUSD
    decimals: 18,
    name: 'SUSD'
  }
];

const tokensARB = [
  {
    address: addresses.arbitrum.tokens.USDC ,  // USDC
    decimals: 6,
    name: 'USDC'
  },
  {
    address: addresses.arbitrum.tokens.USDT ,  // USDT
    decimals: 6,
    name: 'USDT'
  },
  {
    address: addresses.arbitrum.tokens.DAI ,  // DAI
    decimals: 18,
    name: 'DAI'
  },
  /*{
    address: addresses.arbitrum.tokens.FRAX ,  // FRAX
    decimals: 18,
    name: 'FRAX'
  },*/
  {
    address: addresses.arbitrum.tokens.MIM ,  // MIM
    decimals: 18,
    name: 'MIM'
  },
  {
    address: addresses.arbitrum.tokens.VST ,  // VST
    decimals: 18,
    name: 'VST'
  },
  {
    address: addresses.arbitrum.tokens.USX ,  // USX
    decimals: 18,
    name: 'USX'
  },
  {
    address: addresses.arbitrum.tokens.NUSD ,  // NUSD
    decimals: 18,
    name: 'NUSD'
  },
  {
    address: addresses.arbitrum.tokens.DUSD ,  // DUSD
    decimals: 6,
    name: 'DUSD'
  },
  {
    address: addresses.arbitrum.tokens.USDS ,  // USDS
    decimals: 18,
    name: 'USDS'
  },
  {
    address: addresses.arbitrum.tokens.MAI ,  // MAI
    decimals: 18,
    name: 'MAI'
  },
  {
    address: addresses.arbitrum.tokens.AGEUR ,  // AGEUR
    decimals: 18,
    name: 'AGEUR'
  },
  {
    address: addresses.arbitrum.tokens.USDL ,  // USDL
    decimals: 18,
    name: 'USDL'
  },
  {
    address: addresses.arbitrum.tokens.TUSD ,  // TUSD
    decimals: 18,
    name: 'TUSD'
  },
  {
    address: addresses.arbitrum.tokens.VOLT ,  // VOLT
    decimals: 18,
    name: 'VOLT'
  },
  {
    address: addresses.arbitrum.tokens.RAI ,  // RAI
    decimals: 18,
    name: 'RAI'
  },
  {
    address: addresses.arbitrum.tokens.USTC ,  // USTC
    decimals: 6,
    name: 'USTC'
  },
  {
    address: addresses.arbitrum.tokens.SUSD ,  // SUSD
    decimals: 18,
    name: 'SUSD'
  },
  {
    address: addresses.arbitrum.tokens.UNI ,  // UNI
    decimals: 18,
    name: 'UNI'
  },
  {
    address: addresses.arbitrum.tokens.WBTC ,  // WBTC
    decimals: 8,
    name: 'WBTC'
  },
  {
    address: addresses.arbitrum.tokens.LINK ,  // LINK
    decimals: 18,
    name: 'LINK'
  },
  {
    address: addresses.arbitrum.tokens.LDO ,  // LDO
    decimals: 18,
    name: 'LDO'
  },
  {
    address: addresses.arbitrum.tokens.LUNC ,  // LUNC
    decimals: 6,
    name: 'LUNC'
  },
  {
    address: addresses.arbitrum.tokens.GRT ,  // GRT
    decimals: 18,
    name: 'GRT'
  },
  {
    address: addresses.arbitrum.tokens.USDD ,  // USDD
    decimals: 18,
    name: 'USDD'
  },
  {
    address: addresses.arbitrum.tokens.FXS ,  // FXS
    decimals: 18,
    name: 'FXS'
  },
  {
    address: addresses.arbitrum.tokens.CRV ,  // CRV
    decimals: 18,
    name: 'CRV'
  },
  {
    address: addresses.arbitrum.tokens.GMX ,  // GMX
    decimals: 18,
    name: 'GMX'
  },
  {
    address: addresses.arbitrum.tokens.LRC ,  // LRC
    decimals: 18,
    name: 'LRC'
  },
  {
    address: addresses.arbitrum.tokens.COMP ,  // COMP
    decimals: 18,
    name: 'COMP'
  },
  {
    address: addresses.arbitrum.tokens.GNO ,  // GNO
    decimals: 18,
    name: 'GNO'
  },
  {
    address: addresses.arbitrum.tokens.BAL ,  // BAL
    decimals: 18,
    name: 'BAL'
  },
  {
    address: addresses.arbitrum.tokens.SUSHI ,  // SUSHI
    decimals: 18,
    name: 'SUSHI'
  },
  {
    address: addresses.arbitrum.tokens.YFI ,  // YFI
    decimals: 18,
    name: 'YFI'
  },
  {
    address: addresses.arbitrum.tokens.LPT ,  // LPT
    decimals: 18,
    name: 'LPT'
  },
  {
    address: addresses.arbitrum.tokens.MULTI ,  // MULTI
    decimals: 18,
    name: 'MULTI'
  },
  {
    address: addresses.arbitrum.tokens.SYN ,  // SYN
    decimals: 18,
    name: 'SYN'
  },
  {
    address: addresses.arbitrum.tokens.UMA ,  // UMA
    decimals: 18,
    name: 'UMA'
  },
  {
    address: addresses.arbitrum.tokens.KNC ,  // KNC
    decimals: 18,
    name: 'KNC'
  },
  {
    address: addresses.arbitrum.tokens.CTSI ,  // CTSI
    decimals: 18,
    name: 'CTSI'
  },
  {
    address: addresses.arbitrum.tokens.COTI ,  // COTI
    decimals: 18,
    name: 'COTI'
  },
  {
    address: addresses.arbitrum.tokens.CELR ,  // CELR
    decimals: 18,
    name: 'CELR'
  },
  {
    address: addresses.arbitrum.tokens.SPELL ,  // SPELL
    decimals: 18,
    name: 'SPELL'
  },
  {
    address: addresses.arbitrum.tokens.STG ,  // STG
    decimals: 18,
    name: 'STG'
  },
  {
    address: addresses.arbitrum.tokens.BADGER ,  // BADGER
    decimals: 18,
    name: 'BADGER'
  },
  {
    address: addresses.arbitrum.tokens.DODO ,  // DODO
    decimals: 18,
    name: 'DODO'
  },
  {
    address: addresses.arbitrum.tokens.PERP ,  // PERP
    decimals: 18,
    name: 'PERP'
  },
  {
    address: addresses.arbitrum.tokens.ATA ,  // ATA
    decimals: 18,
    name: 'ATA'
  },
  {
    address: addresses.arbitrum.tokens.BOND ,  // BOND
    decimals: 18,
    name: 'BOND'
  },
  {
    address: addresses.arbitrum.tokens.DIA ,  // DIA
    decimals: 18,
    name: 'DIA'
  },
  {
    address: addresses.arbitrum.tokens.UBT ,  // UBT
    decimals: 8,
    name: 'UBT'
  },
  {
    address: addresses.arbitrum.tokens.ROUTE ,  // ROUTE
    decimals: 18,
    name: 'ROUTE'
  },
  {
    address: addresses.arbitrum.tokens.CAP ,  // CAP
    decimals: 18,
    name: 'CAP'
  },
  {
    address: addresses.arbitrum.tokens.DF ,  // DF
    decimals: 18,
    name: 'DF'
  },
  {
    address: addresses.arbitrum.tokens.MATH ,  // MATH
    decimals: 18,
    name: 'MATH'
  },
  {
    address: addresses.arbitrum.tokens.SDT ,  // SDT
    decimals: 18,
    name: 'SDT'
  },
  {
    address: addresses.arbitrum.tokens.MCB ,  // MCB
    decimals: 18,
    name: 'MCB'
  },
  {
    address: addresses.arbitrum.tokens.LON ,  // LON
    decimals: 18,
    name: 'LON'
  },
  {
    address: addresses.arbitrum.tokens.DVF ,  // DVF
    decimals: 18,
    name: 'DVF'
  },
  {
    address: addresses.arbitrum.tokens.FUSE ,  // FUSE
    decimals: 18,
    name: 'FUSE'
  },
  {
    address: addresses.arbitrum.tokens.CREAM ,  // CREAM
    decimals: 18,
    name: 'CREAM'
  },
  {
    address: addresses.arbitrum.tokens.GOVI ,  // GOVI
    decimals: 18,
    name: 'GOVI'
  },
  {
    address: addresses.arbitrum.tokens.STRP ,  // STRP
    decimals: 18,
    name: 'STRP'
  },
  {
    address: addresses.arbitrum.tokens.POP ,  // POP
    decimals: 18,
    name: 'POP'
  },
  {
    address: addresses.arbitrum.tokens.OVR ,  // OVR
    decimals: 18,
    name: 'OVR'
  },
  {
    address: addresses.arbitrum.tokens.RGT ,  // RGT
    decimals: 18,
    name: 'RGT'
  },
  {
    address: addresses.arbitrum.tokens.DFYN ,  // DFYN
    decimals: 18,
    name: 'DFYN'
  },
  {
    address: addresses.arbitrum.tokens.HOP ,  // HOP
    decimals: 18,
    name: 'HOP'
  },
  {
    address: addresses.arbitrum.tokens.PLS ,  // PLS
    decimals: 18,
    name: 'PLS'
  },
  {
    address: addresses.arbitrum.tokens.VSTA ,  // VSTA
    decimals: 18,
    name: 'VSTA'
  },
  {
    address: addresses.arbitrum.tokens.BLANK ,  // BLANK
    decimals: 18,
    name: 'BLANK'
  },
  {
    address: addresses.arbitrum.tokens.FOREX ,  // FOREX
    decimals: 18,
    name: 'FOREX'
  },
  {
    address: addresses.arbitrum.tokens.DERI ,  // DERI
    decimals: 18,
    name: 'DERI'
  },
  {
    address: addresses.arbitrum.tokens.MTA ,  // MTA
    decimals: 18,
    name: 'MTA'
  },
  {
    address: addresses.arbitrum.tokens.O3 ,  // O3
    decimals: 18,
    name: 'O3'
  },
  {
    address: addresses.arbitrum.tokens.RDNT ,  // RDNT
    decimals: 18,
    name: 'RDNT'
  },
  {
    address: addresses.arbitrum.tokens.MATTER ,  // MATTER
    decimals: 18,
    name: 'MATTER'
  },
  {
    address: addresses.arbitrum.tokens.CNFI ,  // CNFI
    decimals: 18,
    name: 'CNFI'
  },
  {
    address: addresses.arbitrum.tokens.GRG ,  // GRG
    decimals: 18,
    name: 'GRG'
  },
  {
    address: addresses.arbitrum.tokens.PICKLE ,  // PICKLE
    decimals: 18,
    name: 'PICKLE'
  },
  {
    address: addresses.arbitrum.tokens.BFR ,  // BFR
    decimals: 18,
    name: 'BFR'
  },
  {
    address: addresses.arbitrum.tokens.DBL ,  // DBL
    decimals: 18,
    name: 'DBL'
  },
  {
    address: addresses.arbitrum.tokens.AGVE ,  // DBL
    decimals: 18,
    name: 'AGVE'
  }
];

module.exports = { 
  hotTokensARB,
  selectedTokensARB,
  stablecoinsARB,
  tokensARB
}
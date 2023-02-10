const { mainnet: addresses } = require('../addresses');

const hotTokensPOLY = [
    
];

const selectedTokensPOLY = [
  /*{
    address: addresses.polygon.tokens.USDC ,  // USDC
    decimals: 6,
    name: 'USDC'
  },*/
  {
    address: addresses.polygon.tokens.USDT ,  // USDT
    decimals: 6,
    name: 'USDT'
  }
];

const stablecoinsPOLY = [
  {
    address: addresses.polygon.tokens.USDC,  // USDC
    decimals: 6,
    name: 'USDC'
  },
  {
    address: addresses.polygon.tokens.USDT,  // USDT
    decimals: 6,
    name: 'USDT'
  },
  {
    address: addresses.polygon.tokens.DAI,  // DAI
    decimals: 18,
    name: 'DAI'
  },
  {
    address: addresses.polygon.tokens.miMATIC,  // miMATIC
    decimals: 18,
    name: 'miMATIC'
  },
  {
    address: addresses.polygon.tokens.BUSD,  // BUSD
    decimals: 18,
    name: 'BUSD'
  },
  {
    address: addresses.polygon.tokens.BOB,  // BOB
    decimals: 18,
    name: 'BOB'
  },
  /*{
    address: addresses.polygon.tokens.FRAX,  // FRAX
    decimals: 18,
    name: 'FRAX'
  },*/
  {
    address: addresses.polygon.tokens.EURS,  // EURS
    decimals: 2,
    name: 'EURS'
  },
  {
    address: addresses.polygon.tokens.EURT,  // EURT
    decimals: 6,
    name: 'EURT'
  },
  {
    address: addresses.polygon.tokens.AGEUR,  // AGEUR
    decimals: 18,
    name: 'AGEUR'
  },
  {
    address: addresses.polygon.tokens.PAR,  // PAR
    decimals: 18,
    name: 'PAR'
  },
  {
    address: addresses.polygon.tokens.USDPlus,  // USDPlus
    decimals: 6,
    name: 'USDPlus'
  },
  {
    address: addresses.polygon.tokens.NUSD,  // NUSD
    decimals: 18,
    name: 'NUSD'
  },
  {
    address: addresses.polygon.tokens.TUSD,  // TUSD
    decimals: 18,
    name: 'TUSD'
  },
  {
    address: addresses.polygon.tokens.USX,  // USX
    decimals: 18,
    name: 'USX'
  },
  {
    address: addresses.polygon.tokens.USDS,  // USDS
    decimals: 18,
    name: 'USDS'
  },
  {
    address: addresses.polygon.tokens.RAI,  // RAI
    decimals: 18,
    name: 'RAI'
  },
  {
    address: addresses.polygon.tokens.USDR,  // USDR
    decimals: 9,
    name: 'USDR'
  },
  {
    address: addresses.polygon.tokens.USDK,  // USDK
    decimals: 18,
    name: 'USDK'
  },
  {
    address: addresses.polygon.tokens.LUSD,  // LUSD
    decimals: 18,
    name: 'LUSD'
  }
];

const tokensPOLY = [
  {
    address: addresses.polygon.tokens.USDC,  // USDC
    decimals: 6,
    name: 'USDC'
  },
  {
    address: addresses.polygon.tokens.USDT,  // USDT
    decimals: 6,
    name: 'USDT'
  },
  {
    address: addresses.polygon.tokens.DAI,  // DAI
    decimals: 18,
    name: 'DAI'
  },
  {
    address: addresses.polygon.tokens.miMATIC,  // miMATIC
    decimals: 18,
    name: 'miMATIC'
  },
  {
    address: addresses.polygon.tokens.BUSD,  // BUSD
    decimals: 18,
    name: 'BUSD'
  },
  {
    address: addresses.polygon.tokens.BOB,  // BOB
    decimals: 18,
    name: 'BOB'
  },
  /*{
    address: addresses.polygon.tokens.FRAX,  // FRAX
    decimals: 18,
    name: 'FRAX'
  },*/
  {
    address: addresses.polygon.tokens.EURS,  // EURS
    decimals: 2,
    name: 'EURS'
  },
  {
    address: addresses.polygon.tokens.EURT,  // EURT
    decimals: 6,
    name: 'EURT'
  },
  {
    address: addresses.polygon.tokens.AGEUR,  // AGEUR
    decimals: 18,
    name: 'AGEUR'
  },
  {
    address: addresses.polygon.tokens.PAR,  // PAR
    decimals: 18,
    name: 'PAR'
  },
  {
    address: addresses.polygon.tokens.USDPlus,  // USDPlus
    decimals: 6,
    name: 'USDPlus'
  },
  {
    address: addresses.polygon.tokens.NUSD,  // NUSD
    decimals: 18,
    name: 'NUSD'
  },
  {
    address: addresses.polygon.tokens.TUSD,  // TUSD
    decimals: 18,
    name: 'TUSD'
  },
  {
    address: addresses.polygon.tokens.USX,  // USX
    decimals: 18,
    name: 'USX'
  },
  {
    address: addresses.polygon.tokens.USDS,  // USDS
    decimals: 18,
    name: 'USDS'
  },
  {
    address: addresses.polygon.tokens.RAI,  // RAI
    decimals: 18,
    name: 'RAI'
  },
  {
    address: addresses.polygon.tokens.USDR,  // USDR
    decimals: 9,
    name: 'USDR'
  },
  {
    address: addresses.polygon.tokens.USDK,  // USDK
    decimals: 18,
    name: 'USDK'
  },
  {
    address: addresses.polygon.tokens.LUSD,  // LUSD
    decimals: 18,
    name: 'LUSD'
  },
  {
    address: addresses.polygon.tokens.BNB,  // BNB
    decimals: 18,
    name: 'BNB'
  },
  {
    address: addresses.polygon.tokens.AVAX,  // AVAX
    decimals: 18,
    name: 'AVAX'
  },
  {
    address: addresses.polygon.tokens.UNI,  // UNI
    decimals: 18,
    name: 'UNI'
  },
  {
    address: addresses.polygon.tokens.WBTC,  // WBTC
    decimals: 8,
    name: 'WBTC'
  },
  {
    address: addresses.polygon.tokens.LINK,  // LINK
    decimals: 18,
    name: 'LINK'
  },
  {
    address: addresses.polygon.tokens.LEO,  // LEO
    decimals: 18,
    name: 'LEO'
  },
  {
    address: addresses.polygon.tokens.CRO,  // CRO
    decimals: 8,
    name: 'CRO'
  },
  {
    address: addresses.polygon.tokens.APE,  // APE
    decimals: 18,
    name: 'APE'
  },
  {
    address: addresses.polygon.tokens.LDO,  // LDO
    decimals: 18,
    name: 'LDO'
  },
  {
    address: addresses.polygon.tokens.MANA,  // MANA
    decimals: 18,
    name: 'MANA'
  },
  {
    address: addresses.polygon.tokens.AAVE,  // AAVE
    decimals: 18,
    name: 'AAVE'
  },
  {
    address: addresses.polygon.tokens.SAND,  // SAND
    decimals: 18,
    name: 'SAND'
  },
  {
    address: addresses.polygon.tokens.THETA,  // THETA
    decimals: 18,
    name: 'THETA'
  },
  {
    address: addresses.polygon.tokens.PAX,  // PAX
    decimals: 18,
    name: 'PAX'
  },
  {
    address: addresses.polygon.tokens.FTM,  // FTM
    decimals: 18,
    name: 'FTM'
  },
  {
    address: addresses.polygon.tokens.HT,  // HT
    decimals: 18,
    name: 'HT'
  },
  {
    address: addresses.polygon.tokens.GRT,  // GRT
    decimals: 18,
    name: 'GRT'
  },
  {
    address: addresses.polygon.tokens.CHZ,  // CHZ
    decimals: 18,
    name: 'CHZ'
  },
  {
    address: addresses.polygon.tokens.USDD,  // USDD
    decimals: 18,
    name: 'USDD'
  },
  {
    address: addresses.polygon.tokens.FXS,  // FXS
    decimals: 18,
    name: 'FXS'
  },
  {
    address: addresses.polygon.tokens.MKR,  // MKR
    decimals: 18,
    name: 'MKR'
  },
  {
    address: addresses.polygon.tokens.CRV,  // CRV
    decimals: 18,
    name: 'CRV'
  },
  {
    address: addresses.polygon.tokens.RPL,  // RPL
    decimals: 18,
    name: 'RPL'
  },
  {
    address: addresses.polygon.tokens.GUSD,  // GUSD
    decimals: 2,
    name: 'GUSD'
  },
  {
    address: addresses.polygon.tokens.SNX,  // SNX
    decimals: 18,
    name: 'SNX'
  },
  {
    address: addresses.polygon.tokens.PAXG,  // PAXG
    decimals: 18,
    name: 'PAXG'
  },
  {
    address: addresses.polygon.tokens.NEXO,  // NEXO
    decimals: 18,
    name: 'NEXO'
  },
  {
    address: addresses.polygon.tokens.WOO,  // WOO
    decimals: 18,
    name: 'WOO'
  },
  {
    address: addresses.polygon.tokens.ONEINCH,  // ONEINCH
    decimals: 18,
    name: 'ONEINCH'
  },
  {
    address: addresses.polygon.tokens.ENJ,  // ENJ
    decimals: 18,
    name: 'ENJ'
  },
  {
    address: addresses.polygon.tokens.HOT,  // HOT
    decimals: 18,
    name: 'HOT'
  },
  {
    address: addresses.polygon.tokens.COMP,  // COMP
    decimals: 18,
    name: 'COMP'
  },
  {
    address: addresses.polygon.tokens.LRC,  // LRC
    decimals: 18,
    name: 'LRC'
  },
  {
    address: addresses.polygon.tokens.BAT,  // BAT
    decimals: 18,
    name: 'BAT'
  },
  {
    address: addresses.polygon.tokens.AMP,  // AMP
    decimals: 18,
    name: 'AMP'
  },
  {
    address: addresses.polygon.tokens.FET,  // FET
    decimals: 18,
    name: 'FET'
  },
  {
    address: addresses.polygon.tokens.IOTX,  // IOTX
    decimals: 18,
    name: 'IOTX'
  },
  {
    address: addresses.polygon.tokens.GNO,  // GNO
    decimals: 18,
    name: 'GNO'
  },
  {
    address: addresses.polygon.tokens.CEL,  // CEL
    decimals: 4,
    name: 'CEL'
  },
  {
    address: addresses.polygon.tokens.POLY,  // POLY
    decimals: 18,
    name: 'POLY'
  },
  {
    address: addresses.polygon.tokens.BAL,  // BAL
    decimals: 18,
    name: 'BAL'
  },
  {
    address: addresses.polygon.tokens.SXP,  // SXP
    decimals: 18,
    name: 'SXP'
  },
  {
    address: addresses.polygon.tokens.SUSHI,  // SUSHI
    decimals: 18,
    name: 'SUSHI'
  },
  {
    address: addresses.polygon.tokens.YFI,  // YFI
    decimals: 18,
    name: 'YFI'
  },
  {
    address: addresses.polygon.tokens.UST,  // UST
    decimals: 18,
    name: 'UST'
  },
  {
    address: addresses.polygon.tokens.AGIX,  // AGIX
    decimals: 8,
    name: 'AGIX'
  },
  {
    address: addresses.polygon.tokens.BAND,  // BAND
    decimals: 18,
    name: 'BAND'
  },
  {
    address: addresses.polygon.tokens.GLM,  // GLM
    decimals: 18,
    name: 'GLM'
  },
  {
    address: addresses.polygon.tokens.CHSB,  // CHSB
    decimals: 8,
    name: 'CHSB'
  },
  {
    address: addresses.polygon.tokens.MASK,  // MASK
    decimals: 18,
    name: 'MASK'
  },
  {
    address: addresses.polygon.tokens.ELON,  // ELON
    decimals: 18,
    name: 'ELON'
  },
  {
    address: addresses.polygon.tokens.OMG,  // OMG
    decimals: 18,
    name: 'OMG'
  },
  {
    address: addresses.polygon.tokens.OCEAN,  // OCEAN
    decimals: 18,
    name: 'OCEAN'
  },
  {
    address: addresses.polygon.tokens.ZRX,  // ZRX
    decimals: 18,
    name: 'ZRX'
  },
  {
    address: addresses.polygon.tokens.RNDR,  // RNDR
    decimals: 18,
    name: 'RNDR'
  },
  {
    address: addresses.polygon.tokens.LPT,  // LPT
    decimals: 18,
    name: 'LPT'
  },
  {
    address: addresses.polygon.tokens.SRM,  // SRM
    decimals: 6,
    name: 'SRM'
  },
  {
    address: addresses.polygon.tokens.TEL,  // TEL
    decimals: 2,
    name: 'TEL'
  },
  {
    address: addresses.polygon.tokens.SYN,  // SYN
    decimals: 18,
    name: 'SYN'
  },
  {
    address: addresses.polygon.tokens.EWTB,  // EWTB
    decimals: 18,
    name: 'EWTB'
  },
  {
    address: addresses.polygon.tokens.UMA,  // UMA
    decimals: 18,
    name: 'UMA'
  },
  {
    address: addresses.polygon.tokens.INJ,  // INJ
    decimals: 18,
    name: 'INJ'
  },
  {
    address: addresses.polygon.tokens.RLC,  // RLC
    decimals: 9,
    name: 'RLC'
  },
  {
    address: addresses.polygon.tokens.KNC,  // KNC
    decimals: 18,
    name: 'KNC'
  },
  {
    address: addresses.polygon.tokens.VGX,  // VGX
    decimals: 8,
    name: 'VGX'
  },
  {
    address: addresses.polygon.tokens.GTC,  // GTC
    decimals: 18,
    name: 'GTC'
  },
  {
    address: addresses.polygon.tokens.aETHc,  // aETHc
    decimals: 18,
    name: 'aETHc'
  },
  {
    address: addresses.polygon.tokens.PYR,  // PYR
    decimals: 18,
    name: 'PYR'
  },
  {
    address: addresses.polygon.tokens.IQ,  // IQ
    decimals: 18,
    name: 'IQ'
  },
  {
    address: addresses.polygon.tokens.XYO,  // XYO
    decimals: 18,
    name: 'XYO'
  },
  {
    address: addresses.polygon.tokens.ORBS,  // ORBS
    decimals: 18,
    name: 'ORBS'
  },
  {
    address: addresses.polygon.tokens.POWR,  // POWR
    decimals: 6,
    name: 'POWR'
  },
  {
    address: addresses.polygon.tokens.POND,  // POND
    decimals: 18,
    name: 'POND'
  },
  {
    address: addresses.polygon.tokens.BEPRO,  // BEPRO
    decimals: 18,
    name: 'BEPRO'
  },
  {
    address: addresses.polygon.tokens.BOBA,  // BOBA
    decimals: 18,
    name: 'BOBA'
  },
  {
    address: addresses.polygon.tokens.BNT,  // BNT
    decimals: 18,
    name: 'BNT'
  },
  {
    address: addresses.polygon.tokens.KEEP,  // KEEP
    decimals: 18,
    name: 'KEEP'
  },
  {
    address: addresses.polygon.tokens.LCX,  // LCX
    decimals: 18,
    name: 'LCX'
  },
  {
    address: addresses.polygon.tokens.GNS,  // GNS
    decimals: 18,
    name: 'GNS'
  },
  {
    address: addresses.polygon.tokens.OGN,  // OGN
    decimals: 18,
    name: 'OGN'
  },
  {
    address: addresses.polygon.tokens.sUSD,  // sUSD
    decimals: 18,
    name: 'sUSD'
  },
  {
    address: addresses.polygon.tokens.XSGD,  // XSGD
    decimals: 6,
    name: 'XSGD'
  },
  {
    address: addresses.polygon.tokens.MFT,  // MFT
    decimals: 18,
    name: 'MFT'
  },
  {
    address: addresses.polygon.tokens.OXT,  // OXT
    decimals: 18,
    name: 'OXT'
  },
  {
    address: addresses.polygon.tokens.ADS,  // ADS
    decimals: 11,
    name: 'ADS'
  },
  {
    address: addresses.polygon.tokens.BWO,  // BWO
    decimals: 18,
    name: 'BWO'
  },
  {
    address: addresses.polygon.tokens.GHST,  // GHST
    decimals: 18,
    name: 'GHST'
  },
  {
    address: addresses.polygon.tokens.ATA,  // ATA
    decimals: 18,
    name: 'ATA'
  },
  {
    address: addresses.polygon.tokens.TRB,  // TRB
    decimals: 18,
    name: 'TRB'
  },
  {
    address: addresses.polygon.tokens.LIT,  // LIT
    decimals: 18,
    name: 'LIT'
  },
  {
    address: addresses.polygon.tokens.BIFI,  // BIFI
    decimals: 18,
    name: 'BIFI'
  },
  {
    address: addresses.polygon.tokens.RAMP,  // RAMP
    decimals: 18,
    name: 'RAMP'
  },
  {
    address: addresses.polygon.tokens.FORTH,  // FORTH
    decimals: 18,
    name: 'FORTH'
  },
  {
    address: addresses.polygon.tokens.ETHM,  // ETHM
    decimals: 18,
    name: 'ETHM'
  },
  {
    address: addresses.polygon.tokens.ORN,  // ORN
    decimals: 8,
    name: 'ORN'
  },
  {
    address: addresses.polygon.tokens.LEND,  // LEND
    decimals: 18,
    name: 'LEND'
  },
  {
    address: addresses.polygon.tokens.CXO,  // CXO
    decimals: 18,
    name: 'CXO'
  },
  {
    address: addresses.polygon.tokens.HUSD,  // HUSD
    decimals: 8,
    name: 'HUSD'
  },
  {
    address: addresses.polygon.tokens.UBT,  // UBT
    decimals: 8,
    name: 'UBT'
  },
  {
    address: addresses.polygon.tokens.ICHI,  // ICHI
    decimals: 18,
    name: 'ICHI'
  },
  {
    address: addresses.polygon.tokens.RARI,  // RARI
    decimals: 18,
    name: 'RARI'
  },
  {
    address: addresses.polygon.tokens.AIOZ,  // AIOZ
    decimals: 18,
    name: 'AIOZ'
  },
  {
    address: addresses.polygon.tokens.SWISE,  // SWISE
    decimals: 18,
    name: 'SWISE'
  },
  {
    address: addresses.polygon.tokens.SPHERE,  // SPHERE
    decimals: 18,
    name: 'SPHERE'
  },
  {
    address: addresses.polygon.tokens.IXT,  // IXT
    decimals: 18,
    name: 'IXT'
  },
  {
    address: addresses.polygon.tokens.ROUTE,  // ROUTE
    decimals: 18,
    name: 'ROUTE'
  },
  {
    address: addresses.polygon.tokens.PLU,  // PLU
    decimals: 18,
    name: 'PLU'
  },
  {
    address: addresses.polygon.tokens.BOSON,  // BOSON
    decimals: 18,
    name: 'BOSON'
  },
  {
    address: addresses.polygon.tokens.FSN,  // FSN
    decimals: 18,
    name: 'FSN'
  },
  {
    address: addresses.polygon.tokens.DATA,  // DATA
    decimals: 18,
    name: 'DATA'
  },
  {
    address: addresses.polygon.tokens.BLZ,  // BLZ
    decimals: 18,
    name: 'BLZ'
  },
  {
    address: addresses.polygon.tokens.FEG,  // FEG
    decimals: 9,
    name: 'FEG'
  },
  {
    address: addresses.polygon.tokens.BZRX,  // BZRX
    decimals: 18,
    name: 'BZRX'
  },
  {
    address: addresses.polygon.tokens.FOX,  // FOX
    decimals: 18,
    name: 'FOX'
  },
  {
    address: addresses.polygon.tokens.OM,  // OM
    decimals: 18,
    name: 'OM'
  },
  {
    address: addresses.polygon.tokens.ADX,  // ADX
    decimals: 18,
    name: 'ADX'
  },
  {
    address: addresses.polygon.tokens.DF,  // DF
    decimals: 18,
    name: 'DF'
  }
];

module.exports = { 
  hotTokensPOLY,
  selectedTokensPOLY,
  stablecoinsPOLY,
  tokensPOLY
}
const { mainnet: addresses } = require('../addresses');

const hotTokensBSC = [
    
];

const selectedTokensBSC = [
  /*{
    address: addresses.BSC.tokens.USDC ,  // USDC
    decimals: 6,
    name: 'USDC'
  },*/
  {
    address: addresses.BSC.tokens.USDT ,  // USDT
    decimals: 6,
    name: 'USDT'
  }
];

const stablecoinsBSC = [
  {
    address: addresses.BSC.tokens.BUSD,  // BUSD
    decimals: 18,
    name: 'BUSD'
  },
  {
    address: addresses.BSC.tokens.USDT,  // USDT
    decimals: 6,
    name: 'USDT'
  },
  {
    address: addresses.BSC.tokens.USDC,  // USDC
    decimals: 18,
    name: 'USDC'
  },
  {
    address: addresses.BSC.tokens.TUSD,  // TUSD
    decimals: 18,
    name: 'TUSD'
  },
  {
    address: addresses.BSC.tokens.USDD,  // USDD
    decimals: 18,
    name: 'USDD'
  },
  {
    address: addresses.BSC.tokens.DAI,  // DAI
    decimals: 18,
    name: 'DAI'
  },
  {
    address: addresses.BSC.tokens.HAY,  // HAY
    decimals: 18,
    name: 'HAY'
  },
  {
    address: addresses.BSC.tokens.VAI,  // VAI
    decimals: 18,
    name: 'VAI'
  },
  {
    address: addresses.BSC.tokens.USX,  // USX
    decimals: 18,
    name: 'USX'
  },
  /*{
    address: addresses.BSC.tokens.FRAX,  // FRAX
    decimals: 18,
    name: 'FRAX'
  },*/
  {
    address: addresses.BSC.tokens.USTC,  // USTC
    decimals: 18,
    name: 'USTC'
  },
  {
    address: addresses.BSC.tokens.USDP,  // USDP
    decimals: 18,
    name: 'USDP'
  },
  {
    address: addresses.BSC.tokens.USDPlus,  // USDPlus
    decimals: 6,
    name: 'USDPlus'
  },
  {
    address: addresses.BSC.tokens.USDS,  // USDS
    decimals: 18,
    name: 'USDS'
  },
  {
    address: addresses.BSC.tokens.MIM,  // MIM
    decimals: 18,
    name: 'MIM'
  },
  {
    address: addresses.BSC.tokens.USDN,  // USDN
    decimals: 18,
    name: 'USDN'
  },
  {
    address: addresses.BSC.tokens.BOB,  // BOB
    decimals: 18,
    name: 'BOB'
  },
  {
    address: addresses.BSC.tokens.FLUSD,  // FLUSD
    decimals: 18,
    name: 'FLUSD'
  }
];

const tokensBSC = [
  {
    address: addresses.BSC.tokens.BUSD,  // BUSD
    decimals: 18,
    name: 'BUSD'
  },
  {
    address: addresses.BSC.tokens.USDT,  // USDT
    decimals: 6,
    name: 'USDT'
  },
  {
    address: addresses.BSC.tokens.USDC,  // USDC
    decimals: 18,
    name: 'USDC'
  },
  {
    address: addresses.BSC.tokens.TUSD,  // TUSD
    decimals: 18,
    name: 'TUSD'
  },
  {
    address: addresses.BSC.tokens.USDD,  // USDD
    decimals: 18,
    name: 'USDD'
  },
  {
    address: addresses.BSC.tokens.DAI,  // DAI
    decimals: 18,
    name: 'DAI'
  },
  {
    address: addresses.BSC.tokens.HAY,  // HAY
    decimals: 18,
    name: 'HAY'
  },
  {
    address: addresses.BSC.tokens.VAI,  // VAI
    decimals: 18,
    name: 'VAI'
  },
  {
    address: addresses.BSC.tokens.USX,  // USX
    decimals: 18,
    name: 'USX'
  },
  /*{
    address: addresses.BSC.tokens.FRAX,  // FRAX
    decimals: 18,
    name: 'FRAX'
  },*/
  {
    address: addresses.BSC.tokens.USTC,  // USTC
    decimals: 18,
    name: 'USTC'
  },
  {
    address: addresses.BSC.tokens.USDP,  // USDP
    decimals: 18,
    name: 'USDP'
  },
  {
    address: addresses.BSC.tokens.USDPlus,  // USDPlus
    decimals: 6,
    name: 'USDPlus'
  },
  {
    address: addresses.BSC.tokens.USDS,  // USDS
    decimals: 18,
    name: 'USDS'
  },
  {
    address: addresses.BSC.tokens.MIM,  // MIM
    decimals: 18,
    name: 'MIM'
  },
  {
    address: addresses.BSC.tokens.USDN,  // USDN
    decimals: 18,
    name: 'USDN'
  },
  {
    address: addresses.BSC.tokens.BOB,  // BOB
    decimals: 18,
    name: 'BOB'
  },
  {
    address: addresses.BSC.tokens.FLUSD,  // FLUSD
    decimals: 18,
    name: 'FLUSD'
  },
  {
    address: addresses.BSC.tokens.BSCUSD,  // BSCUSD
    decimals: 18,
    name: 'BSCUSD'
  },
  {
    address: addresses.BSC.tokens.WBNB,  // WBNB
    decimals: 18,
    name: 'WBNB'
  },
  {
    address: addresses.BSC.tokens.anyUSDC,  // anyUSDC
    decimals: 18,
    name: 'anyUSDC'
  },
  {
    address: addresses.BSC.tokens.XRP,  // XRP
    decimals: 18,
    name: 'XRP'
  },
  {
    address: addresses.BSC.tokens.ADA,  // ADA
    decimals: 18,
    name: 'ADA'
  },
  {
    address: addresses.BSC.tokens.DOGE,  // DOGE
    decimals: 8,
    name: 'DOGE'
  },
  {
    address: addresses.BSC.tokens.MATIC,  // MATIC
    decimals: 18,
    name: 'MATIC'
  },
  {
    address: addresses.BSC.tokens.DOT,  // DOT
    decimals: 18,
    name: 'DOT'
  },
  {
    address: addresses.BSC.tokens.LTC,  // LTC
    decimals: 18,
    name: 'LTC'
  },
  {
    address: addresses.BSC.tokens.SHIB,  // SHIB
    decimals: 18,
    name: 'SHIB'
  },
  {
    address: addresses.BSC.tokens.AVAX,  // AVAX
    decimals: 18,
    name: 'AVAX'
  },
  {
    address: addresses.BSC.tokens.UNI,  // UNI
    decimals: 18,
    name: 'UNI'
  },
  {
    address: addresses.BSC.tokens.ATOM,  // ATOM
    decimals: 18,
    name: 'ATOM'
  },
  {
    address: addresses.BSC.tokens.LINK,  // LINK
    decimals: 18,
    name: 'LINK'
  },
  {
    address: addresses.BSC.tokens.ETC,  // ETC
    decimals: 18,
    name: 'ETC'
  },
  {
    address: addresses.BSC.tokens.BTT,  // BTT
    decimals: 18,
    name: 'BTT'
  },
  {
    address: addresses.BSC.tokens.BCH,  // BCH
    decimals: 18,
    name: 'BCH'
  },
  {
    address: addresses.BSC.tokens.NEAR,  // NEAR
    decimals: 18,
    name: 'NEAR'
  },
  {
    address: addresses.BSC.tokens.BTCB,  // BTCB
    decimals: 18,
    name: 'BTCB'
  },
  {
    address: addresses.BSC.tokens.EOS,  // EOS
    decimals: 18,
    name: 'EOS'
  },
  {
    address: addresses.BSC.tokens.FLOW,  // FLOW
    decimals: 18,
    name: 'FLOW'
  },
  {
    address: addresses.BSC.tokens.AXS,  // FLOW
    decimals: 18,
    name: 'FLOW'
  },
  {
    address: addresses.BSC.tokens.EGLD,  // EGLD
    decimals: 18,
    name: 'EGLD'
  },
  {
    address: addresses.BSC.tokens.XTZ,  // XTZ
    decimals: 18,
    name: 'XTZ'
  },
  {
    address: addresses.BSC.tokens.PAX,  // PAX
    decimals: 18,
    name: 'PAX'
  },
  {
    address: addresses.BSC.tokens.FTM,  // FTM
    decimals: 18,
    name: 'FTM'
  },
  {
    address: addresses.BSC.tokens.ZEC,  // ZEC
    decimals: 18,
    name: 'ZEC'
  },
  {
    address: addresses.BSC.tokens.MKR,  // MKR
    decimals: 18,
    name: 'MKR'
  },
  {
    address: addresses.BSC.tokens.SNX,  // SNX
    decimals: 18,
    name: 'SNX'
  },
  {
    address: addresses.BSC.tokens.FXS,  // FXS
    decimals: 18,
    name: 'FXS'
  },
  {
    address: addresses.BSC.tokens.TWT,  // TWT
    decimals: 18,
    name: 'TWT'
  },
  {
    address: addresses.BSC.tokens.IOTA,  // IOTA
    decimals: 6,
    name: 'IOTA'
  },
  {
    address: addresses.BSC.tokens.XEC,  // XEC
    decimals: 18,
    name: 'XEC'
  },
  {
    address: addresses.BSC.tokens.PAXG,  // PAXG
    decimals: 18,
    name: 'PAXG'
  },
  {
    address: addresses.BSC.tokens.ZIL,  // ZIL
    decimals: 12,
    name: 'ZIL'
  },
  {
    address: addresses.BSC.tokens.ETHW,  // ETHW
    decimals: 18,
    name: 'ETHW'
  },
  {
    address: addresses.BSC.tokens.GALA,  // GALA
    decimals: 18,
    name: 'GALA'
  },
  {
    address: addresses.BSC.tokens.ONEINCH,  // ONEINCH
    decimals: 18,
    name: 'ONEINCH'
  },
  {
    address: addresses.BSC.tokens.COMP,  // COMP
    decimals: 18,
    name: 'COMP'
  },
  {
    address: addresses.BSC.tokens.BAT,  // BAT
    decimals: 18,
    name: 'BAT'
  },
  {
    address: addresses.BSC.tokens.GMT,  // GMT
    decimals: 8,
    name: 'GMT'
  },
  {
    address: addresses.BSC.tokens.IOTX,  // IOTX
    decimals: 18,
    name: 'IOTX'
  },
  {
    address: addresses.BSC.tokens.XCN,  // XCN
    decimals: 18,
    name: 'XCN'
  },
  {
    address: addresses.BSC.tokens.YFI,  // YFI
    decimals: 18,
    name: 'YFI'
  },
  {
    address: addresses.BSC.tokens.ANKR,  // ANKR
    decimals: 18,
    name: 'ANKR'
  },
  {
    address: addresses.BSC.tokens.FET,  // FET
    decimals: 18,
    name: 'FET'
  },
  {
    address: addresses.BSC.tokens.JST,  // JST
    decimals: 18,
    name: 'JST'
  },
  {
    address: addresses.BSC.tokens.vBTC,  // vBTC
    decimals: 8,
    name: 'vBTC'
  },
  {
    address: addresses.BSC.tokens.BabyDoge,  // BabyDoge
    decimals: 9,
    name: 'BabyDoge'
  },
  {
    address: addresses.BSC.tokens.ONT,  // ONT
    decimals: 18,
    name: 'ONT'
  },
  {
    address: addresses.BSC.tokens.ANY,  // ANY
    decimals: 18,
    name: 'ANY'
  },
  {
    address: addresses.BSC.tokens.SFM,  // SFM
    decimals: 9,
    name: 'SFM'
  },
  {
    address: addresses.BSC.tokens.SFP,  // SFP
    decimals: 18,
    name: 'SFP'
  },
  {
    address: addresses.BSC.tokens.SXP,  // SXP
    decimals: 18,
    name: 'SXP'
  },
  {
    address: addresses.BSC.tokens.NFT,  // NFT
    decimals: 6,
    name: 'NFT'
  },
  {
    address: addresses.BSC.tokens.KNC,  // KNC
    decimals: 18,
    name: 'KNC'
  },
  {
    address: addresses.BSC.tokens.SLP,  // SLP
    decimals: 18,
    name: 'SLP'
  },
  {
    address: addresses.BSC.tokens.SYN,  // SYN
    decimals: 18,
    name: 'SYN'
  },
  {
    address: addresses.BSC.tokens.ILV,  // ILV
    decimals: 18,
    name: 'ILV'
  },
  {
    address: addresses.BSC.tokens.vUSDC,  // vUSDC
    decimals: 8,
    name: 'vUSDC'
  },
  {
    address: addresses.BSC.tokens.BAND,  // BAND
    decimals: 18,
    name: 'BAND'
  },
  {
    address: addresses.BSC.tokens.ELF,  // ELF
    decimals: 18,
    name: 'ELF'
  },
  {
    address: addresses.BSC.tokens.ALPHA,  // ALPHA
    decimals: 18,
    name: 'ALPHA'
  },
  {
    address: addresses.BSC.tokens.FLOKI,  // FLOKI
    decimals: 9,
    name: 'FLOKI'
  },
  {
    address: addresses.BSC.tokens.ALICE,  // ALICE
    decimals: 6,
    name: 'ALICE'
  },
  {
    address: addresses.BSC.tokens.PROM,  // PROM
    decimals: 18,
    name: 'PROM'
  },
  {
    address: addresses.BSC.tokens.CTSI,  // CTSI
    decimals: 18,
    name: 'CTSI'
  },
  {
    address: addresses.BSC.tokens.COTI,  // COTI
    decimals: 18,
    name: 'COTI'
  },
  {
    address: addresses.BSC.tokens.MDX,  // MDX
    decimals: 18,
    name: 'MDX'
  },
  {
    address: addresses.BSC.tokens.ORBS,  // ORBS
    decimals: 18,
    name: 'ORBS'
  },
  {
    address: addresses.BSC.tokens.WRX,  // WRX
    decimals: 8,
    name: 'WRX'
  },
  {
    address: addresses.BSC.tokens.CELR,  // CELR
    decimals: 18,
    name: 'CELR'
  },
  {
    address: addresses.BSC.tokens.BSW,  // BSW
    decimals: 18,
    name: 'BSW'
  },
  {
    address: addresses.BSC.tokens.XVS,  // XVS
    decimals: 18,
    name: 'XVS'
  },
  {
    address: addresses.BSC.tokens.BNT,  // BNT
    decimals: 18,
    name: 'BNT'
  },
  {
    address: addresses.BSC.tokens.PHA,  // PHA
    decimals: 18,
    name: 'PHA'
  },
  {
    address: addresses.BSC.tokens.REEF,  // REEF
    decimals: 18,
    name: 'REEF'
  },
  {
    address: addresses.BSC.tokens.CTK,  // CTK
    decimals: 6,
    name: 'CTK'
  },
  {
    address: addresses.BSC.tokens.vBUSD,  // vBUSD
    decimals: 8,
    name: 'vBUSD'
  },
  {
    address: addresses.BSC.tokens.bCFX,  // bCFX
    decimals: 18,
    name: 'bCFX'
  },
  {
    address: addresses.BSC.tokens.TLM,  // TLM
    decimals: 4,
    name: 'TLM'
  },
  {
    address: addresses.BSC.tokens.YFII,  // YFII
    decimals: 18,
    name: 'YFII'
  },
  {
    address: addresses.BSC.tokens.DODO,  // DODO
    decimals: 18,
    name: 'DODO'
  },
  {
    address: addresses.BSC.tokens.SAITO,  // SAITO
    decimals: 18,
    name: 'SAITO'
  },
  {
    address: addresses.BSC.tokens.ALPACA,  // ALPACA
    decimals: 18,
    name: 'ALPACA'
  },
  {
    address: addresses.BSC.tokens.TLOS,  // TLOS
    decimals: 18,
    name: 'TLOS'
  },
  {
    address: addresses.BSC.tokens.ATA,  // ATA
    decimals: 18,
    name: 'ATA'
  },
  {
    address: addresses.BSC.tokens.LIT,  // LIT
    decimals: 18,
    name: 'LIT'
  },
  {
    address: addresses.BSC.tokens.IDIA,  // IDIA
    decimals: 18,
    name: 'IDIA'
  },
  {
    address: addresses.BSC.tokens.U,  // U
    decimals: 18,
    name: 'U'
  },
  {
    address: addresses.BSC.tokens.LTO,  // LTO
    decimals: 18,
    name: 'LTO'
  },
  {
    address: addresses.BSC.tokens.BIFI,  // BIFI
    decimals: 18,
    name: 'BIFI'
  },
  {
    address: addresses.BSC.tokens.BPAY,  // BPAY
    decimals: 9,
    name: 'BPAY'
  },
  {
    address: addresses.BSC.tokens.FINE,  // FINE
    decimals: 18,
    name: 'FINE'
  },
  {
    address: addresses.BSC.tokens.BAKE,  // BAKE
    decimals: 18,
    name: 'BAKE'
  },
  {
    address: addresses.BSC.tokens.vUSDT,  // vUSDT
    decimals: 8,
    name: 'vUSDT'
  },
  {
    address: addresses.BSC.tokens.RAMP,  // RAMP
    decimals: 18,
    name: 'RAMP'
  },
  {
    address: addresses.BSC.tokens.KMD,  // KMD
    decimals: 18,
    name: 'KMD'
  },
  {
    address: addresses.BSC.tokens.DIA,  // DIA
    decimals: 18,
    name: 'DIA'
  },
  {
    address: addresses.BSC.tokens.LINA,  // LINA
    decimals: 18,
    name: 'LINA'
  },
  {
    address: addresses.BSC.tokens.KOGE,  // KOGE
    decimals: 18,
    name: 'KOGE'
  },
  {
    address: addresses.BSC.tokens.SANTOS,  // SANTOS
    decimals: 8,
    name: 'SANTOS'
  },
  {
    address: addresses.BSC.tokens.EPS,  // EPS
    decimals: 18,
    name: 'EPS'
  },
  {
    address: addresses.BSC.tokens.CREAM,  // CREAM
    decimals: 18,
    name: 'CREAM'
  },
  {
    address: addresses.BSC.tokens.vETH,  // vETH
    decimals: 8,
    name: 'vETH'
  },
  {
    address: addresses.BSC.tokens.FEG,  // FEG
    decimals: 9,
    name: 'FEG'
  },
  {
    address: addresses.BSC.tokens.TKO,  // TKO
    decimals: 18,
    name: 'TKO'
  },
  {
    address: addresses.BSC.tokens.PSTAKE,  // PSTAKE
    decimals: 18,
    name: 'PSTAKE'
  },
  {
    address: addresses.BSC.tokens.BZRX,  // BZRX
    decimals: 18,
    name: 'BZRX'
  },
  {
    address: addresses.BSC.tokens.CHESS,  // CHESS
    decimals: 18,
    name: 'CHESS'
  },
  {
    address: addresses.BSC.tokens.UFT,  // UFT
    decimals: 18,
    name: 'UFT'
  },
  {
    address: addresses.BSC.tokens.ADX,  // ADX
    decimals: 18,
    name: 'ADX'
  },
  {
    address: addresses.BSC.tokens.OM,  // OM
    decimals: 18,
    name: 'OM'
  },
  {
    address: addresses.BSC.tokens.COS,  // COS
    decimals: 18,
    name: 'COS'
  },
  {
    address: addresses.BSC.tokens.DF,  // DF
    decimals: 18,
    name: 'DF'
  },
  {
    address: addresses.BSC.tokens.iDF,  // iDF
    decimals: 18,
    name: 'iDF'
  },
  {
    address: addresses.BSC.tokens.FRONT,  // FRONT
    decimals: 18,
    name: 'FRONT'
  },
  {
    address: addresses.BSC.tokens.MATH,  // MATH
    decimals: 18,
    name: 'MATH'
  },
  {
    address: addresses.BSC.tokens.MDT,  // MDT
    decimals: 18,
    name: 'MDT'
  },
  {
    address: addresses.BSC.tokens.TOR,  // TOR
    decimals: 18,
    name: 'TOR'
  },
  {
    address: addresses.BSC.tokens.DEUS,  // DEUS
    decimals: 18,
    name: 'DEUS'
  },
  {
    address: addresses.BSC.tokens.RISE,  // RISE
    decimals: 18,
    name: 'RISE'
  },
  {
    address: addresses.BSC.tokens.BIDR,  // BIDR
    decimals: 18,
    name: 'BIDR'
  },
  {
    address: addresses.BSC.tokens.AUTO,  // AUTO
    decimals: 18,
    name: 'AUTO'
  },
  {
    address: addresses.BSC.tokens.UNCX,  // UNCX
    decimals: 18,
    name: 'UNCX'
  },
  {
    address: addresses.BSC.tokens.PSP,  // PSP
    decimals: 18,
    name: 'PSP'
  },
  {
    address: addresses.BSC.tokens.BURGER,  // BURGER
    decimals: 18,
    name: 'BURGER'
  },
  {
    address: addresses.BSC.tokens.FUSE,  // FUSE
    decimals: 18,
    name: 'FUSE'
  },
  {
    address: addresses.BSC.tokens.RFOX,  // RFOX
    decimals: 18,
    name: 'RFOX'
  },
  {
    address: addresses.BSC.tokens.GBYTE,  // GBYTE
    decimals: 18,
    name: 'GBYTE'
  },
  {
    address: addresses.BSC.tokens.DERC,  // DERC
    decimals: 18,
    name: 'DERC'
  },
  {
    address: addresses.BSC.tokens.MIR,  // MIR
    decimals: 18,
    name: 'MIR'
  },
  {
    address: addresses.BSC.tokens.FOR,  // FOR
    decimals: 18,
    name: 'FOR'
  },
  {
    address: addresses.BSC.tokens.HOGE,  // HOGE
    decimals: 9,
    name: 'HOGE'
  }
];

module.exports = { 
  hotTokensBSC,
  selectedTokensBSC,
  stablecoinsBSC,
  tokensBSC
}
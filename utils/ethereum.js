const { mainnet: addresses } = require('../addresses');

const hotTokensETH = [
    {
      address: addresses.ethereum.tokens.GRT,  // GRT
      decimals: 18,
      name: 'GRT'
    },
    {
      address: addresses.ethereum.tokens.ILV,  // ILV
      decimals: 18,
      name: 'ILV'
    },
    {
      address: addresses.ethereum.tokens.LUNC,  // LUNC
      decimals: 18,
      name: 'LUNC'
    },
    {
      address: addresses.ethereum.tokens.YFI,  // YFI
      decimals: 18,
      name: 'YFI'
    },
    {
      address: addresses.ethereum.tokens.OUSD,  // OUSD
      decimals: 18,
      name: 'OUSD'
    },
    {
      address: addresses.ethereum.tokens.SUSD,  // SUSD
      decimals: 18,
      name: 'SUSD'
    },
    {
      address: addresses.ethereum.tokens.CUSD,  // CUSD
      decimals: 18,
      name: 'CUSD'
    },
    {
      address: addresses.ethereum.tokens.MUSD,  // MUSD
      decimals: 18,
      name: 'MUSD'
    },
    {
      address: addresses.ethereum.tokens.HUSD,  // HUSD
      decimals: 8,
      name: 'HUSD'
    },
    {
      address: addresses.ethereum.tokens.PSP,  // PSP
      decimals: 18,
      name: 'PSP'
    },
    {
      address: addresses.ethereum.tokens.FTM,  // FTM
      decimals: 18,
      name: 'FTM'
    },
    {
      address: addresses.ethereum.tokens.LRC,  // LRC
      decimals: 18,
      name: 'LRC'
    },
    {
      address: addresses.ethereum.tokens.NMR,  // NMR
      decimals: 18,
      name: 'NMR'
    },
    {
      address: addresses.ethereum.tokens.GALA,  // GALA
      decimals: 8,
      name: 'GALA'
    },
    {
      address: addresses.ethereum.tokens.QNT,  // QNT
      decimals: 18,
      name: 'QNT'
    },
    {
      address: addresses.ethereum.tokens.PRO,  // PRO
      decimals: 8,
      name: 'PRO'
    },
    {
      address: addresses.ethereum.tokens.CRO,  // CRO
      decimals: 8,
      name: 'CRO'
    },
    {
      address: addresses.ethereum.tokens.renDOGE,  // renDOGE
      decimals: 8,
      name: 'renDOGE'
    },
    {
      address: addresses.ethereum.tokens.RUNE,  // RUNE
      decimals: 18,
      name: 'RUNE'
    },
    {
      address: addresses.ethereum.tokens.SNX,  // SNX
      decimals: 18,
      name: 'SNX'
    },
    {
      address: addresses.ethereum.tokens.AERGO,  // AERGO
      decimals: 18,
      name: 'AERGO'
    },
    {
      address: addresses.ethereum.tokens.LUSD,  // LUSD
      decimals: 18,
      name: 'LUSD'
    },
    {
      address: addresses.ethereum.tokens.IQ,  // IQ
      decimals: 18,
      name: 'IQ'
    },
    {
      address: addresses.ethereum.tokens.BAT,  // BAT
      decimals: 18,
      name: 'BAT'
    },
    {
      address: addresses.ethereum.tokens.ANY,  // ANY
      decimals: 18,
      name: 'ANY'
    },
    {
      address: addresses.ethereum.tokens.FORTH,  // FORTH
      decimals: 18,
      name: 'FORTH'
    },
    {
      address: addresses.ethereum.tokens.WOOFY,  // WOOFY
      decimals: 12,
      name: 'WOOFY'
    },
    {
      address: addresses.ethereum.tokens.ENJ,  // ENJ
      decimals: 18,
      name: 'ENJ'
    },
    {
      address: addresses.ethereum.tokens.SDT,  // SDT
      decimals: 18,
      name: 'SDT'
    },
    {
      address: addresses.ethereum.tokens.LON,  // LON
      decimals: 18,
      name: 'LON'
    },
    {
      address: addresses.ethereum.tokens.LCX,  // LCX
      decimals: 18,
      name: 'LCX'
    },
    {
      address: addresses.ethereum.tokens.ALPHA,  // ALPHA
      decimals: 18,
      name: 'ALPHA'
    },
    {
      address: addresses.ethereum.tokens.SYN,  // SYN
      decimals: 18,
      name: 'SYN'
    },
    {
      address: addresses.ethereum.tokens.CEL,  // CEL
      decimals: 4,
      name: 'CEL'
    },
    {
      address: addresses.ethereum.tokens.INJ,  // INJ
      decimals: 18,
      name: 'INJ'
    },
    {
      address: addresses.ethereum.tokens.TEL,  // TEL
      decimals: 2,
      name: 'TEL'
    },
    {
      address: addresses.ethereum.tokens.RARE,  // RARE
      decimals: 18,
      name: 'RARE'
    },
    {
      address: addresses.ethereum.tokens.USDN,  // USDN
      decimals: 18,
      name: 'USDN'
    },
    {
      address: addresses.ethereum.tokens.WZEC,  // WZEC
      decimals: 18,
      name: 'WZEC'
    },
    {
      address: addresses.ethereum.tokens.SPI,  // SPI
      decimals: 18,
      name: 'SPI'
    },
    {
      address: addresses.ethereum.tokens.HVN,  // HVN
      decimals: 8,
      name: 'HVN'
    },
    {
      address: addresses.ethereum.tokens.XIO,  // XIO
      decimals: 18,
      name: 'XIO'
    },
    {
      address: addresses.ethereum.tokens.USDP,  // USDP
      decimals: 18,
      name: 'USDP'
    },
    {
      address: addresses.ethereum.tokens.MIM,  // MIM
      decimals: 18,
      name: 'MIM'
    },
    {
      address: addresses.ethereum.tokens.JRT,  // JRT
      decimals: 18,
      name: 'JRT'
    },
    {
      address: addresses.ethereum.tokens.DRT,  // DRT
      decimals: 8,
      name: 'DRT'
    },
    {
      address: addresses.ethereum.tokens.LEND,  // LEND
      decimals: 18,
      name: 'LEND'
    },
    {
      address: addresses.ethereum.tokens.SENT,  // SENT
      decimals: 8,
      name: 'SENT'
    },
    {
      address: addresses.ethereum.tokens.TRU,  // TRU
      decimals: 8,
      name: 'TRU'
    },
    {
      address: addresses.ethereum.tokens.TRAC,  // TRAC
      decimals: 18,
      name: 'TRAC'
    },
    {
      address: addresses.ethereum.tokens.VSP,  // VSP
      decimals: 18,
      name: 'VSP'
    },
    {
      address: addresses.ethereum.tokens.USTC,  // USTC
      decimals: 18,
      name: 'USTC'
    },
    {
      address: addresses.ethereum.tokens.BUSD,  // BUSD
      decimals: 18,
      name: 'BUSD'
    },
    {
      address: addresses.ethereum.tokens.MX,  // MX
      decimals: 18,
      name: 'MX'
    },
    {
      address: addresses.ethereum.tokens.HOT,  // HOT
      decimals: 18,
      name: 'HOT'
    },
    {
      address: addresses.ethereum.tokens.GNO,  // GNO
      decimals: 18,
      name: 'GNO'
    },
    {
      address: addresses.ethereum.tokens.NDX,  // NDX
      decimals: 18,
      name: 'NDX'
    },
    {
      address: addresses.ethereum.tokens.PAXG,  // PAXG
      decimals: 18,
      name: 'PAXG'
    },
    {
      address: addresses.ethereum.tokens.STAKE,  // STAKE
      decimals: 18,
      name: 'STAKE'
    },
    {
      address: addresses.ethereum.tokens.BAND,  // BAND
      decimals: 18,
      name: 'BAND'
    },
    {
      address: addresses.ethereum.tokens.COMBO,  // COMBO
      decimals: 18,
      name: 'COMBO'
    },
    {
      address: addresses.ethereum.tokens.REQ,  // REQ
      decimals: 18,
      name: 'REQ'
    },
    {
      address: addresses.ethereum.tokens.ZCN,  // ZCN
      decimals: 10,
      name: 'ZCN'
    },
    {
      address: addresses.ethereum.tokens.VOLT,  // VOLT
      decimals: 9,
      name: 'VOLT'
    },
    {
      address: addresses.ethereum.tokens.BOND,  // BOND
      decimals: 18,
      name: 'BOND'
    },
    {
      address: addresses.ethereum.tokens.GOVI,  // GOVI
      decimals: 18,
      name: 'GOVI'
    },
    {
      address: addresses.ethereum.tokens.TAD,  // TAD
      decimals: 18,
      name: 'TAD'
    },
    {
      address: addresses.ethereum.tokens.DFD,  // DFD
      decimals: 18,
      name: 'DFD'
    },
    {
      address: addresses.ethereum.tokens.SKL,  // SKL
      decimals: 18,
      name: 'SKL'
    },
    {
      address: addresses.ethereum.tokens.HBTC,  // HBTC
      decimals: 18,
      name: 'HBTC'
    },
    {
      address: addresses.ethereum.tokens.FXS,  // FXS
      decimals: 18,
      name: 'FXS'
    },
    {
      address: addresses.ethereum.tokens.TUSD,  // TUSD
      decimals: 18,
      name: 'TUSD'
    },
    {
      address: addresses.ethereum.tokens.KNC,  // KNC
      decimals: 18,
      name: 'KNC'
    },
    {
      address: addresses.ethereum.tokens.OCEAN,  // OCEAN
      decimals: 18,
      name: 'OCEAN'
    },
    {
      address: addresses.ethereum.tokens.MLN,  // MLN
      decimals: 18,
      name: 'MLN'
    },
    {
      address: addresses.ethereum.tokens.SRM,  // SRM
      decimals: 6,
      name: 'SRM'
    },
    {
      address: addresses.ethereum.tokens.MTA,  // MTA
      decimals: 18,
      name: 'MTA'
    },
    {
      address: addresses.ethereum.tokens.LYM,  // LYM
      decimals: 18,
      name: 'LYM'
    },
    {
      address: addresses.ethereum.tokens.FNT,  // FNT
      decimals: 6,
      name: 'FNT'
    },
    {
      address: addresses.ethereum.tokens.UNI,  // UNI
      decimals: 18,
      name: 'UNI'
    },
    {
      address: addresses.ethereum.tokens.OXT,  // OXT
      decimals: 18,
      name: 'OXT'
    },
    {
      address: addresses.ethereum.tokens.ASTRO,  // ASTRO
      decimals: 18,
      name: 'ASTRO'
    },
    {
      address: addresses.ethereum.tokens.ZEON,  // ZEON
      decimals: 18,
      name: 'ZEON'
    },
    {
      address: addresses.ethereum.tokens.renBTC,  // renBTC
      decimals: 8,
      name: 'renBTC'
    },
    {
      address: addresses.ethereum.tokens.pSAFEMOON,  // pSAFEMOON
      decimals: 18,
      name: 'pSAFEMOON'
    },
    {
      address: addresses.ethereum.tokens.SATA,  // SATA
      decimals: 18,
      name: 'SATA'
    },
    {
      address: addresses.ethereum.tokens.BLT,  // BLT
      decimals: 18,
      name: 'BLT'
    },
    {
      address: addresses.ethereum.tokens.GEN,  // GEN
      decimals: 18,
      name: 'GEN'
    },
    {
      address: addresses.ethereum.tokens.SAND,  // SAND
      decimals: 18,
      name: 'SAND'
    },
    {
      address: addresses.ethereum.tokens.ELON,  // ELON
      decimals: 18,
      name: 'ELON'
    },
    {
      address: addresses.ethereum.tokens.SPANK,  // SPANK
      decimals: 18,
      name: 'SPANK'
    },
    {
      address: addresses.ethereum.tokens.AUC,  // AUC
      decimals: 18,
      name: 'AUC'
    },
    {
      address: addresses.ethereum.tokens.GAS,  // GAS
      decimals: 18,
      name: 'GAS'
    },
    {
      address: addresses.ethereum.tokens.RBN,  // RBN
      decimals: 18,
      name: 'RBN'
    },
    {
      address: addresses.ethereum.tokens.IDRT,  // IDRT
      decimals: 2,
      name: 'IDRT'
    },
    {
      address: addresses.ethereum.tokens.BZRX,  // BZRX
      decimals: 18,
      name: 'BZRX'
    },
    {
      address: addresses.ethereum.tokens.GET,  // GET
      decimals: 18,
      name: 'GET'
    },
    {
      address: addresses.ethereum.tokens.GUPPY,  // GUPPY
      decimals: 3,
      name: 'GUPPY'
    },
    {
      address: addresses.ethereum.tokens.RCN,  // RCN
      decimals: 18,
      name: 'RCN'
    },
    {
      address: addresses.ethereum.tokens.HOGE,  // HOGE
      decimals: 9,
      name: 'HOGE'
    },
    {
      address: addresses.ethereum.tokens.RGT,  // RGT
      decimals: 18,
      name: 'RGT'
    },
    {
      address: addresses.ethereum.tokens.BAL,  // BAL
      decimals: 18,
      name: 'BAL'
    },
    {
      address: addresses.ethereum.tokens.HT,  // HT
      decimals: 18,
      name: 'HT'
    },
    {
      address: addresses.ethereum.tokens.BiFi,  // BiFi
      decimals: 18,
      name: 'BiFi'
    },
    {
      address: addresses.ethereum.tokens.ARMOR,  // ARMOR
      decimals: 18,
      name: 'ARMOR'
    },
    {
      address: addresses.ethereum.tokens.ANT,  // ANT
      decimals: 18,
      name: 'ANT'
    },
    {
      address: addresses.ethereum.tokens.XFT,  // XFT
      decimals: 18,
      name: 'XFT'
    },
    {
      address: addresses.ethereum.tokens.SUSHI,  // SUSHI
      decimals: 18,
      name: 'SUSHI'
    },
    {
      address: addresses.ethereum.tokens.MKR,  // MKR
      decimals: 18,
      name: 'MKR'
    },
    {
      address: addresses.ethereum.tokens.POOL,  // POOL
      decimals: 18,
      name: 'POOL'
    },
    {
      address: addresses.ethereum.tokens.xSUSHI,  // xSUSHI
      decimals: 18,
      name: 'xSUSHI'
    },
    {
      address: addresses.ethereum.tokens.VISR,  // VISR
      decimals: 18,
      name: 'VISR'
    },
    {
      address: addresses.ethereum.tokens.RULER,  // RULER
      decimals: 18,
      name: 'RULER'
    },
    {
      address: addresses.ethereum.tokens.Dentacoin,  // Dentacoin
      decimals: 0,
      name: 'Dentacoin'
    },
    {
      address: addresses.ethereum.tokens.ESD,  // ESD
      decimals: 18,
      name: 'ESD'
    },
    {
      address: addresses.ethereum.tokens.DAI,  // DAI
      decimals: 18,
      name: 'DAI'
    },
    {
      address: addresses.ethereum.tokens.OGN,  // OGN
      decimals: 18,
      name: 'OGN'
    },
    {
      address: addresses.ethereum.tokens.ICE,  // ICE
      decimals: 18,
      name: 'ICE'
    },
    {
      address: addresses.ethereum.tokens.LDO,  // LDO
      decimals: 18,
      name: 'LDO'
    },
    {
      address: addresses.ethereum.tokens.TSUKA,  // TSUKA
      decimals: 9,
      name: 'TSUKA'
    },
    {
      address: addresses.ethereum.tokens.SPELL,  // SPELL
      decimals: 18,
      name: 'SPELL'
    },
    {
      address: addresses.ethereum.tokens.OMG,  // OMG
      decimals: 18,
      name: 'OMG'
    },
    {
      address: addresses.ethereum.tokens.HEX,  // HEX
      decimals: 8,
      name: 'HEX'
    },
    {
      address: addresses.ethereum.tokens.LMT,  // LMT
      decimals: 18,
      name: 'LMT'
    },
    {
      address: addresses.ethereum.tokens.WDOGE,  // WDOGE
      decimals: 18,
      name: 'WDOGE'
    },
    {
      address: addresses.ethereum.tokens.stETH,  // stETH
      decimals: 18,
      name: 'stETH'
    },
    {
      address: addresses.ethereum.tokens.KLEE,  // KLEE
      decimals: 9,
      name: 'KLEE'
    },
    {
      address: addresses.ethereum.tokens.KP3R,  // KP3R
      decimals: 18,
      name: 'KP3R'
    },
    {
      address: addresses.ethereum.tokens.TYRANT,  // TYRANT
      decimals: 9,
      name: 'TYRANT'
    },
    {
      address: addresses.ethereum.tokens.UMA,  // UMA
      decimals: 18,
      name: 'UMA'
    },
    {
      address: addresses.ethereum.tokens.LPT,  // LPT
      decimals: 18,
      name: 'LPT'
    },
    {
      address: addresses.ethereum.tokens.SLP,  // SLP
      decimals: 0,
      name: 'SLP'
    },
    {
      address: addresses.ethereum.tokens.FUSE,  // FUSE
      decimals: 18,
      name: 'FUSE'
    },
    {
      address: addresses.ethereum.tokens.DGTX,  // DGTX
      decimals: 18,
      name: 'DGTX'
    },
    {
      address: addresses.ethereum.tokens.aETHc,  // aETHc
      decimals: 18,
      name: 'aETHc'
    },
    {
      address: addresses.ethereum.tokens.PLR,  // PLR
      decimals: 18,
      name: 'PLR'
    },
    {
      address: addresses.ethereum.tokens.RARI,  // RARI
      decimals: 18,
      name: 'RARI'
    },
    {
      address: addresses.ethereum.tokens.AXS,  // AXS
      decimals: 18,
      name: 'AXS'
    },
    {
      address: addresses.ethereum.tokens.AGLD,  // AGLD
      decimals: 18,
      name: 'AGLD'
    },
    {
      address: addresses.ethereum.tokens.FEI,  // FEI
      decimals: 18,
      name: 'FEI'
    },
    {
      address: addresses.ethereum.tokens.EXRN,  // EXRN
      decimals: 0,
      name: 'EXRN'
    },
    {
      address: addresses.ethereum.tokens.LINK,  // LINK
      decimals: 18,
      name: 'LINK'
    },
    {
      address: addresses.ethereum.tokens.DOUGH,  // DOUGH
      decimals: 18,
      name: 'DOUGH'
    },
    {
      address: addresses.ethereum.tokens.MANA,  // MANA
      decimals: 18,
      name: 'MANA'
    },
    {
      address: addresses.ethereum.tokens.KEY,  // KEY
      decimals: 18,
      name: 'KEY'
    },
    {
      address: addresses.ethereum.tokens.GLM,  // GLM
      decimals: 18,
      name: 'GLM'
    },
    {
      address: addresses.ethereum.tokens.FREE,  // FREE
      decimals: 18,
      name: 'FREE'
    },
    {
      address: addresses.ethereum.tokens.MATH,  // MATH
      decimals: 18,
      name: 'MATH'
    },
    {
      address: addresses.ethereum.tokens.HOP,  // HOP
      decimals: 18,
      name: 'HOP'
    },
    {
      address: addresses.ethereum.tokens.TORN,  // TORN
      decimals: 18,
      name: 'TORN'
    },
    {
      address: addresses.ethereum.tokens.YAM,  // YAM
      decimals: 18,
      name: 'YAM'
    }
];

const selectedTokensETH = [
    /*
    {
      address: addresses.ethereum.tokens.DAI,  // DAI
      decimals: 18,
      name: 'DAI'
    },
    {
      address: addresses.ethereum.tokens.WBTC,  // WBTC
      decimals: 8,
      name: 'WBTC'
    },
    {
      address: addresses.ethereum.tokens.COMP,  // COMP
      decimals: 18,
      name: 'COMP'
    },
    {
      address: addresses.ethereum.tokens.LINK,  // LINK
      decimals: 18,
      name: 'LINK'
    },
    {
      address: addresses.ethereum.tokens.RARI,  // RARI
      decimals: 18,
      name: 'RARI'
    },
    {
      address: addresses.ethereum.tokens.SNX,  // SNX
      decimals: 18,
      name: 'SNX'
    },
    {
      address: addresses.ethereum.tokens.YFI,  // YFI
      decimals: 18,
      name: 'YFI'
    },
    {
      address: addresses.ethereum.tokens.USDT,  // USDT
      decimals: 6,
      name: 'USDT'
    }
    {
      address: addresses.ethereum.tokens.USDC,  // USDC
      decimals: 6,
      name: 'USDC'
    }*/
    {
      address: addresses.ethereum.tokens.USDT ,  // USDT
      decimals: 6,
      name: 'USDT'
    }
];

// stablecoins https://cryptoslate.com/cryptos/stablecoin/
const stablecoinsETH = [
    {
      address: addresses.ethereum.tokens.USDT,  // USDT
      decimals: 6,
      name: 'USDT'
    },
    {
      address: addresses.ethereum.tokens.USDC,  // USDC
      decimals: 6,
      name: 'USDC'
    },
    {
      address: addresses.ethereum.tokens.BUSD,  // BUSD
      decimals: 18,
      name: 'BUSD'
    },
    {
      address: addresses.ethereum.tokens.DAI,  // DAI
      decimals: 18,
      name: 'DAI'
    },
    {
      address: addresses.ethereum.tokens.USDP,  // USDP
      decimals: 18,
      name: 'USDP'
    },
    {
      address: addresses.ethereum.tokens.TUSD,  // TUSD
      decimals: 18,
      name: 'TUSD'
    },
    {
      address: addresses.ethereum.tokens.USDD,  // USDD
      decimals: 18,
      name: 'USDD'
    },
    {
      address: addresses.ethereum.tokens.GUSD,  // GUSD
      decimals: 2,
      name: 'GUSD'
    },
    {
      address: addresses.ethereum.tokens.FEI,  // FEI
      decimals: 18,
      name: 'FEI'
    },
    {
      address: addresses.ethereum.tokens.USDN,  // USDN
      decimals: 18,
      name: 'USDN'
    },
    {
      address: addresses.ethereum.tokens.USTC,  // USTC
      decimals: 18,
      name: 'USTC'
    },
    {
      address: addresses.ethereum.tokens.JST,  // JST
      decimals: 18,
      name: 'JST'
    },
    /*{
      address: addresses.ethereum.tokens.FRAX,  // FRAX
      decimals: 18,
      name: 'FRAX'
    },*/
    {
      address: addresses.ethereum.tokens.XAUT,  // XAUT
      decimals: 6,
      name: 'XAUT'
    },
    {
      address: addresses.ethereum.tokens.LUSD,  // LUSD
      decimals: 18,
      name: 'LUSD'
    },
    {
      address: addresses.ethereum.tokens.EURS,  // EURS
      decimals: 2,
      name: 'EURS'
    },
    {
      address: addresses.ethereum.tokens.USDX,  // USDX
      decimals: 18,
      name: 'USDX'
    },
    {
      address: addresses.ethereum.tokens.XSGD,  // XSGD
      decimals: 6,
      name: 'XSGD'
    },
    {
      address: addresses.ethereum.tokens.OUSD,  // OUSD
      decimals: 18,
      name: 'OUSD'
    },
    {
      address: addresses.ethereum.tokens.SUSD,  // SUSD
      decimals: 18,
      name: 'SUSD'
    },
    {
      address: addresses.ethereum.tokens.CUSD,  // CUSD
      decimals: 18,
      name: 'CUSD'
    },
    {
      address: addresses.ethereum.tokens.MUSD,  // MUSD
      decimals: 18,
      name: 'MUSD'
    },
    {
      address: addresses.ethereum.tokens.HUSD,  // HUSD
      decimals: 8,
      name: 'HUSD'
    },
    {
      address: addresses.ethereum.tokens.USDK,  // USDK
      decimals: 18,
      name: 'USDK'
    },
    {
      address: addresses.ethereum.tokens.RSV,  // RSV
      decimals: 18,
      name: 'RSV'
    },
    {
      address: addresses.ethereum.tokens.CEUR,  // CEUR
      decimals: 18,
      name: 'CEUR'
    },
    {
      address: addresses.ethereum.tokens.GYEN,  // GYEN
      decimals: 6,
      name: 'GYEN'
    },
    {
      address: addresses.ethereum.tokens.KRT,  // KRT
      decimals: 18,
      name: 'KRT'
    },
    {
      address: addresses.ethereum.tokens.IDRT,  // IDRT
      decimals: 2,
      name: 'IDRT'
    },
    {
      address: addresses.ethereum.tokens.STAKE,  // STAKE
      decimals: 18,
      name: 'STAKE'
    },
    {
      address: addresses.ethereum.tokens.BITCNY,  // BITCNY
      decimals: 4,
      name: 'BITCNY'
    },
    {
      address: addresses.ethereum.tokens.XCHF,  // XCHF
      decimals: 18,
      name: 'XCHF'
    },
    {
      address: addresses.ethereum.tokens.UNB,  // UNB
      decimals: 18,
      name: 'UNB'
    },
    {
      address: addresses.ethereum.tokens.USDS,  // USDS
      decimals: 6,
      name: 'USDS'
    },
    {
      address: addresses.ethereum.tokens.DFD,  // DFD
      decimals: 18,
      name: 'DFD'
    },
    {
      address: addresses.ethereum.tokens.BRZ,  // BRZ
      decimals: 4,
      name: 'BRZ'
    },
    {
      address: addresses.ethereum.tokens.FPI,  // FPI
      decimals: 18,
      name: 'FPI'
    },
    {
      address: addresses.ethereum.tokens.MIM,  // MIM
      decimals: 18,
      name: 'MIM'
    },
    {
      address: addresses.ethereum.tokens.ALUSD,  // ALUSD
      decimals: 18,
      name: 'ALUSD'
    },
    {
      address: addresses.ethereum.tokens.ibEUR,  // ibEUR
      decimals: 18,
      name: 'ibEUR'
    },
    {
      address: addresses.ethereum.tokens.EURT,  // EURT
      decimals: 6,
      name: 'EURT'
    },
    {
      address: addresses.ethereum.tokens.BEAN,  // BEAN
      decimals: 6,
      name: 'BEAN'
    },
    {
      address: addresses.ethereum.tokens.FLEXUSD,  // FLEXUSD
      decimals: 18,
      name: 'FLEXUSD'
    },
    {
      address: addresses.ethereum.tokens.EUROC,  // EUROC
      decimals: 6,
      name: 'EUROC'
    },
    {
      address: addresses.ethereum.tokens.AGEUR,  // AGEUR
      decimals: 18,
      name: 'AGEUR'
    },
    {
      address: addresses.ethereum.tokens.DOLA,  // DOLA
      decimals: 18,
      name: 'DOLA'
    },
    {
      address: addresses.ethereum.tokens.RAI,  // RAI
      decimals: 18,
      name: 'RAI'
    },
    {
      address: addresses.ethereum.tokens.USX,  // USX
      decimals: 18,
      name: 'USX'
    },
    {
      address: addresses.ethereum.tokens.HOME,  // HOME
      decimals: 18,
      name: 'HOME'
    },
    {
      address: addresses.ethereum.tokens.SEUR,  // SEUR
      decimals: 18,
      name: 'SEUR'
    },
    {
      address: addresses.ethereum.tokens.PAR,  // PAR
      decimals: 18,
      name: 'PAR'
    },
    {
      address: addresses.ethereum.tokens.PUSD,  // PUSD
      decimals: 18,
      name: 'PUSD'
    },
    {
      address: addresses.ethereum.tokens.XAI,  // XAI
      decimals: 18,
      name: 'XAI'
    },
    {
      address: addresses.ethereum.tokens.VOLT,  // VOLT
      decimals: 9,
      name: 'VOLT'
    },
    {
      address: addresses.ethereum.tokens.ZUSD,  // ZUSD
      decimals: 6,
      name: 'ZUSD'
    },
    {
      address: addresses.ethereum.tokens.FLOAT,  // FLOAT
      decimals: 18,
      name: 'FLOAT'
    },
    {
      address: addresses.ethereum.tokens.FIAT,  // FIAT
      decimals: 18,
      name: 'FIAT'
    },
    {
      address: addresses.ethereum.tokens.BOB,  // BOB
      decimals: 18,
      name: 'BOB'
    },
    {
      address: addresses.ethereum.tokens.UZD,  // UZD
      decimals: 18,
      name: 'UZD'
    }
];

// Ethereum on-chain tokens data - place additional tokens into this list
//ONGOING add additional new ones
//URL https://etherscan.io/tokens?p=19
const tokensETH = [
    {
      address: addresses.ethereum.tokens.BRZ,  // BRZ
      decimals: 4,
      name: 'BRZ'
    },
    {
      address: addresses.ethereum.tokens.DFD,  // DFD
      decimals: 18,
      name: 'DFD'
    },
    {
      address: addresses.ethereum.tokens.USDS,  // USDS
      decimals: 6,
      name: 'USDS'
    },
    {
      address: addresses.ethereum.tokens.UNB,  // UNB
      decimals: 18,
      name: 'UNB'
    },
    {
      address: addresses.ethereum.tokens.XCHF,  // XCHF
      decimals: 18,
      name: 'XCHF'
    },
    {
      address: addresses.ethereum.tokens.BITCNY,  // BITCNY
      decimals: 4,
      name: 'BITCNY'
    },
    {
      address: addresses.ethereum.tokens.KRT,  // KRT
      decimals: 18,
      name: 'KRT'
    },
    {
      address: addresses.ethereum.tokens.GYEN,  // GYEN
      decimals: 6,
      name: 'GYEN'
    },
    {
      address: addresses.ethereum.tokens.USDX,  // USDX
      decimals: 18,
      name: 'USDX'
    },
    {
      address: addresses.ethereum.tokens.LUSD,  // LUSD
      decimals: 18,
      name: 'LUSD'
    },
    {
      address: addresses.ethereum.tokens.JST,  // JST
      decimals: 18,
      name: 'JST'
    },
    {
      address: addresses.ethereum.tokens.USTC,  // USTC
      decimals: 18,
      name: 'USTC'
    },
    {
      address: addresses.ethereum.tokens.USDN,  // USDN
      decimals: 18,
      name: 'USDN'
    },
    {
      address: addresses.ethereum.tokens.RUNE,  // RUNE
      decimals: 18,
      name: 'RUNE'
    },
    {
      address: addresses.ethereum.tokens.MANA,  // MANA
      decimals: 18,
      name: 'MANA'
    },
    {
      address: addresses.ethereum.tokens.AXS,  // AXS
      decimals: 18,
      name: 'AXS'
    },
    {
      address: addresses.ethereum.tokens.WZEC,  // WZEC
      decimals: 18,
      name: 'WZEC'
    },
    {
      address: addresses.ethereum.tokens.WXTZ,  // WXTZ
      decimals: 18,
      name: 'WXTZ'
    },
    {
      address: addresses.ethereum.tokens.EGLD,  // EGLD
      decimals: 18,
      name: 'EGLD'
    },
    {
      address: addresses.ethereum.tokens.LUNC,  // LUNC
      decimals: 18,
      name: 'LUNC'
    },
    {
      address: addresses.ethereum.tokens.EOS,  // EOS
      decimals: 18,
      name: 'EOS'
    },
    {
      address: addresses.ethereum.tokens.CRO,  // CRO
      decimals: 8,
      name: 'CRO'
    },
    {
      address: addresses.ethereum.tokens.WXMR,  // WXMR
      decimals: 18,
      name: 'WXMR'
    },
    {
      address: addresses.ethereum.tokens.WAVAX,  // WAVAX
      decimals: 18,
      name: 'WAVAX'
    },
    {
      address: addresses.ethereum.tokens.SOL,  // SOL
      decimals: 9,
      name: 'SOL'
    },
    {
      address: addresses.ethereum.tokens.WLTC,  // WLTC
      decimals: 18,
      name: 'WLTC'
    },
    {
      address: addresses.ethereum.tokens.BDOT,  // BDOT
      decimals: 10,
      name: 'BDOT'
    },
    {
      address: addresses.ethereum.tokens.TRX,  // TRX
      decimals: 6,
      name: 'TRX'
    },
    {
      address: addresses.ethereum.tokens.WDOGE,  // WDOGE
      decimals: 18,
      name: 'WDOGE'
    },
    {
      address: addresses.ethereum.tokens.WXRP,  // WXRP
      decimals: 18,
      name: 'WXRP'
    },
    {
      address: addresses.ethereum.tokens.DAI,  // DAI
      decimals: 18,
      name: 'DAI'
    },
    {
      address: addresses.ethereum.tokens.ONEINCH,    // 1INCH
      decimals: 18,
      name: 'ONEINCH'
    },
    {
      address: addresses.ethereum.tokens.SAI,    // SAI
      decimals: 18,
      name: 'SAI'
    },
    {
      address: addresses.ethereum.tokens.USDC,  // USDC
      decimals: 6,
      name: 'USDC'
    },
    {
      address: addresses.ethereum.tokens.WBTC,  // WBTC
      decimals: 8,
      name: 'WBTC'
    },
    {
      address: addresses.ethereum.tokens.AAVE,  // AAVE
      decimals: 18,
      name: 'AAVE'
    },
    {
      address: addresses.ethereum.tokens.C98,  // C98
      decimals: 18,
      name: 'C98'
    },
    {
      address: addresses.ethereum.tokens.MATIC,  // MATIC
      decimals: 18,
      name: 'MATIC'
    },
    {
      address: addresses.ethereum.tokens.YFI,  // YFI
      decimals: 18,
      name: 'YFI'
    },
    {
      address: addresses.ethereum.tokens.LINK,  // LINK
      decimals: 18,
      name: 'LINK'
    },
    {
      address: addresses.ethereum.tokens.OMG,  // OMG
      decimals: 18,
      name: 'OMG'
    },
    {
      address: addresses.ethereum.tokens.USDT,  // USDT
      decimals: 6,
      name: 'USDT'
    },
    {
      address: addresses.ethereum.tokens.BNB,  // BNB
      decimals: 18,
      name: 'BNB'
    },
    {
      address: addresses.ethereum.tokens.BUSD,  // BUSD
      decimals: 18,
      name: 'BUSD'
    },
    /*{
      address: addresses.ethereum.tokens.FRAX,  // FRAX
      decimals: 18,
      name: 'FRAX'
    },*/
    {
      address: addresses.ethereum.tokens.VEN,  // VEN
      decimals: 18,
      name: 'VEN'
    },
    {
      address: addresses.ethereum.tokens.LDO,  // LDO
      decimals: 18,
      name: 'LDO'
    },
    {
      address: addresses.ethereum.tokens.NEXO,  // NEXO
      decimals: 18,
      name: 'NEXO'
    },
    {
      address: addresses.ethereum.tokens.ENJ,  // ENJ
      decimals: 18,
      name: 'ENJ'
    },
    {
      address: addresses.ethereum.tokens.BAND,  // BAND
      decimals: 18,
      name: 'BAND'
    },
    {
      address: addresses.ethereum.tokens.CHSB,  // CHSB
      decimals: 8,
      name: 'CHSB'
    },
    {
      address: addresses.ethereum.tokens.stETH,  // stETH
      decimals: 18,
      name: 'stETH'
    },
    {
      address: addresses.ethereum.tokens.SHIB,  // SHIB
      decimals: 18,
      name: 'SHIB'
    },
    {
      address: addresses.ethereum.tokens.OKB,  // OKB
      decimals: 18,
      name: 'OKB'
    },
    {
      address: addresses.ethereum.tokens.HEX,  // HEX
      decimals: 8,
      name: 'HEX'
    },
    {
      address: addresses.ethereum.tokens.UNI,  // UNI
      decimals: 18,
      name: 'UNI'
    },
    {
      address: addresses.ethereum.tokens.LEO,  // LEO
      decimals: 18,
      name: 'LEO'
    },
    {
      address: addresses.ethereum.tokens.QNT,  // QNT
      decimals: 18,
      name: 'QNT'
    },
    {
      address: addresses.ethereum.tokens.APE,  // APE
      decimals: 18,
      name: 'APE'
    },
    {
      address: addresses.ethereum.tokens.NEAR,  // NEAR
      decimals: 24,
      name: 'NEAR'
    },
    {
      address: addresses.ethereum.tokens.VEN,  // VEN
      decimals: 18,
      name: 'VEN'
    },
    {
      address: addresses.ethereum.tokens.SAND,  // SAND
      decimals: 18,
      name: 'SAND'
    },
    {
      address: addresses.ethereum.tokens.HT,  // HT
      decimals: 18,
      name: 'HT'
    },
    {
      address: addresses.ethereum.tokens.LDO,  // LDO
      decimals: 18,
      name: 'LDO'
    },
    {
      address: addresses.ethereum.tokens.CHZ,  // CHZ
      decimals: 18,
      name: 'CHZ'
    },
    {
      address: addresses.ethereum.tokens.XCN,  // XCN
      decimals: 18,
      name: 'XCN'
    },
    {
      address: addresses.ethereum.tokens.USDP,  // USDP
      decimals: 18,
      name: 'USDP'
    },
    {
      address: addresses.ethereum.tokens.TUSD,  // TUSD
      decimals: 18,
      name: 'TUSD'
    },
    {
      address: addresses.ethereum.tokens.wMANA,  // wMANA
      decimals: 18,
      name: 'wMANA'
    },
    {
      address: addresses.ethereum.tokens.USDD,  // USDD
      decimals: 18,
      name: 'USDD'
    },
    {
      address: addresses.ethereum.tokens.KCS,  // KCS
      decimals: 6,
      name: 'KCS'
    },
    {
      address: addresses.ethereum.tokens.BTT,  // BTT
      decimals: 18,
      name: 'BTT'
    },
    {
      address: addresses.ethereum.tokens.FTM,  // FTM
      decimals: 18,
      name: 'FTM'
    },
    {
      address: addresses.ethereum.tokens.GUSD,  // GUSD
      decimals: 2,
      name: 'GUSD'
    },
    {
      address: addresses.ethereum.tokens.MKR,  // MKR
      decimals: 18,
      name: 'MKR'
    },
    {
      address: addresses.ethereum.tokens.GRT,  // GRT
      decimals: 18,
      name: 'GRT'
    },
    {
      address: addresses.ethereum.tokens.PAXG,  // PAXG
      decimals: 18,
      name: 'PAXG'
    },
    {
      address: addresses.ethereum.tokens.SNX,  // SNX
      decimals: 18,
      name: 'SNX'
    },
    {
      address: addresses.ethereum.tokens.FXS,  // FXS
      decimals: 18,
      name: 'FXS'
    },
    {
      address: addresses.ethereum.tokens.XAUT,  // XAUT
      decimals: 6,
      name: 'XAUT'
    },
    {
      address: addresses.ethereum.tokens.NEXO,  // NEXO
      decimals: 18,
      name: 'NEXO'
    },
    {
      address: addresses.ethereum.tokens.RPL,  // RPL
      decimals: 18,
      name: 'RPL'
    },
    {
      address: addresses.ethereum.tokens.BAT,  // BAT
      decimals: 18,
      name: 'BAT'
    },
    {
      address: addresses.ethereum.tokens.BIT,  // BIT
      decimals: 18,
      name: 'BIT'
    },
    {
      address: addresses.ethereum.tokens.LRC,  // LRC
      decimals: 18,
      name: 'LRC'
    },
    {
      address: addresses.ethereum.tokens.ENJ,  // ENJ
      decimals: 18,
      name: 'ENJ'
    },
    {
      address: addresses.ethereum.tokens.ZIL,  // ZIL
      decimals: 12,
      name: 'ZIL'
    },
    {
      address: addresses.ethereum.tokens.DFI,  // DFI
      decimals: 8,
      name: 'DFI'
    },
    {
      address: addresses.ethereum.tokens.HOT,  // HOT
      decimals: 18,
      name: 'HOT'
    },
    {
      address: addresses.ethereum.tokens.XDCE,  // XDCE
      decimals: 18,
      name: 'XDCE'
    },
    {
      address: addresses.ethereum.tokens.wCELO,  // wCELO
      decimals: 18,
      name: 'wCELO'
    },
    {
      address: addresses.ethereum.tokens.ENS,  // ENS
      decimals: 18,
      name: 'ENS'
    },
    {
      address: addresses.ethereum.tokens.NXM,  // NXM
      decimals: 18,
      name: 'NXM'
    },
    {
      address: addresses.ethereum.tokens.CEL,  // CEL
      decimals: 4,
      name: 'CEL'
    },
    {
      address: addresses.ethereum.tokens.COMP,  // COMP
      decimals: 18,
      name: 'COMP'
    },
    {
      address: addresses.ethereum.tokens.OHM,  // OHM
      decimals: 9,
      name: 'OHM'
    },
    {
      address: addresses.ethereum.tokens.MCO,  // MCO
      decimals: 8,
      name: 'MCO'
    },
    {
      address: addresses.ethereum.tokens.BAND,  // BAND
      decimals: 18,
      name: 'BAND'
    },
    {
      address: addresses.ethereum.tokens.GMT,  // GMT
      decimals: 8,
      name: 'GMT'
    },
    {
      address: addresses.ethereum.tokens.WQTUM,  // WQTUM
      decimals: 18,
      name: 'WQTUM'
    },
    {
      address: addresses.ethereum.tokens.GNO,  // GNO
      decimals: 18,
      name: 'GNO'
    },
    {
      address: addresses.ethereum.tokens.GLM,  // GLM
      decimals: 18,
      name: 'GLM'
    },
    {
      address: addresses.ethereum.tokens.SUSHI,  // SUSHI
      decimals: 18,
      name: 'SUSHI'
    },
    {
      address: addresses.ethereum.tokens.DYDX,  // DYDX
      decimals: 18,
      name: 'DYDX'
    },
    {
      address: addresses.ethereum.tokens.CHSB,  // CHSB
      decimals: 8,
      name: 'CHSB'
    },
    {
      address: addresses.ethereum.tokens.MASK,  // MASK
      decimals: 18,
      name: 'MASK'
    },
    {
      address: addresses.ethereum.tokens.BAL,  // BAL
      decimals: 18,
      name: 'BAL'
    },
    {
      address: addresses.ethereum.tokens.IOTX,  // IOTX
      decimals: 18,
      name: 'IOTX'
    },
    {
      address: addresses.ethereum.tokens.rETH,  // rETH
      decimals: 18,
      name: 'rETH'
    },
    {
      address: addresses.ethereum.tokens.HBTC,  // HBTC
      decimals: 18,
      name: 'HBTC'
    },
    {
      address: addresses.ethereum.tokens.EURT,  // EURT
      decimals: 6,
      name: 'EURT'
    },
    {
      address: addresses.ethereum.tokens.AMP,  // AMP
      decimals: 18,
      name: 'AMP'
    },
    {
      address: addresses.ethereum.tokens.GALA,  // GALA
      decimals: 8,
      name: 'GALA'
    },
    {
      address: addresses.ethereum.tokens.POLY,  // POLY
      decimals: 18,
      name: 'POLY'
    },
    {
      address: addresses.ethereum.tokens.LPT,  // LPT
      decimals: 18,
      name: 'LPT'
    },
    {
      address: addresses.ethereum.tokens.TEL,  // TEL
      decimals: 2,
      name: 'TEL'
    },
    {
      address: addresses.ethereum.tokens.ELON,  // ELON
      decimals: 18,
      name: 'ELON'
    },
    {
      address: addresses.ethereum.tokens.ONE,  // ONE
      decimals: 18,
      name: 'ONE'
    },
    {
      address: addresses.ethereum.tokens.RSR,  // RSR
      decimals: 18,
      name: 'RSR'
    },
    {
      address: addresses.ethereum.tokens.KUB,  // KUB
      decimals: 18,
      name: 'KUB'
    },
    {
      address: addresses.ethereum.tokens.ZRX,  // ZRX
      decimals: 18,
      name: 'ZRX'
    },
    {
      address: addresses.ethereum.tokens.IOST,  // IOST
      decimals: 18,
      name: 'IOST'
    },
    {
      address: addresses.ethereum.tokens.RNDR,  // RNDR
      decimals: 18,
      name: 'RNDR'
    },
    {
      address: addresses.ethereum.tokens.WOO,  // WOO
      decimals: 18,
      name: 'WOO'
    },
    {
      address: addresses.ethereum.tokens.CET,  // CET
      decimals: 18,
      name: 'CET'
    },
    {
      address: addresses.ethereum.tokens.RBN,  // RBN
      decimals: 18,
      name: 'RBN'
    },
    {
      address: addresses.ethereum.tokens.WAX,  // WAX
      decimals: 8,
      name: 'WAX'
    },
    {
      address: addresses.ethereum.tokens.INJ,  // INJ
      decimals: 18,
      name: 'INJ'
    },
    {
      address: addresses.ethereum.tokens.NFT,  // NFT
      decimals: 6,
      name: 'NFT'
    },
    {
      address: addresses.ethereum.tokens.EURS,  // EURS
      decimals: 2,
      name: 'EURS'
    },
    {
      address: addresses.ethereum.tokens.SXP,  // SXP
      decimals: 18,
      name: 'SXP'
    },
    {
      address: addresses.ethereum.tokens.UMA,  // UMA
      decimals: 18,
      name: 'UMA'
    },
    {
      address: addresses.ethereum.tokens.ZEON,  // ZEON
      decimals: 18,
      name: 'ZEON'
    },
    {
      address: addresses.ethereum.tokens.EWTB,  // EWTB
      decimals: 18,
      name: 'EWTB'
    },
    {
      address: addresses.ethereum.tokens.SYN,  // SYN
      decimals: 18,
      name: 'SYN'
    },
    {
      address: addresses.ethereum.tokens.VERI,  // VERI
      decimals: 18,
      name: 'VERI'
    },
    {
      address: addresses.ethereum.tokens.TRIBE,  // TRIBE
      decimals: 18,
      name: 'TRIBE'
    },
    {
      address: addresses.ethereum.tokens.SKL,  // SKL
      decimals: 18,
      name: 'SKL'
    },
    {
      address: addresses.ethereum.tokens.PUNDIX,  // PUNDIX
      decimals: 18,
      name: 'PUNDIX'
    },
    {
      address: addresses.ethereum.tokens.VVS,  // VVS
      decimals: 18,
      name: 'VVS'
    },
    {
      address: addresses.ethereum.tokens.SLP,  // SLP
      decimals: 0,
      name: 'SLP'
    },
    {
      address: addresses.ethereum.tokens.FX,  // FX
      decimals: 18,
      name: 'FX'
    },
    {
      address: addresses.ethereum.tokens.PLTC,  // PLTC
      decimals: 18,
      name: 'PLTC'
    },
    {
      address: addresses.ethereum.tokens.SNT,  // SNT
      decimals: 18,
      name: 'SNT'
    },
    {
      address: addresses.ethereum.tokens.ANT,  // ANT
      decimals: 18,
      name: 'ANT'
    },
    {
      address: addresses.ethereum.tokens.NMR,  // NMR
      decimals: 18,
      name: 'NMR'
    },
    {
      address: addresses.ethereum.tokens.FLOKI,  // FLOKI
      decimals: 9,
      name: 'FLOKI'
    },
    {
      address: addresses.ethereum.tokens.MVL,  // MVL
      decimals: 18,
      name: 'MVL'
    },
    {
      address: addresses.ethereum.tokens.PROM,  // PROM
      decimals: 18,
      name: 'PROM'
    },
    {
      address: addresses.ethereum.tokens.MXC,  // MXC
      decimals: 18,
      name: 'MXC'
    },
    {
      address: addresses.ethereum.tokens.HFT,  // HFT
      decimals: 18,
      name: 'HFT'
    },
    {
      address: addresses.ethereum.tokens.ILV,  // ILV
      decimals: 18,
      name: 'ILV'
    },
    {
      address: addresses.ethereum.tokens.MEDX,  // MEDX
      decimals: 8,
      name: 'MEDX'
    },
    {
      address: addresses.ethereum.tokens.MIM,  // MIM
      decimals: 18,
      name: 'MIM'
    },
    {
      address: addresses.ethereum.tokens.SRM,  // SRM
      decimals: 6,
      name: 'SRM'
    },
    {
      address: addresses.ethereum.tokens.RLC,  // RLC
      decimals: 9,
      name: 'RLC'
    },
    {
      address: addresses.ethereum.tokens.IQ,  // IQ
      decimals: 18,
      name: 'IQ'
    },
    {
      address: addresses.ethereum.tokens.ALICE,  // ALICE
      decimals: 6,
      name: 'ALICE'
    },
    {
      address: addresses.ethereum.tokens.ANY,  // ANY
      decimals: 18,
      name: 'ANY'
    },
    {
      address: addresses.ethereum.tokens.xSUSHI,  // xSUSHI
      decimals: 18,
      name: 'xSUSHI'
    },
    {
      address: addresses.ethereum.tokens.CEEK,  // CEEK
      decimals: 18,
      name: 'CEEK'
    },
    {
      address: addresses.ethereum.tokens.VOLT,  // VOLT
      decimals: 9,
      name: 'VOLT'
    },
    {
      address: addresses.ethereum.tokens.FET,  // FET
      decimals: 18,
      name: 'FET'
    },
    {
      address: addresses.ethereum.tokens.ORBS,  // ORBS
      decimals: 18,
      name: 'ORBS'
    },
    {
      address: addresses.ethereum.tokens.TRAC,  // TRAC
      decimals: 18,
      name: 'TRAC'
    },
    {
      address: addresses.ethereum.tokens.REQ,  // REQ
      decimals: 18,
      name: 'REQ'
    },
    {
      address: addresses.ethereum.tokens.CELR,  // CELR
      decimals: 18,
      name: 'CELR'
    },
    {
      address: addresses.ethereum.tokens.FUN,  // FUN
      decimals: 8,
      name: 'FUN'
    },
    {
      address: addresses.ethereum.tokens.CHR,  // CHR
      decimals: 6,
      name: 'CHR'
    },
    {
      address: addresses.ethereum.tokens.BFC,  // BFC
      decimals: 18,
      name: 'BFC'
    },
    {
      address: addresses.ethereum.tokens.TSUKA,  // TSUKA
      decimals: 9,
      name: 'TSUKA'
    },
    {
      address: addresses.ethereum.tokens.ALPHA,  // ALPHA
      decimals: 18,
      name: 'ALPHA'
    },
    {
      address: addresses.ethereum.tokens.SPELL,  // SPELL
      decimals: 18,
      name: 'SPELL'
    },
    {
      address: addresses.ethereum.tokens.OCEAN,  // OCEAN
      decimals: 18,
      name: 'OCEAN'
    },
    {
      address: addresses.ethereum.tokens.DENT,  // DENT
      decimals: 8,
      name: 'DENT'
    },
    {
      address: addresses.ethereum.tokens.aETHc,  // aETHc
      decimals: 18,
      name: 'aETHc'
    },
    {
      address: addresses.ethereum.tokens.CDT,  // CDT
      decimals: 18,
      name: 'CDT'
    },
    {
      address: addresses.ethereum.tokens.POWR,  // POWR
      decimals: 6,
      name: 'POWR'
    },
    {
      address: addresses.ethereum.tokens.BNT,  // BNT
      decimals: 18,
      name: 'BNT'
    },
    {
      address: addresses.ethereum.tokens.MFT,  // MFT
      decimals: 18,
      name: 'MFT'
    },
    {
      address: addresses.ethereum.tokens.BOBA,  // BOBA
      decimals: 18,
      name: 'BOBA'
    },
    {
      address: addresses.ethereum.tokens.AGIX,  // AGIX
      decimals: 8,
      name: 'AGIX'
    },
    {
      address: addresses.ethereum.tokens.ELF,  // ELF
      decimals: 18,
      name: 'ELF'
    },
    {
      address: addresses.ethereum.tokens.REPv2,  // REPv2
      decimals: 18,
      name: 'REPv2'
    },
    {
      address: addresses.ethereum.tokens.QKC,  // QKC
      decimals: 18,
      name: 'QKC'
    },
    {
      address: addresses.ethereum.tokens.STMX,  // STMX
      decimals: 18,
      name: 'STMX'
    },
    {
      address: addresses.ethereum.tokens.STG,  // STG
      decimals: 18,
      name: 'STG'
    },
    {
      address: addresses.ethereum.tokens.UQC,  // UQC
      decimals: 18,
      name: 'UQC'
    },
    {
      address: addresses.ethereum.tokens.REV,  // REV
      decimals: 6,
      name: 'REV'
    },
    {
      address: addresses.ethereum.tokens.NKN,  // NKN
      decimals: 18,
      name: 'NKN'
    },
    {
      address: addresses.ethereum.tokens.OGN,  // OGN
      decimals: 18,
      name: 'OGN'
    },
    {
      address: addresses.ethereum.tokens.XYO,  // XYO
      decimals: 18,
      name: 'XYO'
    },
    {
      address: addresses.ethereum.tokens.STPT,  // STPT
      decimals: 18,
      name: 'STPT'
    },
    {
      address: addresses.ethereum.tokens.BTMX,  // BTMX
      decimals: 18,
      name: 'BTMX'
    },
    {
      address: addresses.ethereum.tokens.OUSD,  // OUSD
      decimals: 18,
      name: 'OUSD'
    },
    {
      address: addresses.ethereum.tokens.KEEP,  // KEEP
      decimals: 18,
      name: 'KEEP'
    },
    {
      address: addresses.ethereum.tokens.DODO,  // DODO
      decimals: 18,
      name: 'DODO'
    },
    {
      address: addresses.ethereum.tokens.AUTO,  // AUTO
      decimals: 18,
      name: 'AUTO'
    },
    {
      address: addresses.ethereum.tokens.BETA,  // BETA
      decimals: 18,
      name: 'BETA'
    },
    {
      address: addresses.ethereum.tokens.SUSD,  // SUSD
      decimals: 18,
      name: 'SUSD'
    },
    {
      address: addresses.ethereum.tokens.MTL,  // MTL
      decimals: 8,
      name: 'MTL'
    },
    {
      address: addresses.ethereum.tokens.XSGD,  // XSGD
      decimals: 6,
      name: 'XSGD'
    },
    {
      address: addresses.ethereum.tokens.OXT,  // OXT
      decimals: 18,
      name: 'OXT'
    },
    {
      address: addresses.ethereum.tokens.ibEUR,  // ibEUR
      decimals: 18,
      name: 'ibEUR'
    },
    {
      address: addresses.ethereum.tokens.DAWN,  // DAWN
      decimals: 18,
      name: 'DAWN'
    },
    {
      address: addresses.ethereum.tokens.AERGO,  // AERGO
      decimals: 18,
      name: 'AERGO'
    },
    {
      address: addresses.ethereum.tokens.STORJ,  // STORJ
      decimals: 8,
      name: 'STORJ'
    },
    {
      address: addresses.ethereum.tokens.ADS,  // ADS
      decimals: 11,
      name: 'ADS'
    },
    {
      address: addresses.ethereum.tokens.ACH,  // ACH
      decimals: 8,
      name: 'ACH'
    },
    {
      address: addresses.ethereum.tokens.FEI,  // FEI
      decimals: 18,
      name: 'FEI'
    },
    {
      address: addresses.ethereum.tokens.CUSD,  // CUSD
      decimals: 18,
      name: 'CUSD'
    },
    {
      address: addresses.ethereum.tokens.wCUSD,  // wCUSD
      decimals: 18,
      name: 'wCUSD'
    },
    {
      address: addresses.ethereum.tokens.POND,  // POND
      decimals: 18,
      name: 'POND'
    },
    {
      address: addresses.ethereum.tokens.USDK,  // USDK
      decimals: 18,
      name: 'USDK'
    },
    {
      address: addresses.ethereum.tokens.BOND,  // BOND
      decimals: 18,
      name: 'BOND'
    },
    {
      address: addresses.ethereum.tokens.CQT,  // CQT
      decimals: 18,
      name: 'CQT'
    },
    {
      address: addresses.ethereum.tokens.DUSK,  // DUSK
      decimals: 18,
      name: 'DUSK'
    },
    {
      address: addresses.ethereum.tokens.AURORA,  // AURORA
      decimals: 18,
      name: 'AURORA'
    },
    {
      address: addresses.ethereum.tokens.XMON,  // XMON
      decimals: 18,
      name: 'XMON'
    },
    {
      address: addresses.ethereum.tokens.ATA,  // ATA
      decimals: 18,
      name: 'ATA'
    },
    {
      address: addresses.ethereum.tokens.TRU,  // TRU
      decimals: 8,
      name: 'TRU'
    },
    {
      address: addresses.ethereum.tokens.BTRFLY,  // BTRFLY
      decimals: 9,
      name: 'BTRFLY'
    },
    {
      address: addresses.ethereum.tokens.KP3R,  // KP3R
      decimals: 18,
      name: 'KP3R'
    },
    {
      address: addresses.ethereum.tokens.AURA,  // AURA
      decimals: 18,
      name: 'AURA'
    },
    {
      address: addresses.ethereum.tokens.TRB,  // TRB
      decimals: 18,
      name: 'TRB'
    },
    {
      address: addresses.ethereum.tokens.wNXM,  // wNXM
      decimals: 18,
      name: 'wNXM'
    },
    {
      address: addresses.ethereum.tokens.FORTH,  // FORTH
      decimals: 18,
      name: 'FORTH'
    },
    {
      address: addresses.ethereum.tokens.BEAN3CRVf,  // BEAN3CRVf
      decimals: 18,
      name: 'BEAN3CRVf'
    },
    {
      address: addresses.ethereum.tokens.urBEAN,  // urBEAN
      decimals: 6,
      name: 'urBEAN'
    },
    {
      address: addresses.ethereum.tokens.urBEAN3CRV,  // urBEAN3CRV
      decimals: 6,
      name: 'urBEAN3CRV'
    },
    {
      address: addresses.ethereum.tokens.LIT,  // LIT
      decimals: 18,
      name: 'LIT'
    },
    {
      address: addresses.ethereum.tokens.CTXC,  // CTXC
      decimals: 18,
      name: 'CTXC'
    },
    {
      address: addresses.ethereum.tokens.BOX,  // BOX
      decimals: 18,
      name: 'BOX'
    },
    {
      address: addresses.ethereum.tokens.CXO,  // CXO
      decimals: 18,
      name: 'CXO'
    },
    {
      address: addresses.ethereum.tokens.MLN,  // MLN
      decimals: 18,
      name: 'MLN'
    },
    {
      address: addresses.ethereum.tokens.HUSD,  // HUSD
      decimals: 8,
      name: 'HUSD'
    },
    {
      address: addresses.ethereum.tokens.DIA,  // DIA
      decimals: 18,
      name: 'DIA'
    },
    {
      address: addresses.ethereum.tokens.CRE,  // CRE
      decimals: 18,
      name: 'CRE'
    },
    {
      address: addresses.ethereum.tokens.LCX,  // LCX
      decimals: 18,
      name: 'LCX'
    },
    {
      address: addresses.ethereum.tokens.CLV,  // CLV
      decimals: 18,
      name: 'CLV'
    },
    {
      address: addresses.ethereum.tokens.RSV,  // RSV
      decimals: 18,
      name: 'RSV'
    },
    {
      address: addresses.ethereum.tokens.XPR,  // XPR
      decimals: 4,
      name: 'XPR'
    },
    {
      address: addresses.ethereum.tokens.CEUR,  // CEUR
      decimals: 18,
      name: 'CEUR'
    },
    {
      address: addresses.ethereum.tokens.AIOZ,  // AIOZ
      decimals: 18,
      name: 'AIOZ'
    },
    {
      address: addresses.ethereum.tokens.NULS,  // NULS
      decimals: 8,
      name: 'NULS'
    },
    {
      address: addresses.ethereum.tokens.MOC,  // MOC
      decimals: 18,
      name: 'MOC'
    },
    {
      address: addresses.ethereum.tokens.RFR,  // RFR
      decimals: 4,
      name: 'RFR'
    },
    {
      address: addresses.ethereum.tokens.GTC,  // GTC
      decimals: 18,
      name: 'GTC'
    },
    {
      address: addresses.ethereum.tokens.BZRX,  // BZRX
      decimals: 18,
      name: 'BZRX'
    },
    {
      address: addresses.ethereum.tokens.RARI,  // RARI
      decimals: 18,
      name: 'RARI'
    },
    {
      address: addresses.ethereum.tokens.PRO,  // PRO
      decimals: 8,
      name: 'PRO'
    },
    {
      address: addresses.ethereum.tokens.BTM,  // BTM
      decimals: 8,
      name: 'BTM'
    },
    {
      address: addresses.ethereum.tokens.FEG,  // FEG
      decimals: 9,
      name: 'FEG'
    },
    {
      address: addresses.ethereum.tokens.BLZ,  // BLZ
      decimals: 18,
      name: 'BLZ'
    },
    {
      address: addresses.ethereum.tokens.AMB,  // AMB
      decimals: 18,
      name: 'AMB'
    },
    {
      address: addresses.ethereum.tokens.UBT,  // UBT
      decimals: 8,
      name: 'UBT'
    },
    {
      address: addresses.ethereum.tokens.KEY,  // KEY
      decimals: 18,
      name: 'KEY'
    },
    {
      address: addresses.ethereum.tokens.PLU,  // PLU
      decimals: 18,
      name: 'PLU'
    },
    {
      address: addresses.ethereum.tokens.UFT,  // UFT
      decimals: 18,
      name: 'UFT'
    },
    {
      address: addresses.ethereum.tokens.AGLD,  // AGLD
      decimals: 18,
      name: 'AGLD'
    },
    {
      address: addresses.ethereum.tokens.ICN,  // ICN
      decimals: 18,
      name: 'ICN'
    },
    {
      address: addresses.ethereum.tokens.SDN,  // SDN
      decimals: 18,
      name: 'SDN'
    },
    {
      address: addresses.ethereum.tokens.DF,  // DF
      decimals: 18,
      name: 'DF'
    },
    {
      address: addresses.ethereum.tokens.DATA,  // DATA
      decimals: 18,
      name: 'DATA'
    },
    {
      address: addresses.ethereum.tokens.BZ,  // BZ
      decimals: 18,
      name: 'BZ'
    },
    {
      address: addresses.ethereum.tokens.ROUTE,  // ROUTE
      decimals: 18,
      name: 'ROUTE'
    },
    {
      address: addresses.ethereum.tokens.OM,  // OM
      decimals: 18,
      name: 'OM'
    },
    {
      address: addresses.ethereum.tokens.KIN,  // KIN
      decimals: 18,
      name: 'KIN'
    },
    {
      address: addresses.ethereum.tokens.FSN,  // FSN
      decimals: 18,
      name: 'FSN'
    },
    {
      address: addresses.ethereum.tokens.renBTC,  // renBTC
      decimals: 8,
      name: 'renBTC'
    },
    {
      address: addresses.ethereum.tokens.RARE,  // RARE
      decimals: 18,
      name: 'RARE'
    },
    {
      address: addresses.ethereum.tokens.FRONT,  // FRONT
      decimals: 18,
      name: 'FRONT'
    },
    {
      address: addresses.ethereum.tokens.MATH,  // MATH
      decimals: 18,
      name: 'MATH'
    },
    {
      address: addresses.ethereum.tokens.STOS,  // STOS
      decimals: 18,
      name: 'STOS'
    },
    {
      address: addresses.ethereum.tokens.AST,  // AST
      decimals: 4,
      name: 'AST'
    },
    {
      address: addresses.ethereum.tokens.UPP,  // UPP
      decimals: 18,
      name: 'UPP'
    },
    {
      address: addresses.ethereum.tokens.ULT,  // ULT
      decimals: 18,
      name: 'ULT'
    },
    {
      address: addresses.ethereum.tokens.DG,  // DG
      decimals: 18,
      name: 'DG'
    },
    {
      address: addresses.ethereum.tokens.KNC,  // KNC
      decimals: 18,
      name: 'KNC'
    },
    {
      address: addresses.ethereum.tokens.PSTAKE,  // PSTAKE
      decimals: 18,
      name: 'PSTAKE'
    },
    {
      address: addresses.ethereum.tokens.HEGIC,  // HEGIC
      decimals: 18,
      name: 'HEGIC'
    },
    {
      address: addresses.ethereum.tokens.BMC,  // BMC
      decimals: 18,
      name: 'BMC'
    },
    {
      address: addresses.ethereum.tokens.STC,  // STC
      decimals: 18,
      name: 'STC'
    },
    {
      address: addresses.ethereum.tokens.SWISE,  // SWISE
      decimals: 18,
      name: 'SWISE'
    },
    {
      address: addresses.ethereum.tokens.DEXT,  // DEXT
      decimals: 18,
      name: 'DEXT'
    },
    {
      address: addresses.ethereum.tokens.VIB,  // VIB
      decimals: 18,
      name: 'VIB'
    },
    {
      address: addresses.ethereum.tokens.PRQ,  // PRQ
      decimals: 18,
      name: 'PRQ'
    },
    {
      address: addresses.ethereum.tokens.PRE,  // PRE
      decimals: 18,
      name: 'PRE'
    },
    {
      address: addresses.ethereum.tokens.PRE,  // PRE
      decimals: 18,
      name: 'PRE'
    },
    {
      address: addresses.ethereum.tokens.PNK,  // PNK
      decimals: 18,
      name: 'PNK'
    },
    {
      address: addresses.ethereum.tokens.LON,  // LON
      decimals: 18,
      name: 'LON'
    },
    {
      address: addresses.ethereum.tokens.DVF,  // DVF
      decimals: 18,
      name: 'DVF'
    },
    {
      address: addresses.ethereum.tokens.MDT,  // MDT
      decimals: 18,
      name: 'MDT'
    },
    {
      address: addresses.ethereum.tokens.GTO,  // GTO
      decimals: 5,
      name: 'GTO'
    },
    {
      address: addresses.ethereum.tokens.DERC,  // DERC
      decimals: 18,
      name: 'DERC'
    },
    {
      address: addresses.ethereum.tokens.GBYTE,  // GBYTE
      decimals: 18,
      name: 'GBYTE'
    },
    {
      address: addresses.ethereum.tokens.THOR,  // THOR
      decimals: 18,
      name: 'THOR'
    },
    {
      address: addresses.ethereum.tokens.FUSE,  // FUSE
      decimals: 18,
      name: 'FUSE'
    },
    {
      address: addresses.ethereum.tokens.DOCK,  // DOCK
      decimals: 18,
      name: 'DOCK'
    },
    {
      address: addresses.ethereum.tokens.VISR,  // VISR
      decimals: 18,
      name: 'VISR'
    },
    {
      address: addresses.ethereum.tokens.SDT,  // SDT
      decimals: 18,
      name: 'SDT'
    },
    {
      address: addresses.ethereum.tokens.BOO,  // BOO
      decimals: 18,
      name: 'BOO'
    },
    {
      address: addresses.ethereum.tokens.icETH,  // icETH
      decimals: 18,
      name: 'icETH'
    },
    {
      address: addresses.ethereum.tokens.OAX,  // OAX
      decimals: 18,
      name: 'OAX'
    },
    {
      address: addresses.ethereum.tokens.AVT,  // AVT
      decimals: 18,
      name: 'AVT'
    },
    {
      address: addresses.ethereum.tokens.MCB,  // MCB
      decimals: 18,
      name: 'MCB'
    },
    {
      address: addresses.ethereum.tokens.QANX,  // QANX
      decimals: 18,
      name: 'QANX'
    },
    {
      address: addresses.ethereum.tokens.ZCN,  // ZCN
      decimals: 10,
      name: 'ZCN'
    },
    {
      address: addresses.ethereum.tokens.PSP,  // PSP
      decimals: 18,
      name: 'PSP'
    },
    {
      address: addresses.ethereum.tokens.HOPR,  // HOPR
      decimals: 18,
      name: 'HOPR'
    },
    {
      address: addresses.ethereum.tokens.RISE,  // RISE
      decimals: 18,
      name: 'RISE'
    },
    {
      address: addresses.ethereum.tokens.SWTH,  // SWTH
      decimals: 8,
      name: 'SWTH'
    },
    {
      address: addresses.ethereum.tokens.FOX,  // FOX
      decimals: 18,
      name: 'FOX'
    },
    {
      address: addresses.ethereum.tokens.UTNP,  // UTNP
      decimals: 18,
      name: 'UTNP'
    },
    {
      address: addresses.ethereum.tokens.NCT,  // NCT
      decimals: 18,
      name: 'NCT'
    },
    {
      address: addresses.ethereum.tokens.MUSD,  // MUSD
      decimals: 18,
      name: 'MUSD'
    },
    {
      address: addresses.ethereum.tokens.BANANA,  // BANANA
      decimals: 18,
      name: 'BANANA'
    },
    {
      address: addresses.ethereum.tokens.BOA,  // BOA
      decimals: 7,
      name: 'BOA'
    },
    {
      address: addresses.ethereum.tokens.HOO,  // HOO
      decimals: 8,
      name: 'HOO'
    },
    {
      address: addresses.ethereum.tokens.TONE,  // TONE
      decimals: 18,
      name: 'TONE'
    },
    {
      address: addresses.ethereum.tokens.xDG,  // xDG
      decimals: 18,
      name: 'xDG'
    },
    {
      address: addresses.ethereum.tokens.YCC,  // YCC
      decimals: 8,
      name: 'YCC'
    },
    {
      address: addresses.ethereum.tokens.NET,  // NET
      decimals: 18,
      name: 'NET'
    },
    {
      address: addresses.ethereum.tokens.KRL,  // KRL
      decimals: 18,
      name: 'KRL'
    },
    {
      address: addresses.ethereum.tokens.ABT,  // ABT
      decimals: 18,
      name: 'ABT'
    },
    {
      address: addresses.ethereum.tokens.CUBE,  // CUBE
      decimals: 8,
      name: 'CUBE'
    },
    {
      address: addresses.ethereum.tokens.PNT,  // PNT
      decimals: 18,
      name: 'PNT'
    },
    {
      address: addresses.ethereum.tokens.GEL,  // GEL
      decimals: 18,
      name: 'GEL'
    },
    {
      address: addresses.ethereum.tokens.QSP,  // QSP
      decimals: 18,
      name: 'QSP'
    },
    {
      address: addresses.ethereum.tokens.GET,  // GET
      decimals: 18,
      name: 'GET'
    },
    {
      address: addresses.ethereum.tokens.LOC,  // LOC
      decimals: 18,
      name: 'LOC'
    },
    {
      address: addresses.ethereum.tokens.WXT,  // WXT
      decimals: 18,
      name: 'WXT'
    },
    {
      address: addresses.ethereum.tokens.MOON,  // MOON
      decimals: 18,
      name: 'MOON'
    },
    {
      address: addresses.ethereum.tokens.Silo,  // Silo
      decimals: 18,
      name: 'Silo'
    },
    {
      address: addresses.ethereum.tokens.OVR,  // OVR
      decimals: 18,
      name: 'OVR'
    },
    {
      address: addresses.ethereum.tokens.PKF,  // PKF
      decimals: 18,
      name: 'PKF'
    },
    {
      address: addresses.ethereum.tokens.GRID,  // GRID
      decimals: 12,
      name: 'GRID'
    },
    {
      address: addresses.ethereum.tokens.MANC,  // MANC
      decimals: 2,
      name: 'MANC'
    },
    {
      address: addresses.ethereum.tokens.UNCX,  // UNCX
      decimals: 18,
      name: 'UNCX'
    },
    {
      address: addresses.ethereum.tokens.HOGE,  // HOGE
      decimals: 9,
      name: 'HOGE'
    },
    {
      address: addresses.ethereum.tokens.IDRT,  // IDRT
      decimals: 2,
      name: 'IDRT'
    },
    {
      address: addresses.ethereum.tokens.WaBi,  // WaBi
      decimals: 18,
      name: 'WaBi'
    },
    {
      address: addresses.ethereum.tokens.TORN,  // TORN
      decimals: 18,
      name: 'TORN'
    },
    {
      address: addresses.ethereum.tokens.ZB,  // ZB
      decimals: 18,
      name: 'ZB'
    },
    {
      address: addresses.ethereum.tokens.INST,  // INST
      decimals: 18,
      name: 'INST'
    },
    {
      address: addresses.ethereum.tokens.WIC,  // WIC
      decimals: 8,
      name: 'WIC'
    },
    {
      address: addresses.ethereum.tokens.COW,  // COW
      decimals: 18,
      name: 'COW'
    },
    {
      address: addresses.ethereum.tokens.VEE,  // VEE
      decimals: 18,
      name: 'VEE'
    },
    {
      address: addresses.ethereum.tokens.QRL,  // QRL
      decimals: 8,
      name: 'QRL'
    },
    {
      address: addresses.ethereum.tokens.BLANK,  // BLANK
      decimals: 18,
      name: 'BLANK'
    },
    {
      address: addresses.ethereum.tokens.RAE,  // RAE
      decimals: 18,
      name: 'RAE'
    },
    {
      address: addresses.ethereum.tokens.eQUAD,  // eQUAD
      decimals: 18,
      name: 'eQUAD'
    },
    {
      address: addresses.ethereum.tokens.SPANK,  // SPANK
      decimals: 18,
      name: 'SPANK'
    },
    {
      address: addresses.ethereum.tokens.ELI,  // ELI
      decimals: 18,
      name: 'ELI'
    },
    {
      address: addresses.ethereum.tokens.CIV,  // CIV
      decimals: 18,
      name: 'CIV'
    },
    {
      address: addresses.ethereum.tokens.AWC,  // AWC
      decimals: 8,
      name: 'AWC'
    },
    {
      address: addresses.ethereum.tokens.BPT,  // BPT
      decimals: 18,
      name: 'BPT'
    },
    {
      address: addresses.ethereum.tokens.SWFTC,  // SWFTC
      decimals: 8,
      name: 'SWFTC'
    },
    {
      address: addresses.ethereum.tokens.BTU,  // BTU
      decimals: 18,
      name: 'BTU'
    },
    {
      address: addresses.ethereum.tokens.BEPRO,  // BEPRO
      decimals: 18,
      name: 'BEPRO'
    },
    {
      address: addresses.ethereum.tokens.EDEN,  // EDEN
      decimals: 18,
      name: 'EDEN'
    },
    {
      address: addresses.ethereum.tokens.WAS,  // WAS
      decimals: 18,
      name: 'WAS'
    },
    {
      address: addresses.ethereum.tokens.WTC,  // WTC
      decimals: 18,
      name: 'WTC'
    },
    {
      address: addresses.ethereum.tokens.XFT,  // XFT
      decimals: 18,
      name: 'XFT'
    },
    {
      address: addresses.ethereum.tokens.RGT,  // RGT
      decimals: 18,
      name: 'RGT'
    },
    {
      address: addresses.ethereum.tokens.ORAI,  // ORAI
      decimals: 18,
      name: 'ORAI'
    },
    {
      address: addresses.ethereum.tokens.NUM,  // NUM
      decimals: 18,
      name: 'NUM'
    },
    {
      address: addresses.ethereum.tokens.CRPT,  // CRPT
      decimals: 18,
      name: 'CRPT'
    },
    {
      address: addresses.ethereum.tokens.FOAM,  // FOAM
      decimals: 18,
      name: 'FOAM'
    },
    {
      address: addresses.ethereum.tokens.EL,  // EL
      decimals: 18,
      name: 'EL'
    },
    {
      address: addresses.ethereum.tokens.wBAN,  // wBAN
      decimals: 18,
      name: 'wBAN'
    },
    {
      address: addresses.ethereum.tokens.ZYN,  // ZYN
      decimals: 18,
      name: 'ZYN'
    },
    {
      address: addresses.ethereum.tokens.RING,  // RING
      decimals: 18,
      name: 'RING'
    },
    {
      address: addresses.ethereum.tokens.KAN,  // KAN
      decimals: 18,
      name: 'KAN'
    },
    {
      address: addresses.ethereum.tokens.SHFT,  // SHFT
      decimals: 18,
      name: 'SHFT'
    },
    {
      address: addresses.ethereum.tokens.MNTL,  // MNTL
      decimals: 6,
      name: 'MNTL'
    },
    {
      address: addresses.ethereum.tokens.ANGLE,  // ANGLE
      decimals: 18,
      name: 'ANGLE'
    },
    {
      address: addresses.ethereum.tokens.HOP,  // HOP
      decimals: 18,
      name: 'HOP'
    },
    {
      address: addresses.ethereum.tokens.INSUR,  // INSUR
      decimals: 18,
      name: 'INSUR'
    },
    {
      address: addresses.ethereum.tokens.DTX,  // DTX
      decimals: 18,
      name: 'DTX'
    },
    {
      address: addresses.ethereum.tokens.POA20,  // POA20
      decimals: 18,
      name: 'POA20'
    },
    {
      address: addresses.ethereum.tokens.PUSH,  // PUSH
      decimals: 18,
      name: 'PUSH'
    },
    {
      address: addresses.ethereum.tokens.SAN,  // SAN
      decimals: 18,
      name: 'SAN'
    },
    {
      address: addresses.ethereum.tokens.BC,  // BC
      decimals: 18,
      name: 'BC'
    },
    {
      address: addresses.ethereum.tokens.GOVI,  // GOVI
      decimals: 18,
      name: 'GOVI'
    },
    {
      address: addresses.ethereum.tokens.OCC,  // OCC
      decimals: 18,
      name: 'OCC'
    },
    {
      address: addresses.ethereum.tokens.XED,  // XED
      decimals: 18,
      name: 'XED'
    },
    {
      address: addresses.ethereum.tokens.CGT,  // CGT
      decimals: 8,
      name: 'CGT'
    },
    {
      address: addresses.ethereum.tokens.TYRANT,  // TYRANT
      decimals: 9,
      name: 'TYRANT'
    },
    {
      address: addresses.ethereum.tokens.AOG,  // AOG
      decimals: 18,
      name: 'AOG'
    },
    {
      address: addresses.ethereum.tokens.CARD,  // CARD
      decimals: 18,
      name: 'CARD'
    },
    {
      address: addresses.ethereum.tokens.POOLZ,  // POOLZ
      decimals: 18,
      name: 'POOLZ'
    },
    {
      address: addresses.ethereum.tokens.MWAT,  // MWAT
      decimals: 18,
      name: 'MWAT'
    },
    {
      address: addresses.ethereum.tokens.PROB,  // PROB
      decimals: 18,
      name: 'PROB'
    },
    {
      address: addresses.ethereum.tokens.XTM,  // XTM
      decimals: 18,
      name: 'XTM'
    },
    {
      address: addresses.ethereum.tokens.NOW,  // NOW
      decimals: 8,
      name: 'NOW'
    },
    {
      address: addresses.ethereum.tokens.QAU,  // QAU
      decimals: 8,
      name: 'QAU'
    },
    {
      address: addresses.ethereum.tokens.PAI,  // PAI
      decimals: 18,
      name: 'PAI'
    },
    {
      address: addresses.ethereum.tokens.COV,  // COV
      decimals: 18,
      name: 'COV'
    },
    {
      address: addresses.ethereum.tokens.pSAFEMOON,  // pSAFEMOON
      decimals: 18,
      name: 'pSAFEMOON'
    },
    {
      address: addresses.ethereum.tokens.BORING,  // BORING
      decimals: 18,
      name: 'BORING'
    },
    {
      address: addresses.ethereum.tokens.SD,  // SD
      decimals: 18,
      name: 'SD'
    },
    {
      address: addresses.ethereum.tokens.DAPS,  // DAPS
      decimals: 18,
      name: 'DAPS'
    },
    {
      address: addresses.ethereum.tokens.VSP,  // VSP
      decimals: 18,
      name: 'VSP'
    },
    {
      address: addresses.ethereum.tokens.PBR,  // PBR
      decimals: 18,
      name: 'PBR'
    },
    {
      address: addresses.ethereum.tokens.MTH,  // MTH
      decimals: 5,
      name: 'MTH'
    },
    {
      address: addresses.ethereum.tokens.DSLA,  // DSLA
      decimals: 18,
      name: 'DSLA'
    },
    {
      address: addresses.ethereum.tokens.OS,  // OS
      decimals: 18,
      name: 'OS'
    },
    {
      address: addresses.ethereum.tokens.YAM,  // YAM
      decimals: 18,
      name: 'YAM'
    },
    {
      address: addresses.ethereum.tokens.STACK,  // STACK
      decimals: 18,
      name: 'STACK'
    },
    {
      address: addresses.ethereum.tokens.STIMA,  // STIMA
      decimals: 6,
      name: 'STIMA'
    },
    {
      address: addresses.ethereum.tokens.NGC,  // NGC
      decimals: 18,
      name: 'NGC'
    },
    {
      address: addresses.ethereum.tokens.TEMP,  // TEMP
      decimals: 18,
      name: 'TEMP'
    },
    {
      address: addresses.ethereum.tokens.SATT,  // SATT
      decimals: 18,
      name: 'SATT'
    },
    {
      address: addresses.ethereum.tokens.LEND,  // LEND
      decimals: 18,
      name: 'LEND'
    },
    {
      address: addresses.ethereum.tokens.EVAI,  // EVAI
      decimals: 18,
      name: 'EVAI'
    },
    {
      address: addresses.ethereum.tokens.STRP,  // STRP
      decimals: 18,
      name: 'STRP'
    },
    {
      address: addresses.ethereum.tokens.DHT,  // DHT
      decimals: 18,
      name: 'DHT'
    },
    {
      address: addresses.ethereum.tokens.EDG,  // EDG
      decimals: 0,
      name: 'EDG'
    },
    {
      address: addresses.ethereum.tokens.VOICE,  // VOICE
      decimals: 18,
      name: 'VOICE'
    },
    {
      address: addresses.ethereum.tokens.CNHT,  // CNHT
      decimals: 6,
      name: 'CNHT'
    },
    {
      address: addresses.ethereum.tokens.JRT,  // JRT
      decimals: 18,
      name: 'JRT'
    },
    {
      address: addresses.ethereum.tokens.SOC,  // SOC
      decimals: 18,
      name: 'SOC'
    },
    {
      address: addresses.ethereum.tokens.FKX,  // FKX
      decimals: 18,
      name: 'FKX'
    },
    {
      address: addresses.ethereum.tokens.SHA,  // SHA
      decimals: 18,
      name: 'SHA'
    },
    {
      address: addresses.ethereum.tokens.SNC,  // SNC
      decimals: 18,
      name: 'SNC'
    },
    {
      address: addresses.ethereum.tokens.PAID,  // PAID
      decimals: 18,
      name: 'PAID'
    },
    {
      address: addresses.ethereum.tokens.BHPC,  // BHPC
      decimals: 18,
      name: 'BHPC'
    },
    {
      address: addresses.ethereum.tokens.DERI,  // DERI
      decimals: 18,
      name: 'DERI'
    },
    {
      address: addresses.ethereum.tokens.BiFi,  // BiFi
      decimals: 18,
      name: 'BiFi'
    },
    {
      address: addresses.ethereum.tokens.LA,  // LA
      decimals: 18,
      name: 'LA'
    },
    {
      address: addresses.ethereum.tokens.PRC,  // PRC
      decimals: 8,
      name: 'PRC'
    },
    {
      address: addresses.ethereum.tokens.TEN,  // TEN
      decimals: 18,
      name: 'TEN'
    },
    {
      address: addresses.ethereum.tokens.KLEE,  // KLEE
      decimals: 9,
      name: 'KLEE'
    },
    {
      address: addresses.ethereum.tokens.PPT,  // PPT
      decimals: 8,
      name: 'PPT'
    },
    {
      address: addresses.ethereum.tokens.SALT,  // SALT
      decimals: 8,
      name: 'SALT'
    },
    {
      address: addresses.ethereum.tokens.LIKE,  // LIKE
      decimals: 18,
      name: 'LIKE'
    },
    {
      address: addresses.ethereum.tokens.LAMB,  // LAMB
      decimals: 18,
      name: 'LAMB'
    },
    {
      address: addresses.ethereum.tokens.GEEQ,  // GEEQ
      decimals: 18,
      name: 'GEEQ'
    },
    {
      address: addresses.ethereum.tokens.PAR,  // PAR
      decimals: 18,
      name: 'PAR'
    },
    {
      address: addresses.ethereum.tokens.ZT,  // ZT
      decimals: 18,
      name: 'ZT'
    },
    {
      address: addresses.ethereum.tokens.MTA,  // MTA
      decimals: 18,
      name: 'MTA'
    },
    {
      address: addresses.ethereum.tokens.SHI,  // SHI
      decimals: 18,
      name: 'SHI'
    },
    {
      address: addresses.ethereum.tokens.IXS,  // IXS
      decimals: 18,
      name: 'IXS'
    },
    {
      address: addresses.ethereum.tokens.GHOST,  // GHOST
      decimals: 18,
      name: 'GHOST'
    },
    {
      address: addresses.ethereum.tokens.BAX,  // BAX
      decimals: 18,
      name: 'BAX'
    },
    {
      address: addresses.ethereum.tokens.POOL,  // POOL
      decimals: 18,
      name: 'POOL'
    },
    {
      address: addresses.ethereum.tokens.PMON,  // PMON
      decimals: 18,
      name: 'PMON'
    },
    {
      address: addresses.ethereum.tokens.TKN,  // TKN
      decimals: 8,
      name: 'TKN'
    },
    {
      address: addresses.ethereum.tokens.RBC,  // RBC
      decimals: 18,
      name: 'RBC'
    },
    {
      address: addresses.ethereum.tokens.MAN,  // MAN
      decimals: 18,
      name: 'MAN'
    },
    {
      address: addresses.ethereum.tokens.QBX,  // QBX
      decimals: 18,
      name: 'QBX'
    },
    {
      address: addresses.ethereum.tokens.SPC,  // SPC
      decimals: 18,
      name: 'SPC'
    },
    {
      address: addresses.ethereum.tokens.MARSH,  // MARSH
      decimals: 18,
      name: 'MARSH'
    },
    {
      address: addresses.ethereum.tokens.FCL,  // FCL
      decimals: 18,
      name: 'FCL'
    },
    {
      address: addresses.ethereum.tokens.cZRX,  // cZRX
      decimals: 8,
      name: 'cZRX'
    },
    {
      address: addresses.ethereum.tokens.UNIC,  // UNIC
      decimals: 18,
      name: 'UNIC'
    },
    {
      address: addresses.ethereum.tokens.BCMC,  // BCMC
      decimals: 18,
      name: 'BCMC'
    },
    {
      address: addresses.ethereum.tokens.BCDT,  // BCDT
      decimals: 18,
      name: 'BCDT'
    },
    {
      address: addresses.ethereum.tokens.MFG,  // MFG
      decimals: 18,
      name: 'MFG'
    },
    {
      address: addresses.ethereum.tokens.DEFIT,  // DEFIT
      decimals: 18,
      name: 'DEFIT'
    },
    {
      address: addresses.ethereum.tokens.ICE,  // ICE
      decimals: 18,
      name: 'ICE'
    },
    {
      address: addresses.ethereum.tokens.ABL,  // ABL
      decimals: 18,
      name: 'ABL'
    },
    {
      address: addresses.ethereum.tokens.PNODE,  // PNODE
      decimals: 18,
      name: 'PNODE'
    },
    {
      address: addresses.ethereum.tokens.eRSDL,  // eRSDL
      decimals: 18,
      name: 'eRSDL'
    },
    {
      address: addresses.ethereum.tokens.FREE,  // FREE
      decimals: 18,
      name: 'FREE'
    },
    {
      address: addresses.ethereum.tokens.XCUR,  // XCUR
      decimals: 8,
      name: 'XCUR'
    },
    {
      address: addresses.ethereum.tokens.RDN,  // RDN
      decimals: 18,
      name: 'RDN'
    },
    {
      address: addresses.ethereum.tokens.uJENNY,  // uJENNY
      decimals: 18,
      name: 'uJENNY'
    },
    {
      address: addresses.ethereum.tokens.Dentacoin,  // Dentacoin
      decimals: 0,
      name: 'Dentacoin'
    },
    {
      address: addresses.ethereum.tokens.UNCL,  // UNCL
      decimals: 18,
      name: 'UNCL'
    },
    {
      address: addresses.ethereum.tokens.DAX,  // DAX
      decimals: 18,
      name: 'DAX'
    },
    {
      address: addresses.ethereum.tokens.EGT,  // EGT
      decimals: 18,
      name: 'EGT'
    },
    {
      address: addresses.ethereum.tokens.IQN,  // IQN
      decimals: 18,
      name: 'IQN'
    },
    {
      address: addresses.ethereum.tokens.TIDAL,  // TIDAL
      decimals: 18,
      name: 'TIDAL'
    },
    {
      address: addresses.ethereum.tokens.BOB,  // BOB
      decimals: 18,
      name: 'BOB'
    },
    {
      address: addresses.ethereum.tokens.MINX,  // MINX
      decimals: 6,
      name: 'MINX'
    },
    {
      address: addresses.ethereum.tokens.PLR,  // PLR
      decimals: 18,
      name: 'PLR'
    },
    {
      address: addresses.ethereum.tokens.BLT,  // BLT
      decimals: 18,
      name: 'BLT'
    },
    {
      address: addresses.ethereum.tokens.MINT,  // MINT
      decimals: 18,
      name: 'MINT'
    },
    {
      address: addresses.ethereum.tokens.SENT,  // SENT
      decimals: 8,
      name: 'SENT'
    },
    {
      address: addresses.ethereum.tokens.Xaurum,  // Xaurum
      decimals: 8,
      name: 'Xaurum'
    },
    {
      address: addresses.ethereum.tokens.NFTI,  // NFTI
      decimals: 18,
      name: 'NFTI'
    },
    {
      address: addresses.ethereum.tokens.UCT,  // UCT
      decimals: 18,
      name: 'UCT'
    },
    {
      address: addresses.ethereum.tokens.LCS,  // LCS
      decimals: 18,
      name: 'LCS'
    },
    {
      address: addresses.ethereum.tokens.ETHIX,  // ETHIX
      decimals: 18,
      name: 'ETHIX'
    },
    {
      address: addresses.ethereum.tokens.ARCONA,  // ARCONA
      decimals: 18,
      name: 'ARCONA'
    },
    {
      address: addresses.ethereum.tokens.ARMOR,  // ARMOR
      decimals: 18,
      name: 'ARMOR'
    },
    {
      address: addresses.ethereum.tokens.COMBO,  // COMBO
      decimals: 18,
      name: 'COMBO'
    },
    {
      address: addresses.ethereum.tokens.NFTD,  // NFTD
      decimals: 18,
      name: 'NFTD'
    },
    {
      address: addresses.ethereum.tokens.ATN,  // ATN
      decimals: 18,
      name: 'ATN'
    },
    {
      address: addresses.ethereum.tokens.DIVER,  // DIVER
      decimals: 18,
      name: 'DIVER'
    },
    {
      address: addresses.ethereum.tokens.STAKE,  // STAKE
      decimals: 18,
      name: 'STAKE'
    },
    {
      address: addresses.ethereum.tokens.BST,  // BST
      decimals: 18,
      name: 'BST'
    },
    {
      address: addresses.ethereum.tokens.SIS,  // SIS
      decimals: 18,
      name: 'SIS'
    },
    {
      address: addresses.ethereum.tokens.CNUS,  // CNUS
      decimals: 18,
      name: 'CNUS'
    },
    {
      address: addresses.ethereum.tokens.TNT,  // TNT
      decimals: 8,
      name: 'TNT'
    },
    {
      address: addresses.ethereum.tokens.LYM,  // LYM
      decimals: 18,
      name: 'LYM'
    },
    {
      address: addresses.ethereum.tokens.COS,  // COS
      decimals: 18,
      name: 'COS'
    },
    {
      address: addresses.ethereum.tokens.POSS,  // POSS
      decimals: 18,
      name: 'POSS'
    },
    {
      address: addresses.ethereum.tokens.BIX,  // BIX
      decimals: 18,
      name: 'BIX'
    },
    {
      address: addresses.ethereum.tokens.RCN,  // RCN
      decimals: 18,
      name: 'RCN'
    },
    {
      address: addresses.ethereum.tokens.DGX,  // DGX
      decimals: 9,
      name: 'DGX'
    },
    {
      address: addresses.ethereum.tokens.CTR,  // CTR
      decimals: 18,
      name: 'CTR'
    },
    {
      address: addresses.ethereum.tokens.CPC,  // CPC
      decimals: 18,
      name: 'CPC'
    },
    {
      address: addresses.ethereum.tokens.TOL,  // TOL
      decimals: 18,
      name: 'TOL'
    },
    {
      address: addresses.ethereum.tokens.NAS,  // NAS
      decimals: 18,
      name: 'NAS'
    },
    {
      address: addresses.ethereum.tokens.CONV,  // CONV
      decimals: 18,
      name: 'CONV'
    },
    {
      address: addresses.ethereum.tokens.SNTVT,  // SNTVT
      decimals: 18,
      name: 'SNTVT'
    },
    {
      address: addresses.ethereum.tokens.MTC,  // MTC
      decimals: 18,
      name: 'MTC'
    },
    {
      address: addresses.ethereum.tokens.DEC,  // DEC
      decimals: 18,
      name: 'DEC'
    },
    {
      address: addresses.ethereum.tokens.TAD,  // TAD
      decimals: 18,
      name: 'TAD'
    },
    {
      address: addresses.ethereum.tokens.SRN,  // SRN
      decimals: 18,
      name: 'SRN'
    },
    {
      address: addresses.ethereum.tokens.ZMN,  // ZMN
      decimals: 18,
      name: 'ZMN'
    },
    {
      address: addresses.ethereum.tokens.LFI,  // LFI
      decimals: 18,
      name: 'LFI'
    },
    {
      address: addresses.ethereum.tokens.VADER,  // VADER
      decimals: 18,
      name: 'VADER'
    },
    {
      address: addresses.ethereum.tokens.NPX,  // NPX
      decimals: 2,
      name: 'NPX'
    },
    {
      address: addresses.ethereum.tokens.XTK,  // XTK
      decimals: 18,
      name: 'XTK'
    },
    {
      address: addresses.ethereum.tokens.IOI,  // IOI
      decimals: 6,
      name: 'IOI'
    },
    {
      address: addresses.ethereum.tokens.IOV,  // IOV
      decimals: 8,
      name: 'IOV'
    },
    {
      address: addresses.ethereum.tokens.CMT,  // CMT
      decimals: 18,
      name: 'CMT'
    },
    {
      address: addresses.ethereum.tokens.ARTH,  // ARTH
      decimals: 18,
      name: 'ARTH'
    },
    {
      address: addresses.ethereum.tokens.ODDZ,  // ODDZ
      decimals: 18,
      name: 'ODDZ'
    },
    {
      address: addresses.ethereum.tokens.FLOAT,  // FLOAT
      decimals: 18,
      name: 'FLOAT'
    },
    {
      address: addresses.ethereum.tokens.DOUGH,  // DOUGH
      decimals: 18,
      name: 'DOUGH'
    },
    {
      address: addresses.ethereum.tokens.FNT,  // FNT
      decimals: 6,
      name: 'FNT'
    },
    {
      address: addresses.ethereum.tokens.YOU,  // YOU
      decimals: 18,
      name: 'YOU'
    },
    {
      address: addresses.ethereum.tokens.MDA,  // MDA
      decimals: 18,
      name: 'MDA'
    },
    {
      address: addresses.ethereum.tokens.STAK,  // STAK
      decimals: 18,
      name: 'STAK'
    },
    {
      address: addresses.ethereum.tokens.AOA,  // AOA
      decimals: 18,
      name: 'AOA'
    },
    {
      address: addresses.ethereum.tokens.YAE,  // YAE
      decimals: 18,
      name: 'YAE'
    },
    {
      address: addresses.ethereum.tokens.PIKA,  // PIKA
      decimals: 18,
      name: 'PIKA'
    },
    {
      address: addresses.ethereum.tokens.DAV,  // DAV
      decimals: 18,
      name: 'DAV'
    },
    {
      address: addresses.ethereum.tokens.CND,  // CND
      decimals: 18,
      name: 'CND'
    },
    {
      address: addresses.ethereum.tokens.VIN,  // VIN
      decimals: 18,
      name: 'VIN'
    },
    {
      address: addresses.ethereum.tokens.TCT,  // TCT
      decimals: 18,
      name: 'TCT'
    },
    {
      address: addresses.ethereum.tokens.ORS,  // ORS
      decimals: 18,
      name: 'ORS'
    },
    {
      address: addresses.ethereum.tokens.UCASH,  // UCASH
      decimals: 8,
      name: 'UCASH'
    },
    {
      address: addresses.ethereum.tokens.GAT,  // GAT
      decimals: 18,
      name: 'GAT'
    },
    {
      address: addresses.ethereum.tokens.STND,  // STND
      decimals: 18,
      name: 'STND'
    },
    {
      address: addresses.ethereum.tokens.ZAP,  // ZAP
      decimals: 18,
      name: 'ZAP'
    },
    {
      address: addresses.ethereum.tokens.LBA,  // LBA
      decimals: 18,
      name: 'LBA'
    },
    {
      address: addresses.ethereum.tokens.AMLT,  // AMLT
      decimals: 18,
      name: 'AMLT'
    },
    {
      address: addresses.ethereum.tokens.MSP,  // MSP
      decimals: 18,
      name: 'MSP'
    },
    {
      address: addresses.ethereum.tokens.HMQ,  // HMQ
      decimals: 8,
      name: 'HMQ'
    },
    {
      address: addresses.ethereum.tokens.TRACE,  // TRACE
      decimals: 18,
      name: 'TRACE'
    },
    {
      address: addresses.ethereum.tokens.DOV,  // DOV
      decimals: 18,
      name: 'DOV'
    },
    {
      address: addresses.ethereum.tokens.FAIR,  // FAIR
      decimals: 18,
      name: 'FAIR'
    },
    {
      address: addresses.ethereum.tokens.Rating,  // Rating
      decimals: 8,
      name: 'Rating'
    },
    {
      address: addresses.ethereum.tokens.DIGG,  // DIGG
      decimals: 9,
      name: 'DIGG'
    },
    {
      address: addresses.ethereum.tokens.SLICE,  // SLICE
      decimals: 18,
      name: 'SLICE'
    },
    {
      address: addresses.ethereum.tokens.PLAY,  // PLAY
      decimals: 18,
      name: 'PLAY'
    },
    {
      address: addresses.ethereum.tokens.LPOOL,  // LPOOL
      decimals: 18,
      name: 'LPOOL'
    },
    {
      address: addresses.ethereum.tokens.SPH,  // SPH
      decimals: 18,
      name: 'SPH'
    },
    {
      address: addresses.ethereum.tokens.WOOFY,  // WOOFY
      decimals: 12,
      name: 'WOOFY'
    },
    {
      address: addresses.ethereum.tokens.S,  // S
      decimals: 18,
      name: 'S'
    },
    {
      address: addresses.ethereum.tokens.renDOGE,  // renDOGE
      decimals: 8,
      name: 'renDOGE'
    },
    {
      address: addresses.ethereum.tokens.INXT,  // INXT
      decimals: 8,
      name: 'INXT'
    },
    {
      address: addresses.ethereum.tokens.TFL,  // TFL
      decimals: 8,
      name: 'TFL'
    },
    {
      address: addresses.ethereum.tokens.PAWTH,  // PAWTH
      decimals: 9,
      name: 'PAWTH'
    },
    {
      address: addresses.ethereum.tokens.PMA,  // PMA
      decimals: 18,
      name: 'PMA'
    },
    {
      address: addresses.ethereum.tokens.VPP,  // VPP
      decimals: 18,
      name: 'VPP'
    },
    {
      address: addresses.ethereum.tokens.ETHO,  // ETHO
      decimals: 18,
      name: 'ETHO'
    },
    {
      address: addresses.ethereum.tokens.GSE,  // GSE
      decimals: 4,
      name: 'GSE'
    },
    {
      address: addresses.ethereum.tokens.CRD,  // CRD
      decimals: 18,
      name: 'CRD'
    },
    {
      address: addresses.ethereum.tokens.GRO,  // GRO
      decimals: 18,
      name: 'GRO'
    },
    {
      address: addresses.ethereum.tokens.URQA,  // URQA
      decimals: 18,
      name: 'URQA'
    },
    {
      address: addresses.ethereum.tokens.CRBN,  // CRBN
      decimals: 18,
      name: 'CRBN'
    },
    {
      address: addresses.ethereum.tokens.OCN,  // OCN
      decimals: 18,
      name: 'OCN'
    },
    {
      address: addresses.ethereum.tokens.NEXT,  // NEXT
      decimals: 18,
      name: 'NEXT'
    },
    {
      address: addresses.ethereum.tokens.ZDR,  // ZDR
      decimals: 18,
      name: 'ZDR'
    },
    {
      address: addresses.ethereum.tokens.BRD,  // BRD
      decimals: 18,
      name: 'BRD'
    },
    {
      address: addresses.ethereum.tokens.GNX,  // GNX
      decimals: 9,
      name: 'GNX'
    },
    {
      address: addresses.ethereum.tokens.HIT,  // HIT
      decimals: 6,
      name: 'HIT'
    },
    {
      address: addresses.ethereum.tokens.GVT,  // GVT
      decimals: 18,
      name: 'GVT'
    },
    {
      address: addresses.ethereum.tokens.NANJ,  // NANJ
      decimals: 8,
      name: 'NANJ'
    },
    {
      address: addresses.ethereum.tokens.FLP,  // FLP
      decimals: 18,
      name: 'FLP'
    },
    {
      address: addresses.ethereum.tokens.cV,  // cV
      decimals: 18,
      name: 'cV'
    },
    {
      address: addresses.ethereum.tokens.BGG,  // BGG
      decimals: 18,
      name: 'BGG'
    },
    {
      address: addresses.ethereum.tokens.ATL,  // ATL
      decimals: 18,
      name: 'ATL'
    },
    {
      address: addresses.ethereum.tokens.ESS,  // ESS
      decimals: 18,
      name: 'ESS'
    },
    {
      address: addresses.ethereum.tokens.CTI,  // CTI
      decimals: 18,
      name: 'CTI'
    },
    {
      address: addresses.ethereum.tokens.UDO,  // UDO
      decimals: 18,
      name: 'UDO'
    },
    {
      address: addresses.ethereum.tokens.EXRN,  // EXRN
      decimals: 0,
      name: 'EXRN'
    },
    {
      address: addresses.ethereum.tokens.WGP,  // WGP
      decimals: 18,
      name: 'WGP'
    },
    {
      address: addresses.ethereum.tokens.FYP,  // FYP
      decimals: 18,
      name: 'FYP'
    },
    {
      address: addresses.ethereum.tokens.MT,  // MT
      decimals: 18,
      name: 'MT'
    },
    {
      address: addresses.ethereum.tokens.PST,  // PST
      decimals: 18,
      name: 'PST'
    },
    {
      address: addresses.ethereum.tokens.MTN,  // MTN
      decimals: 18,
      name: 'MTN'
    },
    {
      address: addresses.ethereum.tokens.Bez,  // Bez
      decimals: 18,
      name: 'Bez'
    },
    {
      address: addresses.ethereum.tokens.NEU,  // NEU
      decimals: 18,
      name: 'NEU'
    },
    {
      address: addresses.ethereum.tokens.SKM,  // SKM
      decimals: 18,
      name: 'SKM'
    },
    {
      address: addresses.ethereum.tokens.NIOX,  // NIOX
      decimals: 4,
      name: 'NIOX'
    },
    {
      address: addresses.ethereum.tokens.HAKKA,  // HAKKA
      decimals: 18,
      name: 'HAKKA'
    },
    {
      address: addresses.ethereum.tokens.XMX,  // XMX
      decimals: 8,
      name: 'XMX'
    },
    {
      address: addresses.ethereum.tokens.KCASH,  // KCASH
      decimals: 18,
      name: 'KCASH'
    },
    {
      address: addresses.ethereum.tokens.GAS,  // GAS
      decimals: 18,
      name: 'GAS'
    },
    {
      address: addresses.ethereum.tokens.ROX,  // ROX
      decimals: 18,
      name: 'ROX'
    },
    {
      address: addresses.ethereum.tokens.ELEC,  // ELEC
      decimals: 18,
      name: 'ELEC'
    },
    {
      address: addresses.ethereum.tokens.UFR,  // UFR
      decimals: 18,
      name: 'UFR'
    },
    {
      address: addresses.ethereum.tokens.ENG,  // ENG
      decimals: 8,
      name: 'ENG'
    },
    {
      address: addresses.ethereum.tokens.PAINT,  // PAINT
      decimals: 18,
      name: 'PAINT'
    },
    {
      address: addresses.ethereum.tokens.ADB,  // ADB
      decimals: 18,
      name: 'ADB'
    },
    {
      address: addresses.ethereum.tokens.SWPR,  // SWPR
      decimals: 18,
      name: 'SWPR'
    },
    {
      address: addresses.ethereum.tokens.LUCHOW,  // LUCHOW
      decimals: 18,
      name: 'LUCHOW'
    },
    {
      address: addresses.ethereum.tokens.EVX,  // EVX
      decimals: 4,
      name: 'EVX'
    },
    {
      address: addresses.ethereum.tokens.STM,  // STM
      decimals: 18,
      name: 'STM'
    },
    {
      address: addresses.ethereum.tokens.SATA,  // SATA
      decimals: 18,
      name: 'SATA'
    },
    {
      address: addresses.ethereum.tokens.COFI,  // COFI
      decimals: 18,
      name: 'COFI'
    },
    {
      address: addresses.ethereum.tokens.RNT,  // RNT
      decimals: 18,
      name: 'RNT'
    },
    {
      address: addresses.ethereum.tokens.XIO,  // XIO
      decimals: 18,
      name: 'XIO'
    },
    {
      address: addresses.ethereum.tokens.AT,  // AT
      decimals: 18,
      name: 'AT'
    },
    {
      address: addresses.ethereum.tokens.PHI,  // PHI
      decimals: 18,
      name: 'PHI'
    },
    {
      address: addresses.ethereum.tokens.EZ,  // EZ
      decimals: 18,
      name: 'EZ'
    },
    {
      address: addresses.ethereum.tokens.DEPAY,  // DEPAY
      decimals: 18,
      name: 'DEPAY'
    },
    {
      address: addresses.ethereum.tokens.EZW,  // EZW
      decimals: 18,
      name: 'EZW'
    },
    {
      address: addresses.ethereum.tokens.LGO,  // LGO
      decimals: 8,
      name: 'LGO'
    },
    {
      address: addresses.ethereum.tokens.IMT,  // IMT
      decimals: 18,
      name: 'IMT'
    },
    {
      address: addresses.ethereum.tokens.FTI,  // FTI
      decimals: 18,
      name: 'FTI'
    },
    {
      address: addresses.ethereum.tokens.DMT,  // DMT
      decimals: 8,
      name: 'DMT'
    },
    {
      address: addresses.ethereum.tokens.LND,  // LND
      decimals: 18,
      name: 'LND'
    },
    {
      address: addresses.ethereum.tokens.IDH,  // IDH
      decimals: 6,
      name: 'IDH'
    },
    {
      address: addresses.ethereum.tokens.DOWS,  // DOWS
      decimals: 18,
      name: 'DOWS'
    },
    {
      address: addresses.ethereum.tokens.CHX,  // CHX
      decimals: 18,
      name: 'CHX'
    },
    {
      address: addresses.ethereum.tokens.SWM,  // SWM
      decimals: 18,
      name: 'SWM'
    },
    {
      address: addresses.ethereum.tokens.SNET,  // SNET
      decimals: 8,
      name: 'SNET'
    },
    {
      address: addresses.ethereum.tokens.LXT,  // LXT
      decimals: 18,
      name: 'LXT'
    },
    {
      address: addresses.ethereum.tokens.RVT,  // RVT
      decimals: 18,
      name: 'RVT'
    },
    {
      address: addresses.ethereum.tokens.ZIPT,  // ZIPT
      decimals: 18,
      name: 'ZIPT'
    },
    {
      address: addresses.ethereum.tokens.HVN,  // HVN
      decimals: 8,
      name: 'HVN'
    },
    {
      address: addresses.ethereum.tokens.WPR,  // WPR
      decimals: 18,
      name: 'WPR'
    },
    {
      address: addresses.ethereum.tokens.BTB,  // BTB
      decimals: 18,
      name: 'BTB'
    },
    {
      address: addresses.ethereum.tokens.TIE,  // TIE
      decimals: 18,
      name: 'TIE'
    },
    {
      address: addresses.ethereum.tokens.TOON,  // TOON
      decimals: 18,
      name: 'TOON'
    },
    {
      address: addresses.ethereum.tokens.KTLYO,  // KTLYO
      decimals: 18,
      name: 'KTLYO'
    },
    {
      address: addresses.ethereum.tokens.VIBE,  // VIBE
      decimals: 18,
      name: 'VIBE'
    },
    {
      address: addresses.ethereum.tokens.ST,  // ST
      decimals: 18,
      name: 'ST'
    },
    {
      address: addresses.ethereum.tokens.HSC,  // HSC
      decimals: 18,
      name: 'HSC'
    },
    {
      address: addresses.ethereum.tokens.DHV,  // DHV
      decimals: 18,
      name: 'DHV'
    },
    {
      address: addresses.ethereum.tokens.DRC,  // DRC
      decimals: 0,
      name: 'DRC'
    },
    {
      address: addresses.ethereum.tokens.WTT,  // WTT
      decimals: 0,
      name: 'WTT'
    },
    {
      address: addresses.ethereum.tokens.IB,  // IB
      decimals: 18,
      name: 'IB'
    },
    {
      address: addresses.ethereum.tokens.PPBLZ,  // PPBLZ
      decimals: 18,
      name: 'PPBLZ'
    },
    {
      address: addresses.ethereum.tokens.KAWA,  // KAWA
      decimals: 9,
      name: 'KAWA'
    },
    {
      address: addresses.ethereum.tokens.MDS,  // MDS
      decimals: 18,
      name: 'MDS'
    },
    {
      address: addresses.ethereum.tokens.UGAS,  // UGAS
      decimals: 18,
      name: 'UGAS'
    },
    {
      address: addresses.ethereum.tokens.BCPT,  // BCPT
      decimals: 18,
      name: 'BCPT'
    },
    {
      address: addresses.ethereum.tokens.CAG,  // CAG
      decimals: 18,
      name: 'CAG'
    },
    {
      address: addresses.ethereum.tokens.DPY,  // DPY
      decimals: 18,
      name: 'DPY'
    },
    {
      address: addresses.ethereum.tokens.UMX,  // UMX
      decimals: 18,
      name: 'UMX'
    },
    {
      address: addresses.ethereum.tokens.NCC,  // NCC
      decimals: 18,
      name: 'NCC'
    },
    {
      address: addresses.ethereum.tokens.DWZ,  // DWZ
      decimals: 18,
      name: 'DWZ'
    },
    {
      address: addresses.ethereum.tokens.YEE,  // YEE
      decimals: 18,
      name: 'YEE'
    },
    {
      address: addresses.ethereum.tokens.YOYOW,  // YOYOW
      decimals: 18,
      name: 'YOYOW'
    },
    {
      address: addresses.ethereum.tokens.UIP,  // UIP
      decimals: 18,
      name: 'UIP'
    },
    {
      address: addresses.ethereum.tokens.EDN,  // EDN
      decimals: 18,
      name: 'EDN'
    },
    {
      address: addresses.ethereum.tokens.SPD,  // SPD
      decimals: 18,
      name: 'SPD'
    },
    {
      address: addresses.ethereum.tokens.WINGS,  // WINGS
      decimals: 18,
      name: 'WINGS'
    },
    {
      address: addresses.ethereum.tokens.WAB,  // WAB
      decimals: 18,
      name: 'WAB'
    },
    {
      address: addresses.ethereum.tokens.APPC,  // APPC
      decimals: 18,
      name: 'APPC'
    },
    {
      address: addresses.ethereum.tokens.GEN,  // GEN
      decimals: 18,
      name: 'GEN'
    },
    {
      address: addresses.ethereum.tokens.RMESH,  // RMESH
      decimals: 18,
      name: 'RMESH'
    },
    {
      address: addresses.ethereum.tokens.FIN,  // FIN
      decimals: 18,
      name: 'FIN'
    },
    {
      address: addresses.ethereum.tokens.PTOY,  // PTOY
      decimals: 8,
      name: 'PTOY'
    },
    {
      address: addresses.ethereum.tokens.ZXC,  // ZXC
      decimals: 18,
      name: 'ZXC'
    },
    {
      address: addresses.ethereum.tokens.PRARE,  // PRARE
      decimals: 18,
      name: 'PRARE'
    },
    {
      address: addresses.ethereum.tokens.BITTO,  // BITTO
      decimals: 18,
      name: 'BITTO'
    },
    {
      address: addresses.ethereum.tokens.FDZ,  // FDZ
      decimals: 18,
      name: 'FDZ'
    },
    {
      address: addresses.ethereum.tokens.BTO,  // BTO
      decimals: 18,
      name: 'BTO'
    },
    {
      address: addresses.ethereum.tokens.PTN,  // PTN
      decimals: 18,
      name: 'PTN'
    },
    {
      address: addresses.ethereum.tokens.GARD,  // GARD
      decimals: 18,
      name: 'GARD'
    },
    {
      address: addresses.ethereum.tokens.SPWN,  // SPWN
      decimals: 18,
      name: 'SPWN'
    },
    {
      address: addresses.ethereum.tokens.CNN,  // CNN
      decimals: 18,
      name: 'CNN'
    },
    {
      address: addresses.ethereum.tokens.PIN,  // PIN
      decimals: 18,
      name: 'PIN'
    },
    {
      address: addresses.ethereum.tokens.ODEM,  // ODEM
      decimals: 18,
      name: 'ODEM'
    },
    {
      address: addresses.ethereum.tokens.REM,  // REM
      decimals: 4,
      name: 'REM'
    },
    {
      address: addresses.ethereum.tokens.RUFF,  // RUFF
      decimals: 18,
      name: 'RUFF'
    },
    {
      address: addresses.ethereum.tokens.DTH,  // DTH
      decimals: 18,
      name: 'DTH'
    },
    {
      address: addresses.ethereum.tokens.IONC,  // IONC
      decimals: 18,
      name: 'IONC'
    },
    {
      address: addresses.ethereum.tokens.nCash,  // nCash
      decimals: 18,
      name: 'nCash'
    },
    {
      address: addresses.ethereum.tokens.AXPR,  // AXPR
      decimals: 18,
      name: 'AXPR'
    },
    {
      address: addresses.ethereum.tokens.OMX,  // OMX
      decimals: 8,
      name: 'OMX'
    },
    {
      address: addresses.ethereum.tokens.ORION,  // ORION
      decimals: 18,
      name: 'ORION'
    },
    {
      address: addresses.ethereum.tokens.STAR,  // STAR
      decimals: 18,
      name: 'STAR'
    },
    {
      address: addresses.ethereum.tokens.SVD,  // SVD
      decimals: 18,
      name: 'SVD'
    },
    {
      address: addresses.ethereum.tokens.STX,  // STX
      decimals: 18,
      name: 'STX'
    },
    {
      address: addresses.ethereum.tokens.DOS,  // DOS
      decimals: 18,
      name: 'DOS'
    },
    {
      address: addresses.ethereum.tokens.ZSC,  // ZSC
      decimals: 18,
      name: 'ZSC'
    },
    {
      address: addresses.ethereum.tokens.UUU,  // UUU
      decimals: 18,
      name: 'UUU'
    },
    {
      address: addresses.ethereum.tokens.MNTP,  // MNTP
      decimals: 18,
      name: 'MNTP'
    },
    {
      address: addresses.ethereum.tokens.DIT,  // DIT
      decimals: 8,
      name: 'DIT'
    },
    {
      address: addresses.ethereum.tokens.BDG,  // BDG
      decimals: 18,
      name: 'BDG'
    },
    {
      address: addresses.ethereum.tokens.FUEL,  // FUEL
      decimals: 18,
      name: 'FUEL'
    },
    {
      address: addresses.ethereum.tokens.BETHER,  // BETHER
      decimals: 18,
      name: 'BETHER'
    },
    {
      address: addresses.ethereum.tokens.DONUT,  // DONUT
      decimals: 18,
      name: 'DONUT'
    },
    {
      address: addresses.ethereum.tokens.ETG,  // ETG
      decimals: 0,
      name: 'ETG'
    },
    {
      address: addresses.ethereum.tokens.ZORA,  // ZORA
      decimals: 9,
      name: 'ZORA'
    },
    {
      address: addresses.ethereum.tokens.QCH,  // QCH
      decimals: 18,
      name: 'QCH'
    },
    {
      address: addresses.ethereum.tokens.APC,  // APC
      decimals: 6,
      name: 'APC'
    },
    {
      address: addresses.ethereum.tokens.SWT,  // SWT
      decimals: 18,
      name: 'SWT'
    },
    {
      address: addresses.ethereum.tokens.IHT,  // IHT
      decimals: 18,
      name: 'IHT'
    },
    {
      address: addresses.ethereum.tokens.XIV,  // XIV
      decimals: 18,
      name: 'XIV'
    },
    {
      address: addresses.ethereum.tokens.GENE,  // GENE
      decimals: 8,
      name: 'GENE'
    },
    {
      address: addresses.ethereum.tokens.ELAND,  // ELAND
      decimals: 18,
      name: 'ELAND'
    },
    {
      address: addresses.ethereum.tokens.DEB,  // DEB
      decimals: 18,
      name: 'DEB'
    },
    {
      address: addresses.ethereum.tokens.BANCA,  // BANCA
      decimals: 18,
      name: 'BANCA'
    },
    {
      address: addresses.ethereum.tokens.MGO,  // MGO
      decimals: 8,
      name: 'MGO'
    },
    {
      address: addresses.ethereum.tokens.SENC,  // SENC
      decimals: 18,
      name: 'SENC'
    },
    {
      address: addresses.ethereum.tokens.ONG,  // ONG
      decimals: 18,
      name: 'ONG'
    },
    {
      address: addresses.ethereum.tokens.JET,  // JET
      decimals: 18,
      name: 'JET'
    },
    {
      address: addresses.ethereum.tokens.IND,  // IND
      decimals: 18,
      name: 'IND'
    },
    {
      address: addresses.ethereum.tokens.TSL,  // TSL
      decimals: 18,
      name: 'TSL'
    },
    {
      address: addresses.ethereum.tokens.BLUE,  // BLUE
      decimals: 8,
      name: 'BLUE'
    },
    {
      address: addresses.ethereum.tokens.Mars,  // Mars
      decimals: 18,
      name: 'Mars'
    },
    {
      address: addresses.ethereum.tokens.HAC,  // HAC
      decimals: 4,
      name: 'HAC'
    },
    {
      address: addresses.ethereum.tokens.NTK,  // NTK
      decimals: 18,
      name: 'NTK'
    },
    {
      address: addresses.ethereum.tokens.LMT,  // LMT
      decimals: 18,
      name: 'LMT'
    },
    {
      address: addresses.ethereum.tokens.CAPP,  // CAPP
      decimals: 2,
      name: 'CAPP'
    },
    {
      address: addresses.ethereum.tokens.LALA,  // LALA
      decimals: 18,
      name: 'LALA'
    },
    {
      address: addresses.ethereum.tokens.GPOOL,  // GPOOL
      decimals: 18,
      name: 'GPOOL'
    },
    {
      address: addresses.ethereum.tokens.DVD,  // DVD
      decimals: 18,
      name: 'DVD'
    },
    {
      address: addresses.ethereum.tokens.BBO,  // BBO
      decimals: 18,
      name: 'BBO'
    },
    {
      address: addresses.ethereum.tokens.BCV,  // BCV
      decimals: 8,
      name: 'BCV'
    },
    {
      address: addresses.ethereum.tokens.ZCO,  // ZCO
      decimals: 8,
      name: 'ZCO'
    },
    {
      address: addresses.ethereum.tokens.HYDRO,  // HYDRO
      decimals: 18,
      name: 'HYDRO'
    },
    {
      address: addresses.ethereum.tokens.BEE,  // BEE
      decimals: 18,
      name: 'BEE'
    },
    {
      address: addresses.ethereum.tokens.DAT,  // DAT
      decimals: 18,
      name: 'DAT'
    },
    {
      address: addresses.ethereum.tokens.ESD,  // ESD
      decimals: 18,
      name: 'ESD'
    },
    {
      address: addresses.ethereum.tokens.IFT,  // IFT
      decimals: 18,
      name: 'IFT'
    },
    {
      address: addresses.ethereum.tokens.BTR,  // BTR
      decimals: 18,
      name: 'BTR'
    },
    {
      address: addresses.ethereum.tokens.BCDN,  // BCDN
      decimals: 15,
      name: 'BCDN'
    },
    {
      address: addresses.ethereum.tokens.MX,  // MX
      decimals: 18,
      name: 'MX'
    },
    {
      address: addresses.ethereum.tokens.BPUNKS,  // BPUNKS
      decimals: 18,
      name: 'BPUNKS'
    },
    {
      address: addresses.ethereum.tokens.APYS,  // APYS
      decimals: 18,
      name: 'APYS'
    },
    {
      address: addresses.ethereum.tokens.MIS,  // MIS
      decimals: 18,
      name: 'MIS'
    },
    {
      address: addresses.ethereum.tokens.BNTY,  // BNTY
      decimals: 18,
      name: 'BNTY'
    },
    {
      address: addresses.ethereum.tokens.BAG,  // BAG
      decimals: 18,
      name: 'BAG'
    },
    {
      address: addresses.ethereum.tokens.ALN,  // ALN
      decimals: 18,
      name: 'ALN'
    },
    {
      address: addresses.ethereum.tokens.MAS,  // MAS
      decimals: 18,
      name: 'MAS'
    },
    {
      address: addresses.ethereum.tokens.TRIO,  // TRIO
      decimals: 18,
      name: 'TRIO'
    },
    {
      address: addresses.ethereum.tokens.HPAY,  // HPAY
      decimals: 18,
      name: 'HPAY'
    },
    {
      address: addresses.ethereum.tokens.ASTRO,  // ASTRO
      decimals: 18,
      name: 'ASTRO'
    },
    {
      address: addresses.ethereum.tokens.OTB,  // OTB
      decimals: 18,
      name: 'OTB'
    },
    {
      address: addresses.ethereum.tokens.DRT,  // DRT
      decimals: 8,
      name: 'DRT'
    },
    {
      address: addresses.ethereum.tokens.TRST,  // TRST
      decimals: 6,
      name: 'TRST'
    },
    {
      address: addresses.ethereum.tokens.ISLA,  // ISLA
      decimals: 18,
      name: 'ISLA'
    },
    {
      address: addresses.ethereum.tokens.ALT,  // ALT
      decimals: 18,
      name: 'ALT'
    },
    {
      address: addresses.ethereum.tokens.NFY,  // NFY
      decimals: 18,
      name: 'NFY'
    },
    {
      address: addresses.ethereum.tokens.WQT,  // WQT
      decimals: 18,
      name: 'WQT'
    },
    {
      address: addresses.ethereum.tokens.COB,  // COB
      decimals: 18,
      name: 'COB'
    },
    {
      address: addresses.ethereum.tokens.SNGLS,  // SNGLS
      decimals: 0,
      name: 'SNGLS'
    },
    {
      address: addresses.ethereum.tokens.VOX,  // VOX
      decimals: 18,
      name: 'VOX'
    },
    {
      address: addresses.ethereum.tokens.NBC,  // NBC
      decimals: 18,
      name: 'NBC'
    },
    {
      address: addresses.ethereum.tokens.CEN,  // CEN
      decimals: 18,
      name: 'CEN'
    },
    {
      address: addresses.ethereum.tokens.KNDC,  // KNDC
      decimals: 8,
      name: 'KNDC'
    },
    {
      address: addresses.ethereum.tokens.GEM,  // GEM
      decimals: 18,
      name: 'GEM'
    },
    {
      address: addresses.ethereum.tokens.PTT,  // PTT
      decimals: 18,
      name: 'PTT'
    },
    {
      address: addresses.ethereum.tokens.BERRY,  // BERRY
      decimals: 14,
      name: 'BERRY'
    },
    {
      address: addresses.ethereum.tokens.AUC,  // AUC
      decimals: 18,
      name: 'AUC'
    },
    {
      address: addresses.ethereum.tokens.HGT,  // HGT
      decimals: 8,
      name: 'HGT'
    },
    {
      address: addresses.ethereum.tokens.DBET,  // DBET
      decimals: 18,
      name: 'DBET'
    },
    {
      address: addresses.ethereum.tokens.DXT,  // DXT
      decimals: 8,
      name: 'DXT'
    },
    {
      address: addresses.ethereum.tokens.ROCK2,  // ROCK2
      decimals: 0,
      name: 'ROCK2'
    },
    {
      address: addresses.ethereum.tokens.LNC,  // LNC
      decimals: 18,
      name: 'LNC'
    },
    {
      address: addresses.ethereum.tokens.GUM,  // GUM
      decimals: 18,
      name: 'GUM'
    },
    {
      address: addresses.ethereum.tokens.EVE,  // EVE
      decimals: 18,
      name: 'EVE'
    },
    {
      address: addresses.ethereum.tokens.ITL,  // ITL
      decimals: 8,
      name: 'ITL'
    },
    {
      address: addresses.ethereum.tokens.iFUND,  // iFUND
      decimals: 18,
      name: 'iFUND'
    },
    {
      address: addresses.ethereum.tokens.FLUX,  // FLUX
      decimals: 18,
      name: 'FLUX'
    },
    {
      address: addresses.ethereum.tokens.TAP,  // TAP
      decimals: 18,
      name: 'TAP'
    },
    {
      address: addresses.ethereum.tokens.CMCT,  // CMCT
      decimals: 8,
      name: 'CMCT'
    },
    {
      address: addresses.ethereum.tokens.FLOT,  // FLOT
      decimals: 18,
      name: 'FLOT'
    },
    {
      address: addresses.ethereum.tokens.XBP,  // XBP
      decimals: 18,
      name: 'XBP'
    },
    {
      address: addresses.ethereum.tokens.CHART,  // CHART
      decimals: 18,
      name: 'CHART'
    },
    {
      address: addresses.ethereum.tokens.MIB,  // MIB
      decimals: 18,
      name: 'MIB'
    },
    {
      address: addresses.ethereum.tokens.BCUG,  // BCUG
      decimals: 18,
      name: 'BCUG'
    },
    {
      address: addresses.ethereum.tokens.TIX,  // TIX
      decimals: 18,
      name: 'TIX'
    },
    {
      address: addresses.ethereum.tokens.FACE,  // FACE
      decimals: 18,
      name: 'FACE'
    },
    {
      address: addresses.ethereum.tokens.EKT,  // EKT
      decimals: 8,
      name: 'EKT'
    },
    {
      address: addresses.ethereum.tokens.SIG,  // SIG
      decimals: 18,
      name: 'SIG'
    },
    {
      address: addresses.ethereum.tokens.ADEL,  // ADEL
      decimals: 18,
      name: 'ADEL'
    },
    {
      address: addresses.ethereum.tokens.DYT,  // DYT
      decimals: 18,
      name: 'DYT'
    },
    {
      address: addresses.ethereum.tokens.SPN,  // SPN
      decimals: 6,
      name: 'SPN'
    },
    {
      address: addresses.ethereum.tokens.POE,  // POE
      decimals: 8,
      name: 'POE'
    },
    {
      address: addresses.ethereum.tokens.ADI,  // ADI
      decimals: 18,
      name: 'ADI'
    },
    {
      address: addresses.ethereum.tokens.CRC,  // CRC
      decimals: 18,
      name: 'CRC'
    },
    {
      address: addresses.ethereum.tokens.IIC,  // IIC
      decimals: 18,
      name: 'IIC'
    },
    {
      address: addresses.ethereum.tokens.BITX,  // BITX
      decimals: 18,
      name: 'BITX'
    },
    {
      address: addresses.ethereum.tokens.CRED,  // CRED
      decimals: 18,
      name: 'CRED'
    },
    {
      address: addresses.ethereum.tokens.DEXG,  // DEXG
      decimals: 18,
      name: 'DEXG'
    },
    {
      address: addresses.ethereum.tokens.ALI,  // ALI
      decimals: 18,
      name: 'ALI'
    },
    {
      address: addresses.ethereum.tokens.YOP,  // YOP
      decimals: 8,
      name: 'YOP'
    },
    {
      address: addresses.ethereum.tokens.SS,  // SS
      decimals: 18,
      name: 'SS'
    },
    {
      address: addresses.ethereum.tokens.CNT,  // CNT
      decimals: 18,
      name: 'CNT'
    },
    {
      address: addresses.ethereum.tokens.PKG,  // PKG
      decimals: 18,
      name: 'PKG'
    },
    {
      address: addresses.ethereum.tokens.GOT,  // GOT
      decimals: 18,
      name: 'GOT'
    },
    {
      address: addresses.ethereum.tokens.TDP,  // TDP
      decimals: 18,
      name: 'TDP'
    },
    {
      address: addresses.ethereum.tokens.COVA,  // COVA
      decimals: 18,
      name: 'COVA'
    },
    {
      address: addresses.ethereum.tokens.INCO,  // INCO
      decimals: 18,
      name: 'INCO'
    },
    {
      address: addresses.ethereum.tokens.PRIX,  // PRIX
      decimals: 8,
      name: 'PRIX'
    },
    {
      address: addresses.ethereum.tokens.ERO,  // ERO
      decimals: 8,
      name: 'ERO'
    },
    {
      address: addresses.ethereum.tokens.VTX,  // VTX
      decimals: 18,
      name: 'VTX'
    },
    {
      address: addresses.ethereum.tokens.PROGE,  // PROGE
      decimals: 9,
      name: 'PROGE'
    },
    {
      address: addresses.ethereum.tokens.WFIL,  // WFIL
      decimals: 18,
      name: 'WFIL'
    },
    {
      address: addresses.ethereum.tokens.DLT,  // DLT
      decimals: 18,
      name: 'DLT'
    },
    {
      address: addresses.ethereum.tokens.SKIN,  // SKIN
      decimals: 6,
      name: 'SKIN'
    },
    {
      address: addresses.ethereum.tokens.ELY,  // ELY
      decimals: 18,
      name: 'ELY'
    },
    {
      address: addresses.ethereum.tokens.AMN,  // AMN
      decimals: 18,
      name: 'AMN'
    },
    {
      address: addresses.ethereum.tokens.EKO,  // EKO
      decimals: 18,
      name: 'EKO'
    },
    {
      address: addresses.ethereum.tokens.FLIXX,  // FLIXX
      decimals: 18,
      name: 'FLIXX'
    },
    {
      address: addresses.ethereum.tokens.HAND,  // HAND
      decimals: 0,
      name: 'HAND'
    },
    {
      address: addresses.ethereum.tokens.WILD,  // WILD
      decimals: 18,
      name: 'WILD'
    },
    {
      address: addresses.ethereum.tokens.SGT,  // SGT
      decimals: 18,
      name: 'SGT'
    },
    {
      address: addresses.ethereum.tokens.STQ,  // STQ
      decimals: 18,
      name: 'STQ'
    },
    {
      address: addresses.ethereum.tokens.RTE,  // RTE
      decimals: 18,
      name: 'RTE'
    },
    {
      address: addresses.ethereum.tokens.FXT,  // FXT
      decimals: 18,
      name: 'FXT'
    },
    {
      address: addresses.ethereum.tokens.TNS,  // TNS
      decimals: 18,
      name: 'TNS'
    },
    {
      address: addresses.ethereum.tokens.JS,  // JS
      decimals: 8,
      name: 'JS'
    },
    {
      address: addresses.ethereum.tokens.AIX,  // AIX
      decimals: 18,
      name: 'AIX'
    },
    {
      address: addresses.ethereum.tokens.TMT,  // TMT
      decimals: 18,
      name: 'TMT'
    },
    {
      address: addresses.ethereum.tokens.XPA,  // XPA
      decimals: 18,
      name: 'XPA'
    },
    {
      address: addresses.ethereum.tokens.NDX,  // NDX
      decimals: 18,
      name: 'NDX'
    },
    {
      address: addresses.ethereum.tokens.PYLNT,  // PYLNT
      decimals: 18,
      name: 'PYLNT'
    },
    {
      address: addresses.ethereum.tokens.renBCH,  // renBCH
      decimals: 8,
      name: 'renBCH'
    },
    {
      address: addresses.ethereum.tokens.LUN,  // LUN
      decimals: 18,
      name: 'LUN'
    },
    {
      address: addresses.ethereum.tokens.TBX,  // TBX
      decimals: 18,
      name: 'TBX'
    },
    {
      address: addresses.ethereum.tokens.OKS,  // OKS
      decimals: 18,
      name: 'OKS'
    },
    {
      address: addresses.ethereum.tokens.ELTCOIN,  // ELTCOIN
      decimals: 8,
      name: 'ELTCOIN'
    },
    {
      address: addresses.ethereum.tokens.IPL,  // IPL
      decimals: 18,
      name: 'IPL'
    },
    {
      address: addresses.ethereum.tokens.RULER,  // RULER
      decimals: 18,
      name: 'RULER'
    },
    {
      address: addresses.ethereum.tokens.SNR,  // SNR
      decimals: 18,
      name: 'SNR'
    },
    {
      address: addresses.ethereum.tokens.PPDEX,  // PPDEX
      decimals: 18,
      name: 'PPDEX'
    },
    {
      address: addresses.ethereum.tokens.GUPPY,  // GUPPY
      decimals: 3,
      name: 'GUPPY'
    },
    {
      address: addresses.ethereum.tokens.BKBT,  // BKBT
      decimals: 18,
      name: 'BKBT'
    },
    {
      address: addresses.ethereum.tokens.TOS,  // TOS
      decimals: 18,
      name: 'TOS'
    },
    {
      address: addresses.ethereum.tokens.NRP,  // NRP
      decimals: 8,
      name: 'NRP'
    },
    {
      address: addresses.ethereum.tokens.VSF,  // VSF
      decimals: 18,
      name: 'VSF'
    },
    {
      address: addresses.ethereum.tokens.MTX,  // MTX
      decimals: 18,
      name: 'MTX'
    },
    {
      address: addresses.ethereum.tokens.REX,  // REX
      decimals: 18,
      name: 'REX'
    },
    {
      address: addresses.ethereum.tokens.IPC,  // IPC
      decimals: 8,
      name: 'IPC'
    },
    {
      address: addresses.ethereum.tokens.TGAME,  // TGAME
      decimals: 18,
      name: 'TGAME'
    },
    {
      address: addresses.ethereum.tokens.CPAY,  // CPAY
      decimals: 0,
      name: 'CPAY'
    },
    {
      address: addresses.ethereum.tokens.DTRC,  // DTRC
      decimals: 18,
      name: 'DTRC'
    },
    {
      address: addresses.ethereum.tokens.WTL,  // WTL
      decimals: 18,
      name: 'WTL'
    },
    {
      address: addresses.ethereum.tokens.HUR,  // HUR
      decimals: 18,
      name: 'HUR'
    },
    {
      address: addresses.ethereum.tokens.SPI,  // SPI
      decimals: 18,
      name: 'SPI'
    },
    {
      address: addresses.ethereum.tokens.RNTB,  // RNTB
      decimals: 18,
      name: 'RNTB'
    },
    {
      address: addresses.ethereum.tokens.HORSE,  // HORSE
      decimals: 18,
      name: 'HORSE'
    },
    {
      address: addresses.ethereum.tokens.BUND,  // BUND
      decimals: 18,
      name: 'BUND'
    },
    {
      address: addresses.ethereum.tokens.IMX,  // IMX
      decimals: 18,
      name: 'IMX'
    },
    {
      address: addresses.ethereum.tokens.BTCONE,  // BTCONE
      decimals: 18,
      name: 'BTCONE'
    },
    {
      address: addresses.ethereum.tokens.WRC,  // WRC
      decimals: 6,
      name: 'WRC'
    },
    {
      address: addresses.ethereum.tokens.MASH,  // MASH
      decimals: 8,
      name: 'MASH'
    },
    {
      address: addresses.ethereum.tokens.XMCT,  // XMCT
      decimals: 18,
      name: 'XMCT'
    },
    {
      address: addresses.ethereum.tokens.DGTX,  // DGTX
      decimals: 18,
      name: 'DGTX'
    },
    {
      address: addresses.ethereum.tokens.ABX,  // ABX
      decimals: 18,
      name: 'ABX'
    },
    {
      address: addresses.ethereum.tokens.BOUTS,  // BOUTS
      decimals: 18,
      name: 'BOUTS'
    },
    {
      address: addresses.ethereum.tokens.TIC,  // TIC
      decimals: 8,
      name: 'TIC'
    },
    {
      address: addresses.ethereum.tokens.ITC,  // ITC
      decimals: 18,
      name: 'ITC'
    },
    {
      address: addresses.ethereum.tokens.YLC,  // YLC
      decimals: 8,
      name: 'YLC'
    },
    {
      address: addresses.ethereum.tokens.ORME,  // ORME
      decimals: 8,
      name: 'ORME'
    },
    {
      address: addresses.ethereum.tokens.DUO,  // DUO
      decimals: 18,
      name: 'DUO'
    },
    {
      address: addresses.ethereum.tokens.CCO,  // CCO
      decimals: 18,
      name: 'CCO'
    },
    {
      address: addresses.ethereum.tokens.XD,  // XD
      decimals: 18,
      name: 'XD'
    },
    {
      address: addresses.ethereum.tokens.CJT,  // CJT
      decimals: 18,
      name: 'CJT'
    },
    {
      address: addresses.ethereum.tokens.STAC,  // STAC
      decimals: 18,
      name: 'STAC'
    },
    {
      address: addresses.ethereum.tokens.OGO,  // OGO
      decimals: 18,
      name: 'OGO'
    },
    {
      address: addresses.ethereum.tokens.CYMT,  // CYMT
      decimals: 8,
      name: 'CYMT'
    },
    {
      address: addresses.ethereum.tokens.BON,  // BON
      decimals: 18,
      name: 'BON'
    },
    {
      address: addresses.ethereum.tokens.CTRT,  // CTRT
      decimals: 8,
      name: 'CTRT'
    },
    {
      address: addresses.ethereum.tokens.HQT,  // HQT
      decimals: 18,
      name: 'HQT'
    },
    {
      address: addresses.ethereum.tokens.DALC,  // DALC
      decimals: 8,
      name: 'DALC'
    },
    {
      address: addresses.ethereum.tokens.OWN,  // OWN
      decimals: 8,
      name: 'OWN'
    },
    {
      address: addresses.ethereum.tokens.OPT,  // OPT
      decimals: 18,
      name: 'OPT'
    },
    {
      address: addresses.ethereum.tokens.IBTC,  // IBTC
      decimals: 18,
      name: 'IBTC'
    },
    {
      address: addresses.ethereum.tokens.FOTA,  // FOTA
      decimals: 18,
      name: 'FOTA'
    },
    {
      address: addresses.ethereum.tokens.HOMI,  // HOMI
      decimals: 0,
      name: 'HOMI'
    },
    {
      address: addresses.ethereum.tokens.KIND,  // KIND
      decimals: 8,
      name: 'KIND'
    },
    {
      address: addresses.ethereum.tokens.FTXT,  // FTXT
      decimals: 8,
      name: 'FTXT'
    },
    {
      address: addresses.ethereum.tokens.EVN,  // EVN
      decimals: 18,
      name: 'EVN'
    },
    {
      address: addresses.ethereum.tokens.UBEX,  // UBEX
      decimals: 18,
      name: 'UBEX'
    },
    {
      address: addresses.ethereum.tokens.GST,  // GST
      decimals: 18,
      name: 'GST'
    },
    {
      address: addresses.ethereum.tokens.MEDIBIT,  // MEDIBIT
      decimals: 18,
      name: 'MEDIBIT'
    },
    {
      address: addresses.ethereum.tokens.HELP,  // HELP
      decimals: 18,
      name: 'HELP'
    },
    {
      address: addresses.ethereum.tokens.UCN,  // UCN
      decimals: 18,
      name: 'UCN'
    },
    {
      address: addresses.ethereum.tokens.SAT,  // SAT
      decimals: 8,
      name: 'SAT'
    },
    {
      address: addresses.ethereum.tokens.COU,  // COU
      decimals: 18,
      name: 'COU'
    },
    {
      address: addresses.ethereum.tokens.ETHV,  // ETHV
      decimals: 18,
      name: 'ETHV'
    },
    {
      address: addresses.ethereum.tokens.ZINC,  // ZINC
      decimals: 18,
      name: 'ZINC'
    },
    {
      address: addresses.ethereum.tokens.VRS,  // VRS
      decimals: 6,
      name: 'VRS'
    },
    {
      address: addresses.ethereum.tokens.ACTP,  // ACTP
      decimals: 8,
      name: 'ACTP'
    },
    {
      address: addresses.ethereum.tokens.FNTB,  // FNTB
      decimals: 8,
      name: 'FNTB'
    },
    {
      address: addresses.ethereum.tokens.BKX,  // BKX
      decimals: 18,
      name: 'BKX'
    },
    {
      address: addresses.ethereum.tokens.CRDT,  // CRDT
      decimals: 18,
      name: 'CRDT'
    },
    {
      address: addresses.ethereum.tokens.DATX,  // DATX
      decimals: 18,
      name: 'DATX'
    },
    {
      address: addresses.ethereum.tokens.VIKKY,  // VIKKY
      decimals: 8,
      name: 'VIKKY'
    },
    {
      address: addresses.ethereum.tokens.CCT,  // CCT
      decimals: 18,
      name: 'CCT'
    },
    {
      address: addresses.ethereum.tokens.VOISE,  // VOISE
      decimals: 8,
      name: 'VOISE'
    },
    {
      address: addresses.ethereum.tokens.SUR,  // SUR
      decimals: 8,
      name: 'SUR'
    },
    {
      address: addresses.ethereum.tokens.FAITH,  // FAITH
      decimals: 8,
      name: 'FAITH'
    },
    {
      address: addresses.ethereum.tokens.SWC,  // SWC
      decimals: 18,
      name: 'SWC'
    },
    {
      address: addresses.ethereum.tokens.FERA,  // FERA
      decimals: 18,
      name: 'FERA'
    },
    {
      address: addresses.ethereum.tokens.XNN,  // XNN
      decimals: 18,
      name: 'XNN'
    },
    {
      address: addresses.ethereum.tokens.BZNT,  // BZNT
      decimals: 18,
      name: 'BZNT'
    },
    {
      address: addresses.ethereum.tokens.REAL,  // REAL
      decimals: 18,
      name: 'REAL'
    },
    {
      address: addresses.ethereum.tokens.DOW,  // DOW
      decimals: 18,
      name: 'DOW'
    },
    {
      address: addresses.ethereum.tokens.QURO,  // QURO
      decimals: 18,
      name: 'QURO'
    },
    {
      address: addresses.ethereum.tokens.AI,  // AI
      decimals: 18,
      name: 'AI'
    },
    {
      address: addresses.ethereum.tokens.BUL,  // BUL
      decimals: 18,
      name: 'BUL'
    },
    {
      address: addresses.ethereum.tokens.AAA,  // AAA
      decimals: 18,
      name: 'AAA'
    },
    {
      address: addresses.ethereum.tokens.SMS,  // SMS
      decimals: 3,
      name: 'SMS'
    },
    {
      address: addresses.ethereum.tokens.EBTC,  // EBTC
      decimals: 8,
      name: 'EBTC'
    },
    {
      address: addresses.ethereum.tokens.DACC,  // DACC
      decimals: 6,
      name: 'DACC'
    },
    {
      address: addresses.ethereum.tokens.AGLT,  // AGLT
      decimals: 18,
      name: 'AGLT'
    },
    {
      address: addresses.ethereum.tokens.USDQ,  // USDQ
      decimals: 18,
      name: 'USDQ'
    },
    {
      address: addresses.ethereum.tokens.INVE,  // INVE
      decimals: 18,
      name: 'INVE'
    },
    {
      address: addresses.ethereum.tokens.DGD,  // DGD
      decimals: 9,
      name: 'DGD'
    },
    {
      address: addresses.ethereum.tokens.anyLTC,  // anyLTC
      decimals: 8,
      name: 'anyLTC'
    },
    {
      address: addresses.ethereum.tokens.THETA,  // THETA
      decimals: 18,
      name: 'THETA'
    },
    {
      address: addresses.ethereum.tokens.aAAVE,  // aAAVE
      decimals: 18,
      name: 'aAAVE'
    },
    {
      address: addresses.ethereum.tokens.stkAAVE,  // stkAAVE
      decimals: 18,
      name: 'stkAAVE'
    },
    {
      address: addresses.ethereum.tokens.FPI,  // FPI
      decimals: 18,
      name: 'FPI'
    },
    {
      address: addresses.ethereum.tokens.ALUSD,  // ALUSD
      decimals: 18,
      name: 'ALUSD'
    },
    {
      address: addresses.ethereum.tokens.BEAN,  // BEAN
      decimals: 6,
      name: 'BEAN'
    },
    {
      address: addresses.ethereum.tokens.FLEXUSD,  // FLEXUSD
      decimals: 18,
      name: 'FLEXUSD'
    },
    {
      address: addresses.ethereum.tokens.EUROC,  // EUROC
      decimals: 6,
      name: 'EUROC'
    },
    {
      address: addresses.ethereum.tokens.AGEUR,  // AGEUR
      decimals: 18,
      name: 'AGEUR'
    },
    {
      address: addresses.ethereum.tokens.DOLA,  // DOLA
      decimals: 18,
      name: 'DOLA'
    },
    {
      address: addresses.ethereum.tokens.RAI,  // RAI
      decimals: 18,
      name: 'RAI'
    },
    {
      address: addresses.ethereum.tokens.USX,  // USX
      decimals: 18,
      name: 'USX'
    },
    {
      address: addresses.ethereum.tokens.HOME,  // HOME
      decimals: 18,
      name: 'HOME'
    },
    {
      address: addresses.ethereum.tokens.SEUR,  // SEUR
      decimals: 18,
      name: 'SEUR'
    },
    {
      address: addresses.ethereum.tokens.PUSD,  // PUSD
      decimals: 18,
      name: 'PUSD'
    },
    {
      address: addresses.ethereum.tokens.XAI,  // XAI
      decimals: 18,
      name: 'XAI'
    },
    {
      address: addresses.ethereum.tokens.ZUSD,  // ZUSD
      decimals: 6,
      name: 'ZUSD'
    },
    {
      address: addresses.ethereum.tokens.FIAT,  // FIAT
      decimals: 18,
      name: 'FIAT'
    },
    {
      address: addresses.ethereum.tokens.UZD,  // UZD
      decimals: 18,
      name: 'UZD'
    }
];

module.exports = { 
  hotTokensETH,
  selectedTokensETH,
  stablecoinsETH,
  tokensETH
}
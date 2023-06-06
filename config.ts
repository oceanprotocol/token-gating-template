export type ConfigType = {
  language: string;
  translateLists: string[];
  mobileMaxWidth: number;
  tabletMaxWidth: number;
  ethMockPrice: number;
  oceanApp: {
    // URI of single metadata cache instance for all networks.
    // While ocean.js includes this value for each network as part of its ConfigHelper,
    // it is assumed to be the same for all networks.
    // In components can be accessed with the useMarketMetadata hook:
    // const { appConfig } = useMarketMetadata()
    // return appConfig.metadataCacheUri
    metadataCacheUri: string;

    // List of chainIds which metadata cache queries will return by default.
    // This preselects the Chains user preferences.
    chainIds: number[];

    // List of all supported chainIds. Used to populate the Chains user preferences list.
    chainIdsSupported: number[];

    infuraProjectId: string;

    defaultDatatokenTemplateIndex: number;
    // The ETH address the marketplace fee will be sent to.
    marketFeeAddress: string;
    // publisher market fee that is taken upon ordering an asset, it is an absolute value, it is declared on erc20 creation
    publisherMarketOrderFee: string;
    // fee recieved by the publisher market when a dt is bought from a fixed rate exchange, percent
    publisherMarketFixedSwapFee: string;

    // consume market fee that is taken upon ordering an asset, it is an absolute value, it is specified on order
    consumeMarketOrderFee: string;
    // fee recieved by the consume market when a dt is bought from a fixed rate exchange, percent
    consumeMarketFixedSwapFee: string;

    // Used for conversion display, can be whatever coingecko API supports
    // see: https://api.coingecko.com/api/v3/simple/supported_vs_currencies
    currencies: string[];

    // Tokens to fetch the spot prices from coingecko, against above currencies.
    // Refers to Coingecko API tokenIds.
    coingeckoTokenIds: string[];

    // Config for https://github.com/oceanprotocol/use-dark-mode
    darkModeConfig: {
      classNameDark: string;
      classNameLight: string;
      storageKey: string;
    };

    // Used to show or hide the fixed or free price options
    // tab to publishers during the price creation.
    allowFixedPricing: string;
    allowFreePricing: string;

    // Set the default privacy policy to initially display
    // this should be the slug of your default policy markdown file
    defaultPrivacyPolicySlug: string;

    // This enables / disables the use of a GDPR compliant
    // privacy preference center to manage cookies on the market
    // If set to true a gdpr.json file inside the content directory
    // is used to create and show a privacy preference center / cookie banner
    // To learn more about how to configure and use this, please refer to the readme
    privacyPreferenceCenter: string;
  };
  routes: {
    homepage: string;
    chatgptPrompts: string;
    midjourneyPrompts: string;
    challanges: string;
    ecosystem: string;
    profile: string;
    explorer: {
      ethMainnet: string;
      ethGoerli: string;
      polygon: string;
      mumbai: string;
      binance: string;
      moonriver: string;
      energyWebChain: string;
    };
  };
  network: {
    networkTokenDecimals: number;
    acceptedChainId: number;
    chains: {
      [key: number]: string;
    };
    rpcUrl: string;
    pleaseSelectNetwork: { [key: number]: string };
  };
  oceanNetwork: {
    contract: string;
    networkDecimals: number;
  };
  did: string;
  BackendOrderTimeBuffer: number;
};

const config: ConfigType = {
  language: 'en',
  translateLists: ['common'],
  mobileMaxWidth: 767,
  tabletMaxWidth: 1199,
  ethMockPrice: 1646.13,
  oceanApp: {
    // URI of single metadata cache instance for all networks.
    // While ocean.js includes this value for each network as part of its ConfigHelper,
    // it is assumed to be the same for all networks.
    // In components can be accessed with the useMarketMetadata hook:
    // const { appConfig } = useMarketMetadata()
    // return appConfig.metadataCacheUri
    metadataCacheUri:
      process.env.NEXT_PUBLIC_METADATACACHE_URI ||
      'https://v4.aquarius.oceanprotocol.com',

    // List of chainIds which metadata cache queries will return by default.
    // This preselects the Chains user preferences.
    chainIds: [1, 137, 56, 246, 1285],

    // List of all supported chainIds. Used to populate the Chains user preferences list.
    chainIdsSupported: [1, 137, 56, 246, 1285, 5, 80001],

    infuraProjectId: process.env.NEXT_PUBLIC_INFURA_PROJECT_ID || 'xxx',

    defaultDatatokenTemplateIndex: 2,
    // The ETH address the marketplace fee will be sent to.
    marketFeeAddress:
      process.env.NEXT_PUBLIC_MARKET_FEE_ADDRESS ||
      '0x9984b2453eC7D99a73A5B3a46Da81f197B753C8d',
    // publisher market fee that is taken upon ordering an asset, it is an absolute value, it is declared on erc20 creation
    publisherMarketOrderFee:
      process.env.NEXT_PUBLIC_PUBLISHER_MARKET_ORDER_FEE || '0',
    // fee recieved by the publisher market when a dt is bought from a fixed rate exchange, percent
    publisherMarketFixedSwapFee:
      process.env.NEXT_PUBLIC_PUBLISHER_MARKET_FIXED_SWAP_FEE || '0',

    // consume market fee that is taken upon ordering an asset, it is an absolute value, it is specified on order
    consumeMarketOrderFee:
      process.env.NEXT_PUBLIC_CONSUME_MARKET_ORDER_FEE || '0',
    // fee recieved by the consume market when a dt is bought from a fixed rate exchange, percent
    consumeMarketFixedSwapFee:
      process.env.NEXT_PUBLIC_CONSUME_MARKET_FIXED_SWAP_FEE || '0',

    // Used for conversion display, can be whatever coingecko API supports
    // see: https://api.coingecko.com/api/v3/simple/supported_vs_currencies
    currencies: [
      'EUR',
      'USD',
      'CAD',
      'GBP',
      'SGD',
      'HKD',
      'CNY',
      'JPY',
      'INR',
      'RUB',
      'ETH',
      'BTC',
      'LINK',
    ],

    // Tokens to fetch the spot prices from coingecko, against above currencies.
    // Refers to Coingecko API tokenIds.
    coingeckoTokenIds: ['ocean-protocol', 'h2o', 'ethereum', 'matic-network'],

    // Config for https://github.com/oceanprotocol/use-dark-mode
    darkModeConfig: {
      classNameDark: 'dark',
      classNameLight: 'light',
      storageKey: 'oceanDarkMode',
    },

    // Used to show or hide the fixed or free price options
    // tab to publishers during the price creation.
    allowFixedPricing: process.env.NEXT_PUBLIC_ALLOW_FIXED_PRICING || 'true',
    allowFreePricing: process.env.NEXT_PUBLIC_ALLOW_FREE_PRICING || 'true',

    // Set the default privacy policy to initially display
    // this should be the slug of your default policy markdown file
    defaultPrivacyPolicySlug: '/privacy/en',

    // This enables / disables the use of a GDPR compliant
    // privacy preference center to manage cookies on the market
    // If set to true a gdpr.json file inside the content directory
    // is used to create and show a privacy preference center / cookie banner
    // To learn more about how to configure and use this, please refer to the readme
    privacyPreferenceCenter:
      process.env.NEXT_PUBLIC_PRIVACY_PREFERENCE_CENTER || 'false',
  },
  routes: {
    homepage: '/homepage',
    chatgptPrompts: '/chatgpt-prompts',
    midjourneyPrompts: '/midjourney-prompts',
    challanges: '/challanges',
    ecosystem: '/ecosystem',
    profile: '/profile',
    explorer: {
      ethMainnet: 'https://etherscan.io/address/',
      ethGoerli: 'https://goerli.etherscan.io/address/',
      polygon: 'https://polygonscan.com/address/',
      mumbai: 'https://mumbai.polygonscan.com/address/',
      binance: 'https://bscscan.com/address/',
      moonriver: 'https://moonriver.moonscan.io/address/',
      energyWebChain: 'https://explorer.energyweb.org/address/',
    },
  },
  network: {
    networkTokenDecimals: 18,
    acceptedChainId:
      parseInt(process.env.NEXT_PUBLIC_ACCEPTED_CHAIN_ID || '0', 10) || 80001,
    chains: {
      137: 'Polygon Mainnet',
      80001: 'Mumbai Testnet',
    },
    rpcUrl:
      process.env.NEXT_PUBLIC_RPC_URL ||
      'https://matic-mumbai.chainstacklabs.com/',
    pleaseSelectNetwork: {
      137: 'Please select Polygon Mainnet from wallet.',
      80001: 'Please select Mumbai Testnet from wallet.',
    },
  },
  oceanNetwork: {
    contract:
      process.env.NEXT_PUBLIC_OCEAN_CONTRACT ||
      '0xd8992Ed72C445c35Cb4A2be468568Ed1079357c8',
    networkDecimals: 18,
  },
  did: 'did:op:2497bdb5c4eed690bfb47f81d3d37d9cc6aaf2a05527a392d622396854372a92',
  BackendOrderTimeBuffer: process.env.NEXT_PUBLIC_BACKEND_ORDER_TIME_BUFFER
    ? parseInt(process.env.NEXT_PUBLIC_BACKEND_ORDER_TIME_BUFFER, 10)
    : 10000,
};

export default config;

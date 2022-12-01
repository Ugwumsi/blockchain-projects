require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()


const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 31337,
      blockConfirmations: 1,
    },
    goerli: {
      chainId: 5,
      blockConfimations: 6,
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      saveDeployments: true,
    }
  },
  gasReporter: {
    enabled: false,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    // coinmarketcap: process.env.COINMARKETCAP_API_KEY,
},
  solidity: "0.8.8",
  namedAccounts: {
    deployer: {
      default: 0,
      1: 0
    },
    player: {
        default: 1,
    },
    
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  etherscan: {
    apiKey: {
      goerli: ETHERSCAN_API_KEY
    },
  //   customChains: [
  //     {
  //         network: "goerli",
  //         chainId: 5,
  //         urls: {
  //             apiURL: `https://api-goerli.etherscan.io/${ETHERSCAN_API_KEY}`,
  //             browserURL: "https://goerli.etherscan.io",
  //         },
  //     },
  // ],
  },
  mocha: {
    timeout: 500000, //300 Seconds
  },
};

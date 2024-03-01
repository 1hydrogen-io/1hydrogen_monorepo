import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import * as dotenv from 'dotenv'
dotenv.config({ path: __dirname + '/.env' })

const config: HardhatUserConfig = {
  //solidity: "0.8.19",
  networks: {
    hardhat: {},
    base: {
      url: 'https://go.getblock.io/d87f48410c844ae2b536597ac2cbb749',
      accounts: [process.env.PR_KEY || '']
    },
    basetest: {
      url: 'https://base-goerli.public.blastapi.io',
      accounts: [process.env.PR_KEY || '']
    },
    optest: {
      url: 'https://polygon-mumbai-infura.wallet.coinbase.com?targetName=optimism-goerli',
      accounts: [process.env.PR_KEY || '']
    },
    baobab: {
      url: 'https://public-en-baobab.klaytn.net',
      accounts: [process.env.PR_KEY || '']
    },
    cypress: {
      url: 'https://public-en-cypress.klaytn.net',
      accounts: [process.env.PR_KEY || '']
    },
    blastTest: {
      url: 'https://sepolia.blast.io',
      accounts: [process.env.PR_KEY || '']
    },
    blast: {
      url: 'https://patient-green-ensemble.blast-mainnet.quiknode.pro/809fbaf16dafbe18f747d508686089eaffb96f59',
      accounts: [process.env.PR_KEY || ''],
      gas: 100000000
    }
  },
  solidity: {
    version: '0.8.20'
  },
  paths: {
    sources: './src',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts'
  },
  mocha: {
    timeout: 40000
  },
  etherscan: {
    apiKey: {
      base: process.env.ETHERSCAN_API_KEY || '',
      baseGoerli: process.env.ETHERSCAN_API_KEY || '',
      blasttest: 'blast_sepolia',
      blast: process.env.ETHERSCAN_API_KEY || ''
    },
    customChains: [
      {
        network: 'blasttest',
        chainId: 168587773,
        urls: {
          apiURL: 'https://api.routescan.io/v2/network/testnet/evm/168587773/etherscan',
          browserURL: 'https://testnet.blastscan.io'
        }
      },
      {
        network: 'blast',
        chainId: 81457,
        urls: {
          apiURL: 'https://api.blastscan.io/api',
          browserURL: 'https://blastscan.io'
        }
      }
    ]
  }

  // etherscan: {
  //   apiKey: process.env.ETHERSCAN_API_KEY || ''
  // }
}

export default config

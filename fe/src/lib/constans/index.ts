import {usdbAbi} from "@/lib/contracts/abis/usdb";

export const menus = [
  {lable: 'STAKE & MINT', url: '/stake-mint'},
  {lable: 'REPAY & UNSTAKE', url: '/repay-unstake'},
  {lable: 'hsETH STAKING', url: '/hseth-staking'},
  {lable: 'hPOINTS', url: '/h-points'},

]

export const socials = [
  {name: 'facebook', url: '#'},
  {name: 'medium', url: '#'},
  {name: 'telegram', url: '#'},
  {name: 'x', url: '#'},
  {name: 'discord', url: '#'},
]

export const CONTRACTS = {
  usdb: {
    address: '0x4200000000000000000000000000000000000022' as `0x${string}`,
    abi: usdbAbi
  },
}

export const NUMBER_PATTERN = '/^[0-9]*\.?[0-9]*$/';
export const parseNumber = (val: string) => val.replace(/^\$/, '')


export const footerData = [
  {title: 'What is Hydrogen?', des: 'Hydrogen Protocol is the first liquid staking solution on Blast, powered by native yield functionality, and innovating the LSDfi space via integrating DAPP staking as collateral for LSD mint. For a detailed explanation of how Hydrogen works, please refer to (gitbook link).', link: ''},
  {title: 'What are hPoints?', des: `hPoints are used for the upcoming airdrop of Hydrogen Protocol native token $HH.
  You can earn hPoints by doing the following actions - Supplying ETH/USDB, Staking and Locking hsETH/hsUSDB. For a detailed explanation of how hPoints are calculated, please refer to `, link: 'https://1hydrogen.io/h-points'},
  {title: 'What is hsETH/hsUSDB?', des: `hsETH is a Liquid Staking Token that you can mint after staking any amount of ETH on Hydrogen Protocol with a 1:1 ratio. For example, if you stake 1 ETH, you can mint 1hsETH. Same process can be completed with USDB.`, link: ''},
  {title: 'What is Liquid Staking?', des:`Liquid staking enables users to stake their native tokens without the need to lock them up for a specific period of time. This is accomplished by providing users with a liquid token in exchange for their staked tokens. The liquid token can then be used in various DeFi applications, including lending and borrowing. When users want to withdraw their tokens instantly, they can do so by swapping the liquid token for the native token on a decentralized exchange (DEX).`, link:''},
  {title: 'Why is Hydrogen on Blast?', des:`We've decided to build on Blast, because it has proven to be a liquidity blackhole with $1.5B bridged and it offers an interesting opportunity to innovate on the LSDfi concept via native yield.`, link:''},
  // {title: 'What is hsETH/hsUSDB?', des:`hsETH is a Liquid Staking Token that you can mint after staking any amount of ETH on Hydrogen Protocol with a 1:1 ratio. For example, if you stake 1 ETH, you can mint 1hsETH. Same process can be completed with USDB.`, link:''},
  {title: 'Are there any costs to use Hydrogen Protocol?', des:`The only cost you will incur using Hydrogen Protocol is the cost of gas fees from Blast Blockchain. Using DAPPxLSD, minting hsETH/hsUSDB tokens via staking on other platforms will have a small fee in the future.`, link:''},
]

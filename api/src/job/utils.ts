import { Contract, JsonRpcProvider, ethers } from 'ethers'
import { DATA_FEED, RPC_URL, STAKING_ADDRESS, VAULT_ADDRESS } from '../app.settings'
import { abis as vaultAbis } from '../abis/vault'
import { abis as stakingAbis } from '../abis/staking'
import { dataFeedAbis } from 'src/abis/datafeed'

export function createContract(contractAddress: string, abis: ethers.InterfaceAbi) {
  const provider = new JsonRpcProvider(RPC_URL)
  return new Contract(contractAddress, abis, provider)
}

//get balance of wallet from: vault, usdb vault, staking, usdb staking
export async function balance(wallet: string) {
  const vault = createContract(VAULT_ADDRESS, vaultAbis)
  const ethStaked = await vault.availableBalance(wallet)
  const staking = createContract(STAKING_ADDRESS, stakingAbis)

  const stakedInfors: any[] = await staking.stakedInfors(wallet)
  const hsEthNoLock = stakedInfors
    .filter((f) => f.package == 0)
    .reduce((t, v) => (t += v.amount), 0)

  const hsEth30 = stakedInfors.filter((f) => f.package == 1).reduce((t, v) => (t += v.amount), 0)
  const hsEth90 = stakedInfors.filter((f) => f.package == 1).reduce((t, v) => (t += v.amount), 0)
  const hsEth180 = stakedInfors.filter((f) => f.package == 1).reduce((t, v) => (t += v.amount), 0)

  return {
    ethStaked: ethStaked || 0,
    hsEthNoLock: hsEthNoLock || 0,
    hsEth30: hsEth30 || 0,
    hsEth90: hsEth90 || 0,
    hsEth180: hsEth180 || 0
  }
}

/**
 * Price in usd
 * @returns eth price in usd
 */
export async function ethPrice() {
  const contract = new Contract(
    DATA_FEED,
    dataFeedAbis,
    new JsonRpcProvider('https://mainnet.base.org')
  )
  const price = await contract.latestAnswer()
  return price / 10 ** (await contract.decimals())
}

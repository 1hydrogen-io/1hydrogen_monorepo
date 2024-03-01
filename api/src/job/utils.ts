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
  const staking = createContract(STAKING_ADDRESS, stakingAbis)

  const ethStaked = await vault.availableBalance(wallet)
  const stakedInfors: any[] = await staking.stakedInfors(wallet)
  const hsEthNoLock = stakedInfors
    .filter((f) => f.package == 0)
    .reduce((t, v) => (t += v.amount), 0)

  const hsEth30 = stakedInfors.filter((f) => f.package == 1).reduce((t, v) => (t += v.amount), 0)
  const hsEth90 = stakedInfors.filter((f) => f.package == 2).reduce((t, v) => (t += v.amount), 0)
  const hsEth180 = stakedInfors.filter((f) => f.package == 3).reduce((t, v) => (t += v.amount), 0)

  const usdbVault = createContract(VAULT_ADDRESS, vaultAbis)
  const usdbStaking = createContract(STAKING_ADDRESS, stakingAbis)

  const usdbStaked = await usdbVault.availableBalance(wallet)
  const usdbStakedInfors: any[] = await usdbStaking.stakedInfors(wallet)
  const hsUsdbNoLock = usdbStakedInfors
    .filter((f) => f.package == 0)
    .reduce((t, v) => (t += v.amount), 0)

  const hsUsdb30 = usdbStakedInfors
    .filter((f) => f.package == 1)
    .reduce((t, v) => (t += v.amount), 0)
  const hsUsdb90 = usdbStakedInfors
    .filter((f) => f.package == 2)
    .reduce((t, v) => (t += v.amount), 0)
  const hsUsdb180 = usdbStakedInfors
    .filter((f) => f.package == 3)
    .reduce((t, v) => (t += v.amount), 0)
  return {
    ethStaked: ethStaked || 0,
    hsEthNoLock: hsEthNoLock || 0,
    hsEth30: hsEth30 || 0,
    hsEth90: hsEth90 || 0,
    hsEth180: hsEth180 || 0,

    usdbStaked: usdbStaked || 0,
    hsUsdbNoLock: hsUsdbNoLock || 0,
    hsUsdb30: hsUsdb30 || 0,
    hsUsdb90: hsUsdb90 || 0,
    hsUsdb180: hsUsdb180 || 0
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
  const decimals = await contract.decimals()
  return Number(price / BigInt(10 ** Number(decimals)))
}

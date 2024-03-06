import {
  Contract,
  Interface,
  InterfaceAbi,
  JsonRpcProvider,
  formatEther,
  formatUnits,
  parseUnits
} from 'ethers'
import { readFile } from 'fs/promises'
import { join } from 'path'
import {
  DATA_FEED,
  RPC_URL,
  STAKING_ADDRESS,
  USDB_STAKING_ADDRESS,
  USDB_VAULT_ADDRESS,
  VAULT_ADDRESS
} from './app.settings'
import { IEventData } from './app.types'
import { dataFeedAbis } from './abis/datafeed'
import { abis as vaultAbis } from './abis/vault'
import { abis as stakingAbis } from './abis/staking'

export async function abis(name: string) {
  const path = join(__dirname, '..', 'abis', `${name}.json`)
  return JSON.parse(await readFile(path, 'utf8'))
}

export async function transactionReceipt(hash: string) {
  const provider = new JsonRpcProvider(RPC_URL)

  return await provider.getTransactionReceipt(hash)
}

export async function getEvent(iface: Interface, hash: string): Promise<IEventData> {
  const provider = new JsonRpcProvider(RPC_URL)
  const tx: any = await provider.getTransactionReceipt(hash)
  const eventData = iface.parseLog(tx.logs[0])?.args as unknown as IEventData
  return eventData
}

export function formatShard(value: bigint) {
  return formatUnits(value, 8)
}

export function parseShard(value: number) {
  return parseUnits(value.toString(), 8)
}

export function createContract(contractAddress: string, abis: InterfaceAbi) {
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

  const usdbVault = createContract(USDB_VAULT_ADDRESS, vaultAbis)
  const usdbStaking = createContract(USDB_STAKING_ADDRESS, stakingAbis)

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
    ethStaked: formatBalance(ethStaked) || 0,
    hsEthNoLock: formatBalance(hsEthNoLock) || 0,
    hsEth30: formatBalance(hsEth30) || 0,
    hsEth90: formatBalance(hsEth90) || 0,
    hsEth180: formatBalance(hsEth180) || 0,

    usdbStaked: formatBalance(usdbStaked) || 0,
    hsUsdbNoLock: formatBalance(hsUsdbNoLock) || 0,
    hsUsdb30: formatBalance(hsUsdb30) || 0,
    hsUsdb90: formatBalance(hsUsdb90) || 0,
    hsUsdb180: formatBalance(hsUsdb180) || 0
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

function formatBalance(balance: bigint) {
  return Number(formatEther(balance))
}

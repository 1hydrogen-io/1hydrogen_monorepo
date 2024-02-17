import { Interface, JsonRpcProvider, formatUnits, parseUnits } from 'ethers'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { RPC_URL } from './app.settings'
import { IEventData } from './app.types'

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

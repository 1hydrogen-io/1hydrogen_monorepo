import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { transactionReceipt } from '../app.utils'
import { Interface, verifyMessage } from 'ethers'
import { abis as vaultAbis } from '../abis/vault'
import { IStakingStaked, IVaultStaked } from '../app.types'
import {
  STAKING_ADDRESS,
  USDB_STAKING_ADDRESS,
  USDB_VAULT_ADDRESS,
  VAULT_ADDRESS
} from '../app.settings'
import { abis as stakingAbis } from '../abis/staking'
import { randomUUID } from 'crypto'
import { ReferralJoinDto } from './dto/referralJoin.dto'

@Injectable()
export class WalletService {
  constructor(private readonly prismaService: PrismaService) {}

  async point(address: string) {
    const player = await this.prismaService.wallet.findUnique({ where: { address } })
    if (player) {
      const members = await this.prismaService.wallet.findMany({
        where: { joinedCode: player.referralCode }
      })
      return { ...player, members: members.length }
    }
    return {}
  }

  async leaderBoard(take: number) {
    const wallets = await this.prismaService.wallet.findMany()
    const results = await this.prismaService.wallet.findMany({ orderBy: { point: 'desc' }, take })
    return { leaderboard: results, totalUser: wallets.length }
  }

  async createOrUpdate(tx: string, joinedCode: string) {
    const txReceipt = await transactionReceipt(tx)
    const contract = txReceipt.to
    if (
      contract != VAULT_ADDRESS &&
      contract != STAKING_ADDRESS &&
      contract != USDB_VAULT_ADDRESS &&
      contract != USDB_STAKING_ADDRESS
    )
      throw new HttpException('invalid tx', HttpStatus.BAD_REQUEST)

    await this.prismaService.transaction.create({
      data: { txHash: txReceipt.hash, sender: txReceipt.from, contract }
    })

    let staker: string
    if (contract == VAULT_ADDRESS || contract == USDB_VAULT_ADDRESS) {
      const iface = new Interface(vaultAbis)
      let logIndex = 0
      if (contract == USDB_VAULT_ADDRESS) logIndex = 2
      const eventData = iface.parseLog(txReceipt.logs[logIndex])?.args as unknown as IVaultStaked
      staker = eventData.staker
    } else if (contract == STAKING_ADDRESS || contract == USDB_STAKING_ADDRESS) {
      const iface = new Interface(stakingAbis)
      const eventData = iface.parseLog(txReceipt.logs[2])?.args as unknown as IStakingStaked
      staker = eventData.staker
    }

    let wallet = await this.prismaService.wallet.findUnique({ where: { address: staker } })
    if (!wallet) {
      let refCode = randomUUID()
      while (await this.prismaService.wallet.findUnique({ where: { referralCode: refCode } }))
        refCode = randomUUID()

      const referrer = await this.prismaService.wallet.findUnique({
        where: { referralCode: joinedCode }
      })

      wallet = await this.prismaService.wallet.create({
        data: {
          address: staker,
          latestTx: txReceipt.hash,
          referralCode: refCode,
          joinedCode: referrer ? joinedCode : undefined
        }
      })
    }

    return wallet
  }

  async player(wallet: string) {
    const player = await this.prismaService.wallet.findUnique({ where: { address: wallet } })
    if (player) {
      const members = await this.prismaService.wallet.findMany({
        where: { joinedCode: player.referralCode }
      })
      return { ...player, members: members.length }
    }
    return {}
  }

  async senderFromSignature(data: ReferralJoinDto) {
    //check owner account
    //verify sign message
    const strMessage = { wallet: data.wallet, joinCode: data.joinCode }
    const sender = verifyMessage(JSON.stringify(strMessage), data.signature)
    return sender
  }

  async create(staker: string, joinedCode: string) {
    let wallet = await this.prismaService.wallet.findUnique({ where: { address: staker } })
    if (!wallet) {
      let refCode = randomUUID()
      while (await this.prismaService.wallet.findUnique({ where: { referralCode: refCode } }))
        refCode = randomUUID()

      const referrer = await this.prismaService.wallet.findUnique({
        where: { referralCode: joinedCode }
      })

      wallet = await this.prismaService.wallet.create({
        data: {
          address: staker,
          latestTx: refCode,
          referralCode: refCode,
          joinedCode: referrer && joinedCode ? joinedCode : undefined
        }
      })
    }

    return wallet
  }
}

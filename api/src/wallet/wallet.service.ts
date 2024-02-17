import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { transactionReceipt } from '../app.utils'
import { Interface, parseEther } from 'ethers'
import { abis as vaultAbis } from '../abis/vault'
import { IStakingStaked, IVaultStaked } from '../app.types'
import { STAKING_ADDRESS, VAULT_ADDRESS } from '../app.settings'
import { abis as stakingAbis } from '../abis/staking'

@Injectable()
export class WalletService {
  constructor(private readonly prismaService: PrismaService) {}

  async point(address: string) {
    return await this.prismaService.wallet.findUnique({ where: { address } })
  }

  async leaderBoard(take: number) {
    return await this.prismaService.wallet.findMany({ orderBy: { point: 'desc' }, take })
  }

  async createOrUpdate(tx: string) {
    const txReceipt = await transactionReceipt(tx)
    const contract = txReceipt.to
    console.log('tx', txReceipt.logs)
    if (contract != VAULT_ADDRESS && contract != STAKING_ADDRESS)
      throw new HttpException('invalid tx', HttpStatus.BAD_REQUEST)
    await this.prismaService.transaction.create({
      data: { txHash: txReceipt.hash, sender: txReceipt.from, contract }
    })
    let supplyPoint = 0
    let stakingPoint = 0

    let staker: string
    if (contract == VAULT_ADDRESS) {
      const iface = new Interface(vaultAbis)
      const eventData = iface.parseLog(txReceipt.logs[0])?.args as unknown as IVaultStaked
      staker = eventData.staker
      supplyPoint = Math.floor(Number(eventData.amount / parseEther('0.01'))) * 0.01
    } else if (contract == STAKING_ADDRESS) {
      const iface = new Interface(stakingAbis)
      const eventData = iface.parseLog(txReceipt.logs[2])?.args as unknown as IStakingStaked
      staker = eventData.staker
      stakingPoint = Math.floor(Number(eventData.amount / parseEther('0.01'))) * 1
      if (eventData.package == 1)
        //+20% lock 1M
        stakingPoint += (stakingPoint * 20) / 100
      if (eventData.package == 2)
        //+80% lock 3M
        stakingPoint += (stakingPoint * 80) / 100
      if (eventData.package == 3)
        //+200% lock 6M
        stakingPoint += (stakingPoint * 200) / 100
    }
    const point = stakingPoint + supplyPoint

    return await this.prismaService.wallet.upsert({
      where: { address: staker },
      update: {
        supplyPoint: { increment: supplyPoint },
        stakingPoint: { increment: stakingPoint },
        point: { increment: point }
      },
      create: { address: staker, supplyPoint, stakingPoint, point, latestTx: txReceipt.hash }
    })
  }
}

import { PrismaService } from '../prisma.service'
import { Point } from './type'

export async function wallets() {
  const prismaService = new PrismaService()
  const today = new Date()
  const date = `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${today.getDate()}T00:00:00.000Z`
  return await prismaService.wallet.findMany({ where: { updatedTime: { lt: date } } })
}

export async function updatePoint(point: Point, prismaService: PrismaService) {
  const { supplyPoint, stakingPoint, referralPoint, wallet } = point
  await prismaService.wallet.update({
    where: { address: wallet },
    data: {
      supplyPoint: { increment: supplyPoint },
      stakingPoint: { increment: stakingPoint },
      referralPoint: { increment: referralPoint },
      point: { increment: supplyPoint + stakingPoint + referralPoint },
      updatedTime: point.updatedTime
    }
  })
}

export async function walletByRefCode(refCode: string) {
  const prismaService = new PrismaService()
  return await prismaService.wallet.findUnique({ where: { referralCode: refCode } })
}

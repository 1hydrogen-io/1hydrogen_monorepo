import { PrismaService } from '../prisma.service'
import { Point } from './type'

export async function wallets() {
  const prismaService = new PrismaService()
  const today = new Date()
  return await prismaService.wallet.findMany({ where: { updatedTime: { lt: today } } })
}

export async function updatePoint(point: Point) {
  const prismaService = new PrismaService()
  const { supplyPoint, stakingPoint, referralPoint, wallet } = point
  await prismaService.wallet.update({
    where: { address: wallet },
    data: {
      supplyPoint: { increment: supplyPoint },
      stakingPoint: { increment: stakingPoint },
      referralPoint: { increment: referralPoint },
      point: { increment: supplyPoint + stakingPoint + referralPoint }
    }
  })
}

export async function walletByRefCode(refCode: string) {
  const prismaService = new PrismaService()
  return await prismaService.wallet.findUnique({ where: { referralCode: refCode } })
}

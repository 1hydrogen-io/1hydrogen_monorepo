import { PrismaService } from '../prisma.service'
import { Point } from './type'

export async function wallets() {
  const prismaService = new PrismaService()
  return await prismaService.wallet.findMany()
}

export async function updatePoint(point: Point) {
  const prismaService = new PrismaService()
  await prismaService.wallet.update({
    where: { address: point.wallet },
    data: { supplyPoint: point.supplyPoint, stakingPoint: point.stakingPoint, point: point.point }
  })
}

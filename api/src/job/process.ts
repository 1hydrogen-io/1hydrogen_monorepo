import { updatePoint, wallets } from './service'
import { Point } from './type'
import { balance, ethPrice } from './utils'

export async function calculatePoint() {
  console.log('start...')
  const walletList = await wallets()
  const price = await ethPrice()

  const points: Point[] = []
  for (let i = 0; i < walletList.length; i++) {
    const wallet = walletList[i]
    const { ethStaked, hsEthNoLock, hsEth30, hsEth90, hsEth180 } = await balance(wallet.address)

    //eth staked
    const supplyPoint = price * ethStaked

    //hseth no lock: 2 point/day
    let stakingPoint = hsEthNoLock * ethStaked * 2

    //hsEth30 lock: 4 point/day
    stakingPoint += hsEth30 * ethStaked * 4

    //hsEth90 lock: 8 point/day
    stakingPoint += hsEth90 * ethStaked * 8

    //hsEth180 lock: 12 point/day
    stakingPoint += hsEth180 * ethStaked * 12

    const point = supplyPoint + stakingPoint
    points.push({ wallet: wallet.address, point, supplyPoint, stakingPoint })
  }

  //update db
  for (let i = 0; i < points.length; i++) {
    await updatePoint(points[i])
  }
}

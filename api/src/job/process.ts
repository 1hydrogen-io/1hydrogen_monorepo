import { updatePoint, wallets } from './service'
import { Balance, Point } from './type'
import { balance, ethPrice } from './utils'

export async function calculatePoint() {
  console.log('start...')
  const walletList = await wallets()
  const price = await ethPrice()
  let walletCount = walletList.length

  const points: Point[] = []
  for (let i = 0; i < walletList.length; i++) {
    const wallet = walletList[i]
    const walletBalance: Balance = await balance(wallet.address)

    //eth staked
    let supplyPoint = price * walletBalance.ethStaked
    //hseth no lock: 2 point/day
    let stakingPoint = walletBalance.hsEthNoLock * price * 2
    //hsEth30 lock: 4 point/day
    stakingPoint += walletBalance.hsEth30 * price * 4
    //hsEth90 lock: 8 point/day
    stakingPoint += walletBalance.hsEth90 * price * 8
    //hsEth180 lock: 12 point/day
    stakingPoint += walletBalance.hsEth180 * price * 12

    //usdb staked
    supplyPoint += walletBalance.usdbStaked
    //hsusdb no lock: 2 point/day
    stakingPoint += walletBalance.hsUsdbNoLock * 2
    //hsusdb30 lock: 4 point/day
    stakingPoint += walletBalance.hsUsdb30 * 4
    //hsusdb90 lock: 8 point/day
    stakingPoint += walletBalance.hsUsdb90 * 8
    //hsusdb180 lock: 12 point/day
    stakingPoint += walletBalance.hsUsdb180 * 12

    const point = supplyPoint + stakingPoint
    points.push({ wallet: wallet.address, point, supplyPoint, stakingPoint })
    console.log(walletCount--)
  }

  //update db
  for (let i = 0; i < points.length; i++) {
    await updatePoint(points[i])
  }

  console.log('finish')
}

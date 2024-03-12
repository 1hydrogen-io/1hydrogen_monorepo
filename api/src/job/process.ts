import { updatePoint, walletByRefCode, wallets } from './service'
import { Balance } from './type'
import { balance, ethPrice } from '../app.utils'
import { PrismaService } from 'src/prisma.service'

export async function calculatePoint() {
  console.log('start...')
  const walletList = await wallets()
  const price = await ethPrice()
  let walletCount = walletList.length
  const tday = new Date()
  const prismaService = new PrismaService()

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

    //referral point
    if (wallet.joinedCode) {
      const referrer = await walletByRefCode(wallet.joinedCode)
      await updatePoint(
        {
          wallet: referrer.address,
          supplyPoint: 0,
          stakingPoint: 0,
          referralPoint: ((stakingPoint + supplyPoint) * 25) / 100,
          updatedTime: tday
        },
        prismaService
      )
    }

    await updatePoint(
      {
        wallet: wallet.address,
        supplyPoint,
        stakingPoint,
        referralPoint: 0,
        updatedTime: tday
      },
      prismaService
    )
    console.log(walletCount--)
  }

  console.log('finish')
}

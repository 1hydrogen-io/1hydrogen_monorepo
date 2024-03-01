export interface Point {
  wallet: string
  point: number
  supplyPoint: number
  stakingPoint: number
}

export interface Balance {
  ethStaked: number
  hsEthNoLock: number
  hsEth30: number
  hsEth90: number
  hsEth180: number

  usdbStaked: number
  hsUsdbNoLock: number
  hsUsdb30: number
  hsUsdb90: number
  hsUsdb180: number
}

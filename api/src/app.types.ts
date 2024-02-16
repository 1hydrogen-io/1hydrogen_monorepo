export interface IVaultStaked {
  staker: string
  amount: bigint
}

export interface IEventData {
  eventData: IVaultStaked
}

export interface IStakingStaked {
  staker: string
  amount: bigint
  package: number
}

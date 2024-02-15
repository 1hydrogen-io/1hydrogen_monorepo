export interface IStakedInfo {
  index: number;
  amount: number;
  startTime: number;
  releaseDate: number;
  rewardDebt: number;
  package: number;
}


export interface IPackage {
    index: number;
    value: number;
    percent: number;
  }